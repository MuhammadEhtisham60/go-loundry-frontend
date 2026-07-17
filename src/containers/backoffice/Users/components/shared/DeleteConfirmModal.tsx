// @ts-nocheck
import { GhostButton } from "@/components/ui-kit";
import { Loader2, Trash2 } from "lucide-react";

interface DeleteConfirmModalProps {
  label: string;
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export function DeleteConfirmModal({
  label,
  onConfirm,
  onClose,
  isLoading,
}: DeleteConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass rounded-2xl max-w-sm w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-xl mb-2">Are you sure?</h2>
        <p className="text-sm text-muted-foreground mb-6">
          This will permanently remove <strong>{label}</strong>. This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <GhostButton onClick={onClose}>Cancel</GhostButton>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="h-10 px-4 rounded-xl bg-red-500/80 hover:bg-red-500 text-white text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-60"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
