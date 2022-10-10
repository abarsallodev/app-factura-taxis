import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import DatePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { saveFactura } from "../storage/api";
import { FacturaAddProps, Routes } from "../types/navigation";

import { FormatDate } from "../utils/functions";
import Loader from "../components/Loader";

export default function FacturaAdd({ navigation }: FacturaAddProps) {
  const [nombre, setNombre] = useState<string>("");
  const [cedula, setCedula] = useState<string>("");
  const [placa, setPlaca] = useState<string>("");
  const [registro, setRegistro] = useState<string>("");
  const [monto, setMonto] = useState<string>("");
  const [fecha, setFecha] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

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
    setShowLoader(true);
    if (
      nombre === "" ||
      cedula === "" ||
      placa === "" ||
      registro === "" ||
      monto === ""
    ) {
      setShowLoader(false);
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

      setShowLoader(false);
      Alert.alert(result.type ? "Mensaje!" : "Error!", result.message, [
        {
          text: "Cerrar",
          onPress: () =>
            navigation.navigate(Routes.FacturaDetails, {
              factura: result.factura,
              refreshData: true,
            }),
        },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={true}
      >
        {/* <View style={styles.container}> */}
        {showLoader && <Loader message="Guardando información, espere." />}
        <Text style={styles.header}>Registrar Factura</Text>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={styles.fullContainer}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={{ width: 350, ...styles.input }}
              onChangeText={(text) => setNombre(text)}
              value={nombre}
              underlineColorAndroid="transparent"
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.fullContainer}>
            <Text style={styles.label}>Cedula</Text>
            <TextInput
              style={{ width: 350, ...styles.input }}
              onChangeText={(text) => setCedula(text)}
              value={cedula}
              underlineColorAndroid="transparent"
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.fullContainer}>
            <Text style={styles.label}>Número de Placa</Text>
            <TextInput
              style={{ width: 350, ...styles.input }}
              onChangeText={(text) => setPlaca(text)}
              value={placa}
              underlineColorAndroid="transparent"
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.fullContainer}>
            <Text style={styles.label}>Número de Registro</Text>
            <TextInput
              style={{ width: 350, ...styles.input }}
              onChangeText={(text) => setRegistro(text)}
              value={registro}
              underlineColorAndroid="transparent"
              autoCapitalize={"characters"}
            />
          </View>

          <View style={styles.fullContainer}>
            <Text style={styles.label}>Monto</Text>
            <TextInput
              style={{ width: 350, ...styles.input }}
              onChangeText={(text) => setMonto(text)}
              value={monto}
              underlineColorAndroid="transparent"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.fullContainer}>
            <Text style={styles.label}>Fecha</Text>
            <TouchableOpacity
              onPress={() => setShowDate(true)}
              activeOpacity={0}
            >
              <Text style={{ width: 350, ...styles.input }}>{fecha}</Text>
            </TouchableOpacity>
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

          <View>
            <Button title="Guardar Factura" onPress={() => handleSubmit()} />
          </View>
        </View>
        {/* </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
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
