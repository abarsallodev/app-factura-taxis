import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum Routes {
  Login = 'Login',

  //TABS
  FacturasTab = 'Facturas',
  LogoutTab = 'Salir',

  //SCREENS
  Facturas = 'Listado de Facturas',
  FacturaDetails = 'Detalles de Factura',
  FacturaEdit = 'Editar Factura',
  FacturaAdd = 'Añadir Factura',
}

export type RootStackParamList = {
  [Routes.Login]: undefined;

  //TABS
  [Routes.LogoutTab]: undefined;
  [Routes.FacturasTab]: undefined;

  //SCREENS
  [Routes.Facturas]: undefined;
  [Routes.FacturaDetails]: { collectionId: string };
  [Routes.FacturaEdit]: { collectionId: string };
  [Routes.FacturaAdd]: undefined;
};

export type RootStackParamListKeys = keyof RootStackParamList;

export type LoginProps = NativeStackScreenProps<RootStackParamList, Routes.Login>;

//SCREENS
export type FacturasProps = NativeStackScreenProps<RootStackParamList, Routes.Facturas>;
export type FacturaDetailsProps = NativeStackScreenProps<RootStackParamList, Routes.FacturaDetails>;
export type FacturaEditProps = NativeStackScreenProps<RootStackParamList, Routes.FacturaEdit>;
export type FacturaAddProps = NativeStackScreenProps<RootStackParamList, Routes.FacturaAdd>;