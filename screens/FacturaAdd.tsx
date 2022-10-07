import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import DatePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { saveFactura } from "../storage/api";
import { FacturaAddProps, Routes } from "../types/navigation";

import { FormatDate } from "../utils/functions";

export default function FacturaAdd({ navigation }: FacturaAddProps) {
  const [nombre, setNombre] = useState<string>("");
  const [cedula, setCedula] = useState<string>("");
  const [placa, setPlaca] = useState<string>("");
  const [registro, setRegistro] = useState<string>("");
  const [monto, setMonto] = useState<string>("0");
  const [fecha, setFecha] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState<boolean>(false);

  useEffect(() => {
    const current = new Date();
    setFecha(FormatDate(current));
  }, []);

  const onChangeDate = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;

    if (currentDate != undefined) {
      setFecha(FormatDate(currentDate));
      setDate(currentDate);
    }
    setShowDate(false);
  };

  const handleSubmit = async () => {
    if (
      nombre === "" ||
      cedula === "" ||
      placa === "" ||
      registro === "" ||
      monto === "0"
    ) {
      Alert.alert("Mensaje!", "Debe llenar todos los campos.", [
        { text: "Cerrar" },
      ]);
    } else {
      const result = await saveFactura({
        userId: "",
        receipt: 0,
        cedula: cedula,
        fecha: fecha,
        nombre: nombre,
        monto: parseFloat(monto),
        numeroPlaca: placa,
        numeroRegistro: registro,
      });

      Alert.alert(result.type ? "Mensaje!" : "Error!", result.message, [
        {
          text: "Cerrar",
          onPress: () =>
            navigation.navigate(Routes.FacturaDetails, {
              collectionId: result.collectionId,
            }),
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrar Factura</Text>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={styles.fullContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={{ width: 350, ...styles.input }}
            onChangeText={(text) => setNombre(text)}
            value={nombre}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.fullContainer}>
          <Text style={styles.label}>Cedula</Text>
          <TextInput
            style={{ width: 350, ...styles.input }}
            onChangeText={(text) => setCedula(text.toUpperCase())}
            value={cedula}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
        <View style={{ flexDirection: "row", width: 350, marginBottom: 10 }}>
          <View style={styles.leftContainer}>
            <Text style={styles.label}>Número de Placa</Text>
            <TextInput
              style={{ ...styles.input }}
              onChangeText={(text) => setPlaca(text.toUpperCase())}
              value={placa}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.label}>Número de Registro</Text>
            <TextInput
              style={{ ...styles.input }}
              onChangeText={(text) => setRegistro(text.toUpperCase())}
              value={registro}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", width: 350, marginBottom: 10 }}>
          <View style={styles.leftContainer}>
            <Text style={styles.label}>Monto</Text>
            <TextInput
              style={{ ...styles.input }}
              onChangeText={(text) => setMonto(text)}
              value={monto}
              underlineColorAndroid="transparent"
              keyboardType="decimal-pad"
              autoCapitalize="none"
            />
          </View>

          {useMemo(() => {
            return (
              showDate && (
                <DatePicker
                  testID="Fecha"
                  value={date}
                  mode={"date"}
                  display="default"
                  onChange={onChangeDate}
                />
              )
            );
          }, [showDate])}

          <View style={styles.rightContainer}>
            <Text style={styles.label}>Fecha</Text>
            <TouchableOpacity
              onPress={() => setShowDate(true)}
              activeOpacity={0}
            >
              <Text style={{ ...styles.input }}>{fecha}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Button title="Guardar Factura" onPress={() => handleSubmit()} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 25,
  },
  fullContainer: {
    flexDirection: "column",
    marginBottom: 10,
  },
  leftContainer: {
    flexDirection: "column",
    flex: 1,
    marginRight: 5,
  },
  rightContainer: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 5,
  },
  label: {
    fontWeight: "bold",
    textAlign: "left",
  },
  input: {
    height: 48,
    borderRadius: 5,
    backgroundColor: "white",
    padding: 16,
    borderColor: "#455a64",
    border: 2,
  },
});
