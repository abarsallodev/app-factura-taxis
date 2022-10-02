export interface UserModel {
  userId: string | undefined;
  email: string;
  name: string;
  password: string;
  rol: string;
  enabled: boolean;
}
