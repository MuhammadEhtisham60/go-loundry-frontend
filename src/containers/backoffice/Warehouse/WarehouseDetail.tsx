// @ts-nocheck
import { AdminShell } from "@/components/admin-shell";
import { Section, GoldButton, Field, Input } from "@/components/ui-kit";
import { MapPin, ArrowLeft, Trash2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  useGetWarehouseDetailQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
} from "@/services/private/warehouse";

export function WarehouseDetail() {
  const { warehouseId } = useParams({ from: "/admin/warehouse/$warehouseId" });
  const navigate = useNavigate();

  const isNew = warehouseId === "new";

  const { data: detailResponse, isLoading: isDetailLoading } = useGetWarehouseDetailQuery(
    warehouseId,
    { skip: isNew }
  );

  const [createWarehouse, { isLoading: isCreating }] = useCreateWarehouseMutation();
  const [updateWarehouse, { isLoading: isUpdating }] = useUpdateWarehouseMutation();
  const [deleteWarehouse, { isLoading: isDeleting }] = useDeleteWarehouseMutation();

  const [lat, setLat] = useState("31.5204");
  const [lng, setLng] = useState("74.3587");
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState(15);

  useEffect(() => {
    if (detailResponse?.data && !isNew) {
      const w = detailResponse.data;
      setLat(w.latitude);
      setLng(w.longitude);
      setAddress(w.address || "");
      setRadius(Number(w.max_service_radius_km) || 15);
    }
  }, [detailResponse, isNew]);

  const handleSave = async () => {
    try {
      const payload = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
        max_service_radius_km: parseFloat(radius),
        address,
      };

      if (isNew) {
        await createWarehouse(payload).unwrap();
        toast.success("Warehouse created successfully");
      } else {
        await updateWarehouse({ id: warehouseId, payload }).unwrap();
        toast.success("Warehouse updated successfully");
      }
      navigate({ to: "/admin/warehouse" });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save warehouse settings");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this warehouse location?")) return;
    try {
      await deleteWarehouse(warehouseId).unwrap();
      toast.success("Warehouse deleted successfully");
      navigate({ to: "/admin/warehouse" });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete warehouse");
    }
  };

  if (!isNew && isDetailLoading) {
    return (
      <AdminShell title="Warehouse Details" subtitle="Loading configurations..." actions={null}>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[color:var(--primary)]" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      title={isNew ? "New Warehouse" : "Warehouse Details"}
      subtitle={isNew ? "Add a new central processing facility location" : "Edit operational boundaries & settings"}
      actions={
        <Link
          to="/admin/warehouse"
          className="h-10 px-4 rounded-xl font-medium text-sm flex items-center gap-1.5 transition-all bg-[color:var(--input)] hover:bg-[color:var(--input)]/80 text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Back to list
        </Link>
      }
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Section title="Location settings">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Latitude">
                <Input value={lat} onChange={(e) => setLat(e.target.value)} />
              </Field>
              <Field label="Longitude">
                <Input value={lng} onChange={(e) => setLng(e.target.value)} />
              </Field>
              <Field label="Address" hint="Warehouse street address">
                <Input value={address} onChange={(e) => setAddress(e.target.value)} className="col-span-2" />
              </Field>
              <Field label="Max service radius (km)">
                <Input type="number" value={radius} onChange={(e) => setRadius(e.target.value)} />
              </Field>
            </div>
            <div className="pt-4 flex justify-between items-center border-t border-[color:var(--glass-border)]">
              {!isNew ? (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center gap-1.5 text-xs text-[color:var(--destructive)] hover:underline"
                >
                  <Trash2 className="w-4 h-4" /> Delete Warehouse
                </button>
              ) : (
                <div />
              )}
              <GoldButton onClick={handleSave} disabled={isCreating || isUpdating}>
                {isCreating || isUpdating ? "Saving..." : isNew ? "Create warehouse" : "Save changes"}
              </GoldButton>
            </div>
          </div>
        </Section>

        <Section title="Service area visualization">
          <div className="rounded-xl overflow-hidden border border-border h-80 relative">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, oklch(0.78 0.12 85 / 0.2), transparent 50%), linear-gradient(135deg, oklch(0.22 0.02 252), oklch(0.18 0.02 252))",
              }}
            />
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 288">
              {Array.from({ length: 15 }).map((_, i) => (
                <line
                  key={"h" + i}
                  x1="0"
                  x2="400"
                  y1={i * 20}
                  y2={i * 20}
                  stroke="oklch(0.78 0.12 85)"
                  strokeWidth="0.5"
                />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <line
                  key={"v" + i}
                  x1={i * 22}
                  x2={i * 22}
                  y1="0"
                  y2="288"
                  stroke="oklch(0.78 0.12 85)"
                  strokeWidth="0.5"
                />
              ))}
            </svg>
            {/* radius circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {[60, 120, 180].map((r) => (
                <div
                  key={r}
                  className="absolute top-1/2 left-1/2 rounded-full border border-[color:var(--gold)]/30"
                  style={{ width: r * 2, height: r * 2, transform: "translate(-50%,-50%)" }}
                />
              ))}
              <div
                className="relative w-12 h-12 rounded-full grid place-items-center text-xs font-bold z-10"
                style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}
              >
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 glass rounded-lg px-3 py-2 text-xs">
              <div className="text-muted-foreground">Service radius</div>
              <div className="font-display text-lg gold-text">{radius} km</div>
            </div>
          </div>
        </Section>
      </div>
    </AdminShell>
  );
}
