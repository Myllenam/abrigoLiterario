"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "@/lib/zod";
import { loginAction } from "@/app/auth/actions";
import { useRouter } from "next/navigation";
import { toast } from "@/components/toast";
import { UserRoles } from "@/types/userType";

const schema = z.object({
  email: z.string().email("Informe um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormValues = z.infer<typeof schema>;
const ROLE_REDIRECT: Record<UserRoles, string> = {
  ADMIN: "/admin/dashboard",
  LEITOR: "/reader/books",
};
export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

    const onSubmit = (vals: FormValues) => {
    startTransition(async () => {
      const result = await loginAction({
        email: vals.email,
        senha: vals.password,
      });

      if (result.success) {
        toast.success(result.message);

        const role = result.user?.role as UserRoles | undefined;

        const target =
          (role && ROLE_REDIRECT[role]) 
          || "/";

        router.push(target);
      } else {
        toast.error("Erro ao autenticar o usuário");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[360px] mt-6 space-y-4"
      noValidate
    >
      <div>
        <label htmlFor="email" className="block mb-1 text-sm font-medium">
          E-mail
        </label>
        <Input
          id="email"
          type="email"
          placeholder="seuemail@exemplo.com"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 text-sm font-medium">
          Senha
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
