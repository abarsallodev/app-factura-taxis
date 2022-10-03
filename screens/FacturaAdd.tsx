import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export default function FacturaDetails() {
  const [nombre, setNombre] = useState<string>("");
  const [cedula, setCedula] = useState<string>("");
  const [placa, setPlaca] = useState<string>("");
  const [registro, setRegistro] = useState<string>("");
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Factura Add</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={{ width: 350, ...styles.input }}
          onChangeText={(text) => setNombre(text)}
          value={nombre}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Cedula</Text>
        <TextInput
          style={{ width: 350, ...styles.input }}
          onChangeText={(text) => setCedula(text)}
          value={cedula}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 17,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Número de Placa</Text>
          <TextInput
            style={{ flex: 1, marginEnd: 5, ...styles.input }}
            onChangeText={(text) => setPlaca(text)}
            value={placa}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
        <View style={{ width: "50%" }}>
          <Text style={{ marginStart: 5, ...styles.label }}>
            Número de Registro
          </Text>
          <TextInput
            style={{ flex: 1, marginStart: 5, ...styles.input }}
            onChangeText={(text) => setRegistro(text)}
            value={registro}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  formGroup: {
    padding: 5,
    marginBottom: 5,
  },
  label: {
    // marginStart: 30,
    fontWeight: "bold",
    textAlign: "left",
  },
  input: {
    height: 48,
    borderRadius: 2,
    overflow: "hidden",
    backgroundColor: "white",
    padding: 16,
  },
});
