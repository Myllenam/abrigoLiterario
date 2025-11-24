"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type DeleteBookModalProps = {
  open: boolean;
  bookTitle?: string;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
};

export function DeleteBookModal({
  open,
  bookTitle,
  onCancel,
  onConfirm,
}: DeleteBookModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onCancel]);

  if (!open) return null;

  const handleConfirm = async () => {
    await onConfirm();
    onCancel();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onCancel}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="relative z-10 w-[92%] max-w-md rounded-2xl bg-background-login text-background-login-two shadow-xl border border-background-login-two/30 p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-2">Remover livro</h2>
        <p className="text-sm text-background-login-two/80">
          Tem certeza de que deseja remover o livro
          {bookTitle ? (
            <>
              {" "}
              <span className="font-semibold">&quot;{bookTitle}&quot;</span>?
            </>
          ) : (
            " selecionado?"
          )}
        </p>
        <p className="mt-1 text-xs text-background-login-two/60">
          Esta ação não poderá ser desfeita.
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
          >
            Remover
          </Button>
        </div>
      </div>
    </div>
  );
}
