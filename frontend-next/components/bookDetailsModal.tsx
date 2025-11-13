"use client";

import { Close } from "@mui/icons-material";
import Image from "next/image";
import { useEffect } from "react";

type Book = {
  title: string;
  author: string;
  description?: string;
  imageSrc?: string;
  category?: string;
};

type Props = {
  open: boolean;
  book?: Book | null;
  onClose: () => void;
};

export default function BookDetailsModal({ open, book, onClose }: Props) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open || !book) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

      <div
        className="
          relative z-10 w-full h-[100dvh] sm:h-auto sm:w-[92%] sm:max-w-2xl
          bg-background-login text-background-login-two
          sm:rounded-2xl shadow-xl border border-background-login-two/30
          flex flex-col overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-5 py-4 border-b border-background-login-two/20 bg-background-login/95 backdrop-blur">
          <div>
            <h2
              id="book-modal-title"
              className="text-lg sm:text-xl font-semibold"
            >
              {book.title}
            </h2>
            <p className="text-xs sm:text-sm text-background-login-two/70">
              {book.author}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="cursor-pointer"
          >
            <Close />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-1">
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-background-login-two/10">
                {book.imageSrc ? (
                  <Image
                    unoptimized
                    src={book.imageSrc}
                    alt={`Capa do livro ${book.title}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 90vw"
                    priority={false}
                  />
                ) : null}
              </div>
              {book.category ? (
                <span className="mt-3 inline-block text-[11px] sm:text-xs px-2 py-1 rounded-full border border-background-login-two/40 text-background-login-two/80">
                  {book.category}
                </span>
              ) : null}
            </div>

            <div className="md:col-span-2">
              <h3 className="text-base sm:text-lg font-medium">Descrição</h3>
              <p className="mt-2 text-sm leading-relaxed text-background-login-two/80">
                {book.description ?? "Sem descrição disponível."}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-background-login-two/30 p-3">
                  <span className="block text-background-login-two/60">
                    Categoria
                  </span>
                  <span className="font-medium">{book.category ?? "-"}</span>
                </div>
                <div className="rounded-lg border border-background-login-two/30 p-3">
                  <span className="block text-background-login-two/60">
                    Autor
                  </span>
                  <span className="font-medium">{book.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 px-4 sm:px-5 py-3 border-t border-background-login-two/20 bg-background-login/95 backdrop-blur sm:flex sm:justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded-lg px-4 py-2 border border-background-login-two/40 hover:bg-background-login-two/10"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
