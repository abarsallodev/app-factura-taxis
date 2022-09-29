import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { UserAddProps, Routes } from "../types/navigation";

export default function RegisterUser({ navigation }: UserAddProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleRegister = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user, {
        displayName: name,
      }).catch((error) => {
        console.error({ error });
      });

      navigation.navigate(Routes.Settings);
    } catch (ex) {
      console.error({ ex });
    }
  };

  return (
    <View style={styles.container}>
      <FontAwesome5
        style={styles.logo}
        name={"user-plus"}
        size={100}
        color={"#0984e3"}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setName(text)}
        value={name}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="Contraseña"
        onChangeText={(text) => setPassword(text)}
        value={password}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <FontAwesome5
          style={styles.buttonIcon}
          name={"sign-in-alt"}
          color={"#ffffff"}
          size={16}
        />
        <Text style={styles.buttonTitle}>Acceder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {},
  logo: {
    alignSelf: "center",
    marginBottom: 10,
  },
  input: {
    height: 48,
    width: 350,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    padding: 16,
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
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
});
