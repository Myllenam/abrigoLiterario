"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
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

const profileSchema = z.object({
  nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  role: z.custom<UserRoles>((val) => val === "ADMIN" || val === "LEITOR", {
    message: "Selecione um tipo de conta",
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

type BorrowStatus = "EM_DIA" | "ATRASADO" | "DEVOLVIDO";

type BorrowedBook = {
  id: number;
  titulo: string;
  autor: string;
  dataDevolucao: string;
  status: BorrowStatus;
};

const mockUser: ProfileFormValues = {
  nome: "Admin Exemplo",
  email: "admin@abrigoliterario.com",
  role: UserRoles.ADMIN,
};

const Page = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: mockUser,
  });

  const onSubmit = (values: ProfileFormValues) => {
    // por enquanto só mock: depois vai virar chamada de server action
    console.log("Dados do perfil salvos:", values);
    console.log("Avatar atual:", avatarUrl);
    // se quiser, aqui você pode chamar toast.success(...)
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  const handleReset = () => {
    reset(mockUser);
    setAvatarUrl(null);
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-2xl border border-background-login-two/20 bg-[#FBF8F4] p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col items-center gap-4 lg:w-1/3">
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden bg-background-login-two/10">
            <Image
              src={avatarUrl ?? "/avatar-placeholder.png"}
              alt=""
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <label className="text-xs font-medium text-background-login-two/80">
              Foto de perfil
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="text-xs cursor-pointer"
            />
          </div>
        </div>

        <div className="lg:w-2/3">
          <h2 className="text-lg font-semibold mb-4">Dados do perfil</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Nome */}
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label
                htmlFor="nome"
                className="text-xs font-medium text-background-login-two/80"
              >
                Nome
              </label>
              <Input id="nome" {...register("nome")} placeholder="Seu nome" />
              {errors.nome && (
                <p className="text-xs text-red-500">{errors.nome.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1 sm:col-span-1">
              <label
                htmlFor="email"
                className="text-xs font-medium text-background-login-two/80"
              >
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="seuemail@exemplo.com"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1 sm:col-span-1">
              <span className="text-xs font-medium text-background-login-two/80">
                Tipo de conta
              </span>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange} disabled>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LEITOR">Leitor</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="text-xs text-red-500">
                  {errors.role.message as string}
                </p>
              )}
            </div>

            <div className="flex gap-2 sm:col-span-2 justify-end mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isSubmitting || !isDirty}
              >
                Desfazer alterações
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Page;
