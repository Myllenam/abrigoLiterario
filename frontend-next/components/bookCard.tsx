"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type BookCardProps = {
  title: string;
  author: string;
  description?: string;
  category?: string;
  imageSrc?: string;
  onViewDetails?: () => void;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onBorrow?: () => void;
  borrowing?: boolean;
};

export default function BookCard({
  title,
  author,
  description,
  category,
  imageSrc,
  onViewDetails,
  isAdmin = false,
  onEdit,
  onDelete,
  borrowing,
  onBorrow,
}: BookCardProps) {
  return (
    <article
      className={cn(
        "relative rounded-2xl border border-background-login-two/30 bg-background-login/50 p-4 flex flex-col gap-3 hover:border-background-login-two/60 transition"
      )}
    >
      {/* Ações admin */}
      {isAdmin && (onEdit || onDelete) && (
        <div className="absolute top-2 right-2 flex gap-1 z-10">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex items-center justify-center rounded-full bg-background-login/90 border border-background-login-two/40 p-1 hover:bg-background-login-two/10"
              aria-label="Editar livro"
            >
              <EditIcon fontSize="small" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center justify-center rounded-full bg-background-login/90 border border-background-login-two/40 p-1 hover:bg-background-login-two/10"
              aria-label="Apagar livro"
            >
              <DeleteIcon fontSize="small" />
            </button>
          )}
        </div>
      )}

      <div className="relative h-40 w-full overflow-hidden rounded-xl bg-background-login-two/10">
        {imageSrc ? (
          <Image
            unoptimized
            src={imageSrc}
            alt={`Capa do livro: ${title}`}
            fill
            className="object-cover"
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold line-clamp-2">{title}</h3>
        <p className="text-xs text-background-login-two/70">{author}</p>
        {category && (
          <span className="mt-1 inline-flex w-fit rounded-full border border-background-login-two/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-background-login-two/70">
            {category}
          </span>
        )}
        {description && (
          <p className="mt-1 text-xs text-background-login-two/80 line-clamp-3">
            {description}
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 justify-between">
        {onViewDetails && (
          <button
            type="button"
            onClick={onViewDetails}
            className="text-sm underline underline-offset-4 hover:opacity-80"
          >
            Ver detalhes
          </button>
        )}

        {isAdmin ? (
          <div className="flex gap-2">
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                className="text-xs px-2 py-1 rounded border border-background-login-two/40 hover:bg-background-login-two/10"
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="text-xs px-2 py-1 rounded border border-red-400 text-red-600 hover:bg-red-50"
              >
                Remover
              </button>
            )}
          </div>
        ) : (
          onBorrow && (
            <button
              type="button"
              onClick={onBorrow}
              className="ml-auto text-xs px-3 py-1 rounded-full border border-background-login-two/40 bg-background-login-two text-background-login hover:opacity-90 transition"
              disabled={!!borrowing}
            >
              {borrowing ? "Registrando..." : "Pegar emprestado"}
            </button>
          )
        )}
      </div>
    </article>
  );
}
