export enum UserRoles {
  ADMIN = 'ADMIN',
  LEITOR = 'LEITOR',
}

export type UsuarioType = {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  role: UserRoles;
};