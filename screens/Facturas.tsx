import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { FacturaExt } from "../types/factura";
import { getFacturas } from "../storage/api";

import FacturaItem from "../components/FacaturaItem";
import { FacturasProps, Routes } from "../types/navigation";

export default function Facturas({ navigation }: FacturasProps) {
  const [factura, setFactura] = useState<FacturaExt[]>([]);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;

    setShow(Platform.OS === "android");
    setDate(currentDate);
    console.log(currentDate);
    setShow(false);
  };

  useEffect(() => {
    const unsubscribe = async () => {
      const datos = await getFacturas();
      setFactura(datos);
    };

    unsubscribe();
  }, [factura]);

  const handleOnPress = (factura: FacturaExt) => {
    navigation.navigate(Routes.FacturaDetails, {
      collectionId: factura.collectionId,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Facturas</Text>

      <Button title="DATEPICKER" onPress={() => setShow(true)} />
      {show && (
        <DateTimePicker
          testID="Fecha"
          value={date}
          mode={"date"}
          display="default"
          onChange={onChangeDate}
        />
      )}

      <SafeAreaView style={styles.safeArea}>
        <FlatList
          style={styles.flatList}
          data={factura}
          keyExtractor={(item) => item.collectionId}
          renderItem={({ item, index }) => {
            return (
              <FacturaItem
                factura={item}
                key={index}
                onPress={() => handleOnPress(item)}
              />
            );
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
    marginTop: 0,
    backgroundColor: "#fff",
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
