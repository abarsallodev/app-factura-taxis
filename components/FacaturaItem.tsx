import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { FacturaExt } from "../types/factura";

interface Props {
  factura: FacturaExt;
  onPress: (factura: FacturaExt) => void;
}

export default function FacturaItem(props: Props): JSX.Element {
  const { receipt, monto, numeroPlaca, nombre, fecha } = props.factura;
  const onPress = props.onPress;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onPress(props.factura)}
        activeOpacity={0}
      >
        <View style={styles.item}>
          <Text>
            <Text style={styles.title}>Fatura #:</Text> {receipt}
          </Text>
          <Text>
            <Text style={styles.title}>Nombre #:</Text> {nombre}
          </Text>
          <Text>
            <Text style={styles.title}>Placa #:</Text> {numeroPlaca}
          </Text>
          <Text>
            <Text style={styles.title}>Monto:</Text> {monto}
          </Text>
          <Text>
            <Text style={styles.title}>Fecha:</Text> {fecha}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#eceff1",
    borderBottomWidth: 1,
    borderColor: "#babdbe",
    borderRadius: 2,
    padding: 15,
  },
  title: {
    fontWeight: "bold",
  },
  item: {
    // width: "100%",
    // flex: 1,
  },
});
