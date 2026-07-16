import { AdminShell } from "@/components/admin-shell";
import { Section, GhostButton, GoldButton, Field, Input, Select } from "@/components/ui-kit";
import { formatPKR } from "@/lib/mock-data";
import { Plus, Edit3, GripVertical, X, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  useGetAdminServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  usePartialUpdateServiceMutation,
  useDeleteServiceMutation,
  useReorderServicesMutation,
} from "@/services";
import type { LaundryService } from "@/services";

export function AdminServices() {
  const { data: servicesResponse, isLoading, refetch } = useGetAdminServicesQuery();
  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [partialUpdateService] = usePartialUpdateServiceMutation();
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();
  const [reorderServices] = useReorderServicesMutation();

  const [items, setItems] = useState<LaundryService[]>([]);
  const [editing, setEditing] = useState<Partial<LaundryService> | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    unit: "PIECE",
    price: 0,
    is_active: true,
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Sync data from RTK query into local state for sorting/display
  useEffect(() => {
    if (servicesResponse?.data) {
      const sorted = [...servicesResponse.data].sort((a, b) => a.display_order - b.display_order);
      setItems(sorted);
    }
  }, [servicesResponse]);

  const handleOpenEdit = (s: LaundryService | null) => {
    if (s) {
      setEditing(s);
      setFormState({
        name: s.name,
        description: s.description || "",
        unit: s.unit || "PIECE",
        price: parseFloat(s.price) || 0,
        is_active: s.is_active ?? true,
      });
    } else {
      const nextOrder = items.length > 0 ? Math.max(...items.map((i) => i.display_order)) + 1 : 1;
      setEditing({ id: "", display_order: nextOrder });
      setFormState({
        name: "",
        description: "",
        unit: "PIECE",
        price: 0,
        is_active: true,
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim()) {
      toast.error("Service name is required");
      return;
    }
    if (formState.price < 0) {
      toast.error("Price must be a positive number");
      return;
    }

    try {
      if (editing && editing.id) {
        await updateService({
          id: editing.id,
          body: {
            name: formState.name.trim(),
            description: formState.description.trim(),
            unit: formState.unit,
            price: formState.price,
            is_active: formState.is_active,
            display_order: editing.display_order || 1,
          },
        }).unwrap();
        toast.success("Catalog service updated successfully.");
      } else {
        await createService({
          name: formState.name.trim(),
          description: formState.description.trim(),
          unit: formState.unit,
          price: formState.price,
          is_active: formState.is_active,
          display_order: editing?.display_order || 1,
        }).unwrap();
        toast.success("Catalog service created successfully.");
      }
      setEditing(null);
    } catch (err: any) {
      const errMsg = err?.data?.message || err?.data?.detail || "Failed to save service";
      toast.error(errMsg);
    }
  };

  const handleToggleActive = async (s: LaundryService) => {
    const updatedStatus = !s.is_active;
    // Optimistic UI update
    setItems((prev) =>
      prev.map((item) => (item.id === s.id ? { ...item, is_active: updatedStatus } : item))
    );

    try {
      await partialUpdateService({
        id: s.id,
        body: { is_active: updatedStatus },
      }).unwrap();
      toast.success(`${s.name} ${updatedStatus ? "enabled" : "disabled"}`);
    } catch (err) {
      toast.error("Failed to update service status");
      refetch();
    }
  };

  const handleDelete = async () => {
    if (!editing || !editing.id) return;
    if (!window.confirm(`Are you sure you want to delete "${editing.name}"?`)) return;

    try {
      await deleteService(editing.id).unwrap();
      toast.success("Catalog service deleted successfully.");
      setEditing(null);
    } catch (err: any) {
      const errMsg = err?.data?.message || err?.data?.detail || "Failed to delete service";
      toast.error(errMsg);
    }
  };

  // HTML5 drag and drop reordering
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = async (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);

    const updatedItems = newItems.map((item, idx) => ({
      ...item,
      display_order: idx + 1,
    }));

    setItems(updatedItems);
    setDraggedIndex(null);

    try {
      const services = updatedItems.map((item) => ({
        id: item.id,
        display_order: item.display_order,
      }));
      await reorderServices({ services }).unwrap();
      toast.success("Catalog display ordering updated.");
    } catch (err) {
      toast.error("Failed to update ordering.");
      refetch();
    }
  };

  // Up/down buttons reordering
  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const updatedItems = newItems.map((item, idx) => ({
      ...item,
      display_order: idx + 1,
    }));

    setItems(updatedItems);

    try {
      const services = updatedItems.map((item) => ({
        id: item.id,
        display_order: item.display_order,
      }));
      await reorderServices({ services }).unwrap();
      toast.success("Catalog display ordering updated.");
    } catch (err) {
      toast.error("Failed to update ordering.");
      refetch();
    }
  };

  if (isLoading) {
    return (
      <AdminShell
        title="Services & pricing"
        subtitle="Add, edit, and reorder services shown in the customer app"
      >
        <Section>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="flex items-center gap-3 p-4 rounded-xl bg-[color:var(--input)]/20 animate-pulse"
              >
                <div className="w-4 h-4 bg-muted/40 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted/40 rounded w-1/4" />
                  <div className="h-3 bg-muted/40 rounded w-1/2" />
                </div>
                <div className="w-16 h-4 bg-muted/40 rounded" />
                <div className="w-10 h-5 bg-muted/40 rounded-full" />
                <div className="w-8 h-8 bg-muted/40 rounded" />
              </div>
            ))}
          </div>
        </Section>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      title="Services & pricing"
      subtitle="Add, edit, and reorder services shown in the customer app"
      actions={
        <GoldButton className="h-10 py-0" onClick={() => handleOpenEdit(null)}>
          <Plus className="w-4 h-4" /> Add service
        </GoldButton>
      }
    >
      <Section>
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No services found. Click "Add service" to create one.
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((s, index) => (
              <div
                key={s.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                className={`flex items-center gap-3 p-3 rounded-xl bg-[color:var(--input)]/40 hover:bg-[color:var(--input)] transition ${
                  draggedIndex === index
                    ? "opacity-40 border border-dashed border-[color:var(--gold)]/50"
                    : ""
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab active:cursor-grabbing" />
                  <div className="flex flex-col gap-0.5">
                    <button
                      disabled={index === 0}
                      onClick={() => handleMove(index, "up")}
                      className="p-0.5 rounded hover:bg-[color:var(--secondary)] disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                      title="Move up"
                    >
                      <ArrowUp className="w-3 h-3 text-muted-foreground" />
                    </button>
                    <button
                      disabled={index === items.length - 1}
                      onClick={() => handleMove(index, "down")}
                      className="p-0.5 rounded hover:bg-[color:var(--secondary)] disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                      title="Move down"
                    >
                      <ArrowDown className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium flex items-center gap-2">
                    {s.name}
                    {!s.is_active && (
                      <span className="text-[10px] bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded font-normal">
                        Inactive
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{s.description}</div>
                </div>
                <div className="text-sm gold-text font-medium whitespace-nowrap">
                  {formatPKR(s.price)}{" "}
                  <span className="text-[10px] text-muted-foreground">
                    / {s.unit ? s.unit.toLowerCase() : ""}
                  </span>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={s.is_active}
                    className="sr-only peer"
                    onChange={() => handleToggleActive(s)}
                  />
                  <span className="w-10 h-5 rounded-full bg-[color:var(--input)] border border-border peer-checked:bg-[color:var(--gold)]/30 peer-checked:border-[color:var(--gold)]/60 relative transition">
                    <span
                      className="absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full transition peer-checked:translate-x-5"
                      style={{ background: "var(--gradient-gold)" }}
                    />
                  </span>
                </label>
                <button
                  onClick={() => handleOpenEdit(s)}
                  className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[color:var(--secondary)] transition"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Section>

      {editing && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setEditing(null)}
        >
          <div
            className="glass rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-display text-2xl">
                {editing.id ? "Edit service" : "New service"}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[color:var(--secondary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <Field label="Service name">
                <Input
                  required
                  placeholder="e.g. Wash & Fold"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </Field>
              <Field label="Description">
                <Input
                  placeholder="e.g. Machine wash, dry, and fold"
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Unit">
                  <Select
                    value={formState.unit}
                    onChange={(e) => setFormState({ ...formState, unit: e.target.value })}
                  >
                    <option value="PIECE">Piece</option>
                    <option value="KG">Kg</option>
                    <option value="PAIR">Pair</option>
                    <option value="ORDER">Order</option>
                  </Select>
                </Field>
                <Field label="Price (PKR)">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={formState.price === 0 ? "" : formState.price}
                    onChange={(e) =>
                      setFormState({ ...formState, price: parseFloat(e.target.value) || 0 })
                    }
                  />
                </Field>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <span className="text-sm font-medium">Service is active</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formState.is_active}
                    className="sr-only peer"
                    onChange={() => setFormState({ ...formState, is_active: !formState.is_active })}
                  />
                  <span className="w-10 h-5 rounded-full bg-[color:var(--input)] border border-border peer-checked:bg-[color:var(--gold)]/30 peer-checked:border-[color:var(--gold)]/60 relative transition">
                    <span
                      className="absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full transition peer-checked:translate-x-5"
                      style={{ background: "var(--gradient-gold)" }}
                    />
                  </span>
                </label>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
                {editing?.id ? (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-sm text-red-500 hover:text-red-600 hover:underline flex items-center gap-1 transition disabled:opacity-50"
                  >
                    Delete service
                  </button>
                ) : (
                  <div />
                )}
                <div className="flex gap-2">
                  <GhostButton type="button" onClick={() => setEditing(null)}>
                    Cancel
                  </GhostButton>
                  <GoldButton type="submit" disabled={isCreating || isUpdating}>
                    {isCreating || isUpdating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-1" />
                        Saving
                      </>
                    ) : (
                      "Save"
                    )}
                  </GoldButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
