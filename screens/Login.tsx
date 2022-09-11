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
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.debug({ user });
    } catch (ex) {
      console.error({ ex });
    }
  };

  return (
    <View style={styles.container}>
      <FontAwesome5
        style={styles.logo}
        name={"file-invoice"}
        size={100}
        color={"#0984e3"}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEmail(text)}
        value={email}
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
