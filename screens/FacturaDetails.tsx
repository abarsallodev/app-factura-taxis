import { FacturaBase, FacturaExt } from "../types/factura";
import { FacturaDetailsProps, Routes } from "../types/navigation";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { getFactura } from "../storage/api";
import { HeaderBackButton } from "@react-navigation/elements";

export default function FacturaDetails(
  facturaDetail: FacturaDetailsProps
): JSX.Element {
  const collectionId = facturaDetail.route.params.collectionId;
  const [factura, setFactura] = useState<FacturaBase>();
  const { navigation } = facturaDetail;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderBackButton
            onPress={() => navigation.navigate(Routes.Facturas)}
          />
        );
      },
    });
  }, [navigation]);

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
