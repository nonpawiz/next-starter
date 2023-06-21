export interface User {
  id?: number;
  name?: string | null | undefined;
  firstname?: string | null | undefined;
  lastname?: string | null | undefined;
  email?: string | null | undefined;
  password?: string;
  role?: string;
  created_at?: string | null | undefined;
}
