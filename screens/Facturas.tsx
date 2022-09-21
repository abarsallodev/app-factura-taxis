import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FacturasList } from "../types/factura";
import { getFacturas } from "../storage/api";

import FacturaItem from "../components/FacaturaItem";

const Item = (factura: FacturasList) => (
  <View>
    <Text>{factura.cedula}</Text>
    <Text>{factura.nombre}</Text>
  </View>
);

export default function Facturas() {
  const [facturasList, setFacturasList] = useState<FacturasList[]>([]);

  useEffect(() => {
    const unsubscribe = async () => {
      const datos = await getFacturas();
      setFacturasList(datos);
    };

    unsubscribe();
  }, [facturasList]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={facturasList}
          keyExtractor={(item) => item.collectionId}
          renderItem={({ item, index }) => {
            return <FacturaItem factura={item} />;
          }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#2e7d32",
    alignItems: "center",
    justifyContent: "center",
  },
});
