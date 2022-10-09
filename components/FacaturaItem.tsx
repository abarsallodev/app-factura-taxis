import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FacturaExt } from "../types/factura";

interface Props {
  factura: FacturaExt;
  onPress: (factura: FacturaExt) => void;
}

export default function FacturaItem(props: Props): JSX.Element {
  const { receipt, monto, numeroPlaca, numeroRegistro, nombre, fecha, cedula } =
    props.factura;
  const onPress = props.onPress;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onPress(props.factura)}
        activeOpacity={0}
      >
        <View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#607d8b",
              ...styles.rowContainer,
            }}
          >
            <Text style={{ fontSize: 18, ...styles.title }}>Fatura #:</Text>
            <Text style={{ fontSize: 18, ...styles.title }}>{receipt}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>Nombre:</Text>
            <Text style={styles.value}>{nombre}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>Cedula:</Text>
            <Text style={styles.value}>{cedula}</Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.title}>Número Placa:</Text>
              <Text style={styles.value}>{numeroPlaca}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.title}>Número Registro:</Text>
              <Text style={styles.value}>{numeroRegistro}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.title}>Monto:</Text>
              <Text style={styles.value}>{monto}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.title}>Fecha:</Text>
              <Text style={styles.value}>{fecha}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eceff1",
    borderBottomWidth: 1,
    borderColor: "#babdbe",
    borderRadius: 2,
    padding: 15,
    marginBottom: 2,
  },
  rowContainer: {
    flexDirection: "row",
    flex: 1,
  },
  title: {
    fontWeight: "bold",
  },
  value: {
    marginLeft: 5,
  },
});
