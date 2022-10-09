import { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";

import { Routes } from "../types/navigation";

import Login from "./Login";
import Facturas from "./Facturas";
import FacturaDetails from "./FacturaDetails";
import FacturaEdit from "./FacturaEdit";
import FacturaAdd from "./FacturaAdd";
import Settings from "./Settings";
import UserAdd from "./RegisterUser";
import Users from "./Users";
import UserEdit from "./UserEdit";

const getIcon = (
  route: RouteProp<ParamListBase, string>,
  color: string,
  size: number
): JSX.Element => {
  let iconName = "home";
  switch (route.name) {
    case Routes.Facturas:
      iconName = "file-invoice";
      break;
    case Routes.SettingsTab:
      iconName = "sliders-h";
      break;
  }

  return <FontAwesome5 name={iconName} size={size} color={color} />;
};

const navigationGenericOptions: NativeStackNavigationOptions = {
  headerBackTitle: "Volver",
  headerTitleStyle: {
    fontSize: 20,
  },
};

//Stack para el Inicio de Sesion
const LoginStack = createNativeStackNavigator();
function LoginScreen() {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Login" component={Login} />
    </LoginStack.Navigator>
  );
}

//Stack para Facturas
const FacturasStack = createNativeStackNavigator();
function FacturasNavigation() {
  return (
    <FacturasStack.Navigator>
      <FacturasStack.Screen
        name={Routes.Facturas}
        component={Facturas}
        options={{ ...navigationGenericOptions, headerTitleAlign: "center" }}
      />
      <FacturasStack.Screen
        name={Routes.FacturaDetails}
        component={FacturaDetails}
        options={{ ...navigationGenericOptions, headerTitleAlign: "center" }}
      />
      <FacturasStack.Screen
        name={Routes.FacturaEdit}
        component={FacturaEdit}
        options={{ ...navigationGenericOptions }}
      />
      <FacturasStack.Screen
        name={Routes.FacturaAdd}
        component={FacturaAdd}
        options={{ ...navigationGenericOptions, headerTitleAlign: "center" }}
      />
    </FacturasStack.Navigator>
  );
}

//Stack para Settings
const SettingStack = createNativeStackNavigator();
function SettingsNavigation() {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen name={Routes.Settings} component={Settings} />
      <SettingStack.Screen name={Routes.UserAdd} component={UserAdd} />
      <SettingStack.Screen name={Routes.Users} component={Users} />
      <SettingStack.Screen name={Routes.UserEdit} component={UserEdit} />
    </SettingStack.Navigator>
  );
}

//Iconos de la parte inferior
const TabStack = createBottomTabNavigator();
function ContenScreen() {
  return (
    <TabStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        size: 20,
        tabBarIcon: ({ color, size }) => getIcon(route, color, size),
      })}
    >
      <TabStack.Screen
        name={Routes.FacturasTab}
        component={FacturasNavigation}
      />
      <TabStack.Screen
        name={Routes.SettingsTab}
        component={SettingsNavigation}
      />
    </TabStack.Navigator>
  );
}

function Content() {
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (logged) {
    return <ContenScreen />;
  } else {
    return <LoginScreen />;
  }
}

export default function Index() {
  return (
    <NavigationContainer>
      <Content />
    </NavigationContainer>
  );
}
