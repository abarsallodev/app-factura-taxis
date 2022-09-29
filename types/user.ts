export interface User {
  email: string;
  name: number | undefined;
  password: number;
}

export interface UserExt extends User {
  userId: string;
}
