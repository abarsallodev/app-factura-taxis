import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { FontAwesome5 } from "@expo/vector-icons";
import { SettingsProps, Routes } from "../types/navigation";

export default function Settings({ navigation }: SettingsProps) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (ex) {
      console.error({ ex });
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(Routes.Users)}
      >
        <FontAwesome5
          style={styles.buttonIcon}
          name={"users"}
          color={"#ffffff"}
          size={16}
        />
        <Text style={styles.buttonTitle}>Usuarios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <FontAwesome5
          style={styles.buttonIcon}
          name={"sign-in-alt"}
          color={"#ffffff"}
          size={16}
        />
        <Text style={styles.buttonTitle}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0984e3",
    width: 350,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    marginRight: 5,
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
