import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FacturaExt } from "../types/factura";

export enum Routes {
  Login = "Login",

  // TABS
  FacturasTab = "Facturas",
  SettingsTab = "Ajustes Tab",

  // SCREENS
  // FACTURAS
  Facturas = "Listado de Facturas",
  FacturaDetails = "Detalles de Factura",
  FacturaEdit = "Editar Factura",
  FacturaAdd = "Añadir Factura",

  // SETTINGS
  Settings = "Ajustes",
  Users = "Usuarios",
  UserAdd = "Añadir Usuario",
  UserEdit = "Editar Usuario",
}

export type RootStackParamList = {
  [Routes.Login]: undefined;

  // TABS
  [Routes.SettingsTab]: undefined;
  [Routes.FacturasTab]: undefined;

  // SCREENS
  // FACTURAS
  [Routes.Facturas]: { loadData: boolean };
  [Routes.FacturaDetails]: { factura?: FacturaExt, refreshData: boolean };
  [Routes.FacturaEdit]: { collectionId: string };
  [Routes.FacturaAdd]: undefined;

  // SETTINGS
  [Routes.Settings]: undefined;
  [Routes.Users]: undefined;
  [Routes.UserAdd]: undefined;
  [Routes.UserEdit]: { userId: string };
};

export type RootStackParamListKeys = keyof RootStackParamList;

export type LoginProps = NativeStackScreenProps<
  RootStackParamList,
  Routes.Login
>;

// SCREENS
// FACTURAS
export type FacturasProps = NativeStackScreenProps<
  RootStackParamList,
  Routes.Facturas
>;
export type FacturaDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  Routes.FacturaDetails
>;
export type FacturaEditProps = NativeStackScreenProps<
  RootStackParamList,
  Routes.FacturaEdit
>;
export type FacturaAddProps = NativeStackScreenProps<
  RootStackParamList,
  Routes.FacturaAdd
>;

// SETTINGS
export type SettingsProps = NativeStackScreenProps<
  RootStackParamList,
  Routes.Settings
>;

export type UsersProps = NativeStackScreenProps<
  RootStackParamList,
  Routes.Users
>;

export type UserAddProps = NativeStackScreenProps<
  RootStackParamList,
  Routes.UserAdd
>;

export type UserEditProps = NativeStackScreenProps<
  RootStackParamList,
  Routes.UserEdit
>;
