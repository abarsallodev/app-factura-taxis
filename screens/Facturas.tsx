import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FacturasList } from "../types/factura";
import { getFacturas } from "../storage/api";

export default function Facturas() {
  const [facturasList, setFacturasList] = useState<FacturasList>();
  const data = getFacturas();

  console.log(data);
  return (
    <View style={styles.container}>
      <Text>Facturas Screen</Text>
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
});
