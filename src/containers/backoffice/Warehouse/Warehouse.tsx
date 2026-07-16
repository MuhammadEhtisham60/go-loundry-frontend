// @ts-nocheck
import { AdminShell } from "@/components/admin-shell";
import { Section, GoldButton, Field, Input } from "@/components/ui-kit";
import { MapPin, Plus, Trash2, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import {
  useGetWarehousesQuery,
  useGetTiersQuery,
  useSaveTiersMutation,
} from "@/services/private/warehouse";

export function AdminWarehouse() {
  const { data: warehousesResponse, isLoading: isWarehousesLoading } = useGetWarehousesQuery();
  const { data: tiersResponse, isLoading: isTiersLoading } = useGetTiersQuery();

  const [tiers, setTiers] = useState([]);

  useEffect(() => {
    if (tiersResponse?.data) {
      setTiers(tiersResponse.data);
    }
  }, [tiersResponse]);

  const [saveTiers, { isLoading: isSavingTiers }] = useSaveTiersMutation();

  const handleSaveTiers = async () => {
    try {
      await saveTiers(tiers).unwrap();
      toast.success("Delivery tiers saved successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save delivery tiers");
    }
  };

  const handleTierChange = (index, field, value) => {
    const updated = [...tiers];
    updated[index] = {
      ...updated[index],
      [field]: parseFloat(value) || 0,
    };
    setTiers(updated);
  };

  const handleAddTier = () => {
    const lastTo = tiers.length > 0 ? tiers[tiers.length - 1].to : 0;
    setTiers([
      ...tiers,
      {
        from: lastTo,
        to: lastTo + 5,
        charge: 0,
      },
    ]);
  };

  const handleDeleteTier = (index) => {
    setTiers(tiers.filter((_, j) => j !== index));
  };

  const warehouses = warehousesResponse?.data || [];

  if (isWarehousesLoading || isTiersLoading) {
    return (
      <AdminShell title="Warehouse & delivery tiers" subtitle="Loading configurations..." actions={null}>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[color:var(--primary)]" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      title="Warehouse & delivery tiers"
      subtitle="Configure operational boundary locations and distance-based charges"
      actions={
        <Link
          to="/admin/warehouse/$warehouseId"
          params={{ warehouseId: "new" }}
          className="h-10 px-4 rounded-xl font-medium text-sm flex items-center gap-1.5 transition-all bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:brightness-110 shadow-lg shadow-gold/20"
        >
          <Plus className="w-4 h-4" /> Add Warehouse
        </Link>
      }
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Warehouses list */}
        <Section title={`${warehouses.length} active warehouse locations`}>
          {warehouses.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-muted text-center">
              <MapPin className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">No warehouses registered</p>
              <p className="text-xs text-muted-foreground mb-4">Add your first processing facility location</p>
              <Link
                to="/admin/warehouse/$warehouseId"
                params={{ warehouseId: "new" }}
                className="text-xs gold-text font-bold hover:underline"
              >
                Add location &rarr;
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {warehouses.map((w) => (
                <Link
                  key={w.id}
                  to="/admin/warehouse/$warehouseId"
                  params={{ warehouseId: String(w.id) }}
                  className="block p-4 rounded-2xl border border-[color:var(--glass-border)] bg-[color:var(--card)] hover:bg-[color:var(--muted)]/30 transition-all duration-200 group"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="font-semibold text-base flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[color:var(--primary)]" />
                        {w.address || `Warehouse #${w.id}`}
                      </div>
                      <div className="text-xs text-muted-foreground flex gap-3">
                        <span>Lat: {parseFloat(w.latitude).toFixed(4)}</span>
                        <span>Lng: {parseFloat(w.longitude).toFixed(4)}</span>
                      </div>
                      <div className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[color:var(--gold)]/10 text-[color:var(--gold)] border border-[color:var(--gold)]/20">
                        Operational radius: {w.max_service_radius_km} km
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-[color:var(--input)]/20 group-hover:bg-[color:var(--primary)] group-hover:text-[color:var(--primary-foreground)] transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Section>

        {/* Global delivery charge tiers */}
        <Section
          title="Delivery charge tiers"
          action={
            <button
              onClick={handleAddTier}
              className="text-xs gold-text flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3 h-3" /> Add tier
            </button>
          }
        >
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {tiers.length === 0 ? (
              <div className="text-center py-6 text-xs text-muted-foreground">
                No delivery tiers configured. Standard default surcharges will apply.
              </div>
            ) : (
              tiers.map((t, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end p-4 rounded-xl bg-[color:var(--input)]/40"
                >
                  <Field label="From (km)">
                    <Input type="number" value={t.from} onChange={(e) => handleTierChange(i, "from", e.target.value)} />
                  </Field>
                  <Field label="To (km)">
                    <Input type="number" value={t.to} onChange={(e) => handleTierChange(i, "to", e.target.value)} />
                  </Field>
                  <Field label="Charge (PKR)">
                    <Input type="number" value={t.charge} onChange={(e) => handleTierChange(i, "charge", e.target.value)} />
                  </Field>
                  <button
                    onClick={() => handleDeleteTier(i)}
                    className="w-10 h-10 grid place-items-center rounded-lg text-[color:var(--destructive)] hover:bg-[color:var(--destructive)]/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="mt-3 p-3 rounded-lg bg-[color:var(--gold)]/5 border border-[color:var(--gold)]/20 text-xs text-muted-foreground">
            Customers see the delivery charge in their order summary before confirming. Surcharges are computed relative to the closest operational warehouse.
          </div>
          <div className="mt-4 flex justify-end">
            <GoldButton onClick={handleSaveTiers} disabled={isSavingTiers}>
              {isSavingTiers ? "Saving..." : "Save tiers"}
            </GoldButton>
          </div>
        </Section>
      </div>
    </AdminShell>
  );
}
