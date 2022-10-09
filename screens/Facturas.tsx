import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Alert,
  Button,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { FacturaExt } from "../types/factura";
import { getFacturas } from "../storage/api";

import FacturaItem from "../components/FacaturaItem";
import { FacturasProps, Routes } from "../types/navigation";

import Loader from "../components/Loader";
import { FormatDate } from "../utils/functions";

export default function Facturas({ navigation }: FacturasProps) {
  const [facturas, setFacturas] = useState<FacturaExt[]>([]);
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState<string>("");
  const [showDate, setShowDate] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const onChangeDate = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;

    if (currentDate != undefined) {
      setDateText(FormatDate(currentDate));
      setDate(currentDate);
    }
    setShowDate(false);
  };

  const fetchData = useCallback(async () => {
    setShowLoader(true);
    const datos = await getFacturas(dateText);
    setFacturas(datos);
    setShowLoader(false);
  }, [dateText]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOnPress = (factura: FacturaExt) => {
    navigation.navigate(Routes.FacturaDetails, {
      factura: factura,
      navigateOrPush: true,
    });
  };

  return (
    <View style={styles.container}>
      {showLoader && <Loader message="Cargando Datos..." />}

      <TouchableOpacity
        style={styles.floatinButton}
        onPress={() => navigation.navigate(Routes.FacturaAdd)}
      >
        <FontAwesome5 name={"plus"} color={"#ffffff"} size={16} />
      </TouchableOpacity>
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
          data={facturas}
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
  floatinButton: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 30,
    backgroundColor: "#0984e3",
    borderRadius: 50,
    zIndex: 4,
  },
});
