import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum Routes {
  Login = 'Login',
  Facturas = 'Facturas',
  Logout = 'Logout',
}

export type RootStackParamList = {
  [Routes.Login]: undefined;
  [Routes.Facturas]: undefined;
  [Routes.Logout]: undefined;
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, Routes.Login>;
export type FacturasProps = NativeStackScreenProps<RootStackParamList, Routes.Facturas>;
export type LogoutProps = NativeStackScreenProps<RootStackParamList, Routes.Logout>;