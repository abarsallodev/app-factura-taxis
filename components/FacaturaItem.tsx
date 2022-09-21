import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FacturasList } from "../types/factura";

interface Props {
  factura: FacturasList;
}

export default function FacturaItem(props: Props): JSX.Element {
  const { receipt, monto } = props.factura;
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text>Fatura #: {receipt}</Text>
      </View>
      <View style={styles.rigth}>
        <Text>Saldo: {monto}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef6c00",
  },
  left: {
    width: "50%",
  },
  rigth: {
    width: "50%",
  },
});
