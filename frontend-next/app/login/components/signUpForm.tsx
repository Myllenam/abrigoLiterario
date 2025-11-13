"use client";

import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRoles } from "@/types/userType";
import { startTransition } from "react";
import { signupAction } from "@/app/auth/actions";
import { toast } from "@/components/toast";
import { useRouter } from "next/navigation";

const schema = z.object({
  nome: z.string().min(2, "Informe um nome válido"),
  email: z.string().email("Informe um e-mail válido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  role: z.string("Obrigatório"),
});

type SignUpValues = z.infer<typeof schema>;

export default function SignUpForm() {
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      role: undefined as unknown as UserRoles,
    },
    mode: "onTouched",
  });
  const router = useRouter();
  const onSubmit = (vals: SignUpValues) => {
    startTransition(async () => {
      const result = await signupAction({
        nome: vals.nome,
        email: vals.email,
        senha: vals.senha,
        role: vals.role as UserRoles,
      });

      if (result.success) {
        toast.success(result.message);
        reset();
        router.push("/login");
      } else {
        toast.error(result.message ?? "Erro ao cadastrar o usuário");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[380px] space-y-4"
      noValidate
    >
      <div>
        <label htmlFor="name" className="block mb-1 text-sm font-medium">
          Nome
        </label>
        <Input id="name" placeholder="Seu nome" {...register("nome")} />
        {errors.nome && (
          <p className="mt-1 text-sm text-red-500">{errors.nome.message}</p>
        )}
      </div>

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
          autoComplete="new-password"
          {...register("senha")}
        />
        {errors.senha && (
          <p className="mt-1 text-sm text-red-500">{errors.senha.message}</p>
        )}
      </div>

      <div className="w-full">
        <span className="block mb-1 text-sm font-medium">Papel</span>
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger aria-label="Selecionar papel">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UserRoles.ADMIN}>Admin</SelectItem>
                <SelectItem value={UserRoles.LEITOR}>Leitor</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.role && (
          <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
}
