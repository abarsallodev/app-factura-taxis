import React, { useEffect, useState, useMemo } from "react";
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
  const [dateText, setDateText] = useState<string>("");
  const [showDate, setShowDate] = useState<boolean>(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;

    const day =
      currentDate.getDate() < 10
        ? `0${currentDate.getDate()}`
        : `${currentDate.getDate()}`;
    const month =
      currentDate.getMonth() + 1 < 10
        ? `0${currentDate.getMonth() + 1}`
        : `${currentDate.getMonth() + 1}`;
    const year = currentDate.getFullYear();

    setDateText(`${year.toString()}-${month.toString()}-${day.toString()}`);
    console.log(dateText);
    setShowDate(false);
    setDate(currentDate);
  };

  useEffect(() => {
    const unsubscribe = async () => {
      const datos = await getFacturas(dateText);
      console.log(datos);
      setFactura(datos);
    };

    try {
      unsubscribe();
    } catch (error) {
      console.log(error);
    }

    // return () => {
    //   unsubscribe;
    // };
  }, [setFactura, dateText]);

  const handleOnPress = (factura: FacturaExt) => {
    navigation.navigate(Routes.FacturaDetails, {
      collectionId: factura.collectionId,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Facturas</Text>
      <View style={{ marginBottom: 5 }}>
        <Button title="Filtra Por Fecha" onPress={() => setShowDate(true)} />
        <Button title="Mostrar Todos" onPress={() => setDateText("")} />
      </View>

      {useMemo(() => {
        return (
          showDate && (
            <DateTimePicker
              testID="Fecha"
              value={date}
              mode={"date"}
              display="default"
              onChange={onChangeDate}
            />
          )
        );
      }, [showDate])}

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
    // alignItems: "center",
    // justifyContent: "center",
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
