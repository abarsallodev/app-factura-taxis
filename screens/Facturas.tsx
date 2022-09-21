import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
      <Text style={styles.title}>Listado de Facturas</Text>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          style={styles.flatList}
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
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 15,
  },
  safeArea: {
    width: "100%",
    flex: 1,
  },
  flatList: {
    width: "100%",
  },
});
