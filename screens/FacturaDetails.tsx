import { FacturaBase, FacturaExt } from "../types/factura";
import { FacturaDetailsProps } from "../types/navigation";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { getFactura } from "../storage/api";

export default function FacturaDetails(
  facturaDetail: FacturaDetailsProps
): JSX.Element {
  const collectionId = facturaDetail.route.params.collectionId;
  const [factura, setFactura] = useState<FacturaBase>();

  useEffect(() => {
    const unsubscribe = async () => {
      const datos = await getFactura(collectionId);

      if (datos.receipt === 0) {
        console.log("error");
      } else {
        setFactura({
          cedula: datos.cedula,
          userId: datos.userId,
          receipt: datos.receipt,
          fecha: datos.fecha,
          nombre: datos.nombre,
          monto: datos.monto,
          numeroPlaca: datos.numeroPlaca,
          numeroRegistro: datos.numeroRegistro,
        });
      }
    };

    try {
      unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [setFactura]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Factura # {factura?.receipt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#babdbe",
    borderRadius: 2,
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  item: {
    // width: "100%",
    // flex: 1,
  },
});
