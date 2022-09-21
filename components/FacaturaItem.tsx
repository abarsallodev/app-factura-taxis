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
      <View style={styles.item}>
        <Text>Fatura #: {receipt}</Text>
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
    backgroundColor: "#eceff1",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#babdbe",
    borderRadius: 5,
    padding: 15,
  },
  item: {
    width: "100%",
    flex: 1,
  },
});
