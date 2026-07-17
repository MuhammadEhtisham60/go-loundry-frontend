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
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-gray-500/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl shadow-red-500/10 border border-red-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-xl mb-2 text-gray-900">Are you sure?</h2>
        <p className="text-sm text-gray-500 mb-6">
          This will permanently remove <strong className="text-gray-800">{label}</strong>. This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <GhostButton onClick={onClose}>Cancel</GhostButton>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="h-10 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-60"
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
