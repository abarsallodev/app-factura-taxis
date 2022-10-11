import { FacturaBase, FacturaExt } from "../types/factura";
import { FacturaDetailsProps, Routes } from "../types/navigation";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { HeaderBackButton } from "@react-navigation/elements";

export default function FacturaDetails(
  facturaDetailsProps: FacturaDetailsProps
): JSX.Element {
  const factura: FacturaExt | undefined =
    facturaDetailsProps.route.params.factura;
  const loadData = facturaDetailsProps.route.params.refreshData;

  useLayoutEffect(() => {
    facturaDetailsProps.navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderBackButton
            onPress={() => {
              facturaDetailsProps.navigation.navigate(Routes.Facturas, {
                loadData: loadData,
              });
            }}
          />
        );
      },
    });
  }, [facturaDetailsProps.navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Factura # {factura?.receipt}</Text>

      <View style={{ ...styles.row }}>
        <Text style={{ ...styles.title }}>Nombre:</Text>
        <Text style={styles.value}>{factura?.nombre}</Text>
      </View>

      <View style={{ ...styles.row }}>
        <Text style={styles.title}>Cédula:</Text>
        <Text style={styles.value}>{factura?.cedula}</Text>
      </View>

      <View style={{ ...styles.row }}>
        <Text style={styles.title}>Número de Placa:</Text>
        <Text style={styles.value}>{factura?.numeroPlaca}</Text>
      </View>

      <View style={{ ...styles.row }}>
        <Text style={styles.title}>Número de Registro:</Text>
        <Text style={styles.value}>{factura?.numeroRegistro}</Text>
      </View>

      <View style={{ ...styles.row }}>
        <Text style={styles.title}>Monto:</Text>
        <Text style={styles.value}>{factura?.monto}</Text>
      </View>

      <View style={{ ...styles.row }}>
        <Text style={styles.title}>Fecha:</Text>
        <Text style={styles.value}>{factura?.fecha}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#efefef",
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
    paddingHorizontal: 5,
  },
  item: {
    // width: "100%",
    // flex: 1,
  },
});
