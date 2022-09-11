import { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";

import { Routes } from "../types/navigation";

import Login from "./Login";
import Facturas from "./Facturas";
import Logout from "./Logout";

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
    case Routes.Logout:
      iconName = "sign-out-alt";
      break;
  }

  return <FontAwesome5 name={iconName} size={size} color={color} />;
};

const LoginStack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();

function LoginScreen() {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Login" component={Login} />
    </LoginStack.Navigator>
  );
}

function ContenScreen() {
  return (
    <TabStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        size: 20,
        tabBarIcon: ({ color, size }) => getIcon(route, color, size),
      })}
    >
      <TabStack.Screen name="Facturas" component={Facturas} />
      <TabStack.Screen name="Logout" component={Logout} />
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
