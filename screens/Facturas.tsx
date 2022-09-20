import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FacturasList } from "../types/factura";
import { getFacturas } from "../storage/api";

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

  const renderItem = (factura: FacturasList) => <Item {...factura} />;

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={facturasList}
          renderItem={(item) => (
            <Item
              collectionId={"ssss"}
              userId={""}
              receipt={0}
              cedula={""}
              fecha={""}
              nombre={"dddd"}
              monto={0}
              numeroPlaca={""}
              numeroRegistro={""}
              {...item}
            />
          )}
          keyExtractor={(item) => item.collectionId}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
