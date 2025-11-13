"use client";

import Image from "next/image";

export type BookCardProps = {
  title: string;
  author: string;
  description?: string;
  imageSrc?: string;
  category?: string;
  className?: string;
  onViewDetails?: () => void;
};

export default function BookCard({
  title,
  author,
  description,
  imageSrc,
  category,
  className = "",
  onViewDetails,
}: BookCardProps) {
  return (
    <article
      className={`rounded-2xl border border-background-login-two/30 bg-background-login/50 hover:border-background-login-two/60 transition ${className}`}
    >
      <div className="relative h-40 w-full overflow-hidden rounded-t-2xl bg-background-login-two/10">
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

      <div className="p-5">
        {category ? (
          <span className="inline-block text-xs px-2 py-1 rounded-full border border-background-login-two/40 text-background-login-two/80">
            {category}
          </span>
        ) : null}

        <h3 className="mt-3 text-lg font-semibold text-background-login-two">
          {title}
        </h3>

        <p className="text-sm text-background-login-two/70">{author}</p>

        {description ? (
          <p className="mt-2 text-sm text-background-login-two/80 line-clamp-3">
            {description}
          </p>
        ) : null}

        <div className="mt-4">
          <button
            onClick={onViewDetails}
            className="text-sm underline underline-offset-4 hover:opacity-80"
            aria-label={`Ver detalhes de ${title}`}
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </article>
  );
}
