"use client";

import { useMemo, useState, useTransition } from "react";
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
import { UserRoles, UsuarioType } from "@/types/userType";
import { LoanType, updateUserProfileAction } from "@/app/auth/actions";
import { toast } from "@/components/toast";

const profileSchema = z.object({
  nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  role: z.custom<UserRoles>((val) => val === "ADMIN" || val === "LEITOR", {
    message: "Selecione um tipo de conta",
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

type BorrowStatus = "EM_DIA" | "ATRASADO" | "DEVOLVIDO";

type ReaderProfileClientProps = {
  user: UsuarioType;
  loans: LoanType[];
};
export const ReaderProfileClient = ({
  user,
  loans,
}: ReaderProfileClientProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nome: user.nome,
      email: user.email,
      role: user.role,
    },
  });

  const loansWithStatus = useMemo(() => {
    const today = new Date();
    return loans.map((loan) => {
      const due = new Date(loan.dataDevolucao);
      const status: BorrowStatus = due < today ? "ATRASADO" : "EM_DIA";

      return {
        ...loan,
        status,
      };
    });
  }, [loans]);

  const onSubmit = (values: ProfileFormValues) => {
    startTransition(async () => {
      const res = await updateUserProfileAction({
        id: user.id,
        nome: values.nome,
        email: values.email,
        role: user.role,
        senha: user.senha,
      });

      if (res.success && res.user) {
        toast.success(res.message);

        reset({
          nome: res.user.nome,
          email: res.user.email,
          role: res.user.role,
        });
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  const handleReset = () => {
    reset({
      nome: user.nome,
      email: user.email,
      role: user.role,
    });
    setAvatarUrl(null);
  };
  const saving = isSubmitting || isPending;

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
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled
                  >
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
              <Button type="submit" disabled={saving}>
                {saving ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </form>
        </div>
      </section>

      <section className="rounded-2xl border border-background-login-two/20 bg-[#FBF8F4] p-4 sm:p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Meus empréstimos</h2>
        <p className="text-xs text-background-login-two/70">
          Livros emprestados, datas de devolução e situação atual.
        </p>

        <div className="overflow-x-auto rounded-xl border border-background-login-two/20">
          <table className="min-w-full text-sm">
            <thead className="bg-background-login/60">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Livro</th>
                <th className="px-3 py-2 text-left font-medium">Autor</th>
                <th className="px-3 py-2 text-left font-medium">
                  Data empréstimo
                </th>
                <th className="px-3 py-2 text-left font-medium">
                  Data devolução
                </th>
                <th className="px-3 py-2 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {loansWithStatus.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-3 text-center text-background-login-two/60"
                  >
                    Você ainda não possui empréstimos registrados.
                  </td>
                </tr>
              ) : (
                loansWithStatus.map((loan) => (
                  <tr
                    key={loan.id}
                    className="border-t border-background-login-two/10"
                  >
                    <td className="px-3 py-2">{loan.livro.titulo}</td>
                    <td className="px-3 py-2">
                      {loan.livro.autor?.nome ?? "Autor desconhecido"}
                    </td>
                    <td className="px-3 py-2">
                      {new Date(loan.dataEmprestimo).toLocaleDateString(
                        "pt-BR"
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {new Date(loan.dataDevolucao).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={
                          loan.status === "ATRASADO"
                            ? "rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-xs"
                            : "rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-xs"
                        }
                      >
                        {loan.status === "ATRASADO" ? "Atrasado" : "Em dia"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
