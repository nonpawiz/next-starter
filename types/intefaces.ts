export interface Users {
  id?: number;
  name?: string | null | undefined;
  firstname?: string | null | undefined;
  lastname?: string | null | undefined;
  email?: string | null | undefined;
  created_at?: string | null | undefined;
  role?: string;
  userName?: string;
  accessToken?: string;
}

export type InputChangeEventHandler =
  React.ChangeEventHandler<HTMLInputElement>;
export type TextareaChangeEventHandler =
  React.ChangeEventHandler<HTMLTextAreaElement>;
export type SelectChangeEventHandler =
  React.ChangeEventHandler<HTMLSelectElement>;
