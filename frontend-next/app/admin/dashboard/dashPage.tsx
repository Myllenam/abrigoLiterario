"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const booksByCategory = [
  { name: "Romance", value: 24 },
  { name: "Fantasia", value: 18 },
  { name: "Não-ficção", value: 12 },
  { name: "Infantil", value: 10 },
  { name: "Outros", value: 6 },
];

const COLORS = ["#F97373", "#FACC15", "#34D399", "#60A5FA", "#A855F7"];

const DashPage = () => {
  const totalBooks = 70;
  const borrowedBooks = 28;
  const availableBooks = totalBooks - borrowedBooks;
  const totalUsers = 42;
  const admins = 4;
  const readers = totalUsers - admins;
  const lateLoans = 5;

  const upcomingReturns = [
    {
      id: 1,
      titulo: "Orgulho e Preconceito",
      leitor: "Ana Souza",
      dataDevolucao: "10/12/2025",
      status: "No prazo",
    },
    {
      id: 2,
      titulo: "O Hobbit",
      leitor: "Carlos Lima",
      dataDevolucao: "08/12/2025",
      status: "Atrasado",
    },
    {
      id: 3,
      titulo: "Sapiens",
      leitor: "Marina Costa",
      dataDevolucao: "12/12/2025",
      status: "No prazo",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard da Biblioteca</h1>
          <p className="text-sm text-background-login-two/70">
            Visão geral do Abrigo Literário: livros, usuários e movimentação.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-background-login-two/20 bg-[#FBF8F4] p-4">
          <p className="text-xs text-background-login-two/70">
            Livros cadastrados
          </p>
          <p className="mt-2 text-2xl font-semibold">{totalBooks}</p>
          <p className="mt-1 text-xs text-background-login-two/60">
            Total de livros no acervo
          </p>
        </div>

        <div className="rounded-2xl border border-background-login-two/20 bg-[#FBF8F4] p-4">
          <p className="text-xs text-background-login-two/70">
            Livros emprestados
          </p>
          <p className="mt-2 text-2xl font-semibold">{borrowedBooks}</p>
          <p className="mt-1 text-xs text-background-login-two/60">
            {availableBooks} disponíveis na estante
          </p>
        </div>

        <div className="rounded-2xl border border-background-login-two/20 bg-[#FBF8F4] p-4">
          <p className="text-xs text-background-login-two/70">
            Usuários cadastrados
          </p>
          <p className="mt-2 text-2xl font-semibold">{totalUsers}</p>
          <p className="mt-1 text-xs text-background-login-two/60">
            {admins} admins · {readers} leitores
          </p>
        </div>

        <div className="rounded-2xl border border-background-login-two/20 bg-[#FBF8F4] p-4">
          <p className="text-xs text-background-login-two/70">
            Empréstimos em atraso
          </p>
          <p className="mt-2 text-2xl font-semibold">{lateLoans}</p>
          <p className="mt-1 text-xs text-background-login-two/60">
            Acompanhe para evitar perdas de livros
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-background-login-two/20 bg-[#FBF8F4] p-4 lg:col-span-3">
          <h2 className="text-lg font-semibold mb-1">Livros por categoria</h2>
          <p className="text-xs text-background-login-two/70 mb-4">
            Distribuição dos livros cadastrados por gênero.
          </p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
                <Pie
                  data={booksByCategory}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${((percent as number) * 100).toFixed(0)}%`
                  }
                >
                  {booksByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-background-login-two/20 bg-[#FBF8F4] p-4 lg:col-span-3 flex flex-col gap-4">
          <h2 className="text-lg font-semibold mb-1">
            Visão geral de usuários
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            <div className="rounded-xl border border-background-login-two/20 bg-background-login/40 p-3">
              <p className="text-xs text-background-login-two/70">
                Novos leitores (último mês)
              </p>
              <p className="mt-2 text-xl font-semibold">8</p>
              <p className="mt-1 text-xs text-background-login-two/60">
                Participação crescente nas atividades
              </p>
            </div>

            <div className="rounded-xl border border-background-login-two/20 bg-background-login/40 p-3">
              <p className="text-xs text-background-login-two/70">
                Empréstimos no mês
              </p>
              <p className="mt-2 text-xl font-semibold">32</p>
              <p className="mt-1 text-xs text-background-login-two/60">
                Média de 1,3 livros por leitor ativo
              </p>
            </div>

            <div className="rounded-xl border border-background-login-two/20 bg-background-login/40 p-3">
              <p className="text-xs text-background-login-two/70">
                Taxa de devolução em dia
              </p>
              <p className="mt-2 text-xl font-semibold">83%</p>
              <p className="mt-1 text-xs text-background-login-two/60">
                Acompanhando os atrasos de perto
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">
              Próximas devoluções / status
            </h3>
            <div className="overflow-x-auto rounded-xl border border-background-login-two/20">
              <table className="min-w-full text-sm">
                <thead className="bg-background-login/60">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">Livro</th>
                    <th className="px-3 py-2 text-left font-medium">Leitor</th>
                    <th className="px-3 py-2 text-left font-medium">
                      Data devolução
                    </th>
                    <th className="px-3 py-2 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingReturns.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-background-login-two/10"
                    >
                      <td className="px-3 py-2">{item.titulo}</td>
                      <td className="px-3 py-2">{item.leitor}</td>
                      <td className="px-3 py-2">{item.dataDevolucao}</td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            item.status === "Atrasado"
                              ? "rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-xs"
                              : "rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-xs"
                          }
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {upcomingReturns.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-3 text-center text-background-login-two/60"
                      >
                        Nenhuma devolução prevista no momento.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashPage;
