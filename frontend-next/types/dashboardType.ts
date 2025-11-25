export type BooksByCategoryItem = {
  name: string;
  value: number;
};

export type UpcomingReturn = {
  id: number;
  titulo: string;
  leitor: string;
  dataDevolucao: string;
  status: "No prazo" | "Atrasado";
};

export type AdminDashboardData = {
  totalBooks: number;
  borrowedBooks: number;
  availableBooks: number;
  totalUsers: number;
  admins: number;
  readers: number;
  lateLoans: number;
  booksByCategory: BooksByCategoryItem[];
  upcomingReturns: UpcomingReturn[];
};
