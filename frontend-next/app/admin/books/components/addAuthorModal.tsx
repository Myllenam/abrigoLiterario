"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const addAuthorSchema = z.object({
  name: z.string().min(2, "O nome do autor deve ter pelo menos 2 caracteres"),
});

type AddAuthorFormValues = z.infer<typeof addAuthorSchema>;

type AddAuthorModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void | Promise<void>;
};

export function AddAuthorModal({ open, onClose, onConfirm }: AddAuthorModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<AddAuthorFormValues>({
    resolver: zodResolver(addAuthorSchema),
    defaultValues: { name: "" },
  });

  // reset quando fechar
  useEffect(() => {
    if (!open) {
      reset({ name: "" });
    }
  }, [open, reset]);

  // ESC para fechar
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const onSubmit = async (values: AddAuthorFormValues) => {
    await onConfirm(values.name.trim());
    // se quiser que sempre feche depois de confirmar:
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="relative z-10 w-[92%] max-w-md rounded-2xl bg-background-login text-background-login-two shadow-xl border border-background-login-two/30 p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Novo autor</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-xs border border-background-login-two/40 rounded-md px-2 py-1 hover:bg-background-login-two/10"
          >
            Fechar
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-background-login-two/80">
              Nome do autor
            </label>
            <Input
              autoFocus
              placeholder="Digite o nome do autor"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar autor"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
