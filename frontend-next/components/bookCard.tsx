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

      {onViewDetails && (
        <button
          type="button"
          onClick={onViewDetails}
          className="mt-2 inline-flex text-sm text-black underline underline-offset-4 hover:opacity-80"
        >
          Ver detalhes
        </button>
      )}
    </article>
  );
}
