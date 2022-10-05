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
import { async } from "@firebase/util";

export default function FacturaDetails() {
  const [nombre, setNombre] = useState<string>("");
  const [cedula, setCedula] = useState<string>("");
  const [placa, setPlaca] = useState<string>("");
  const [registro, setRegistro] = useState<string>("");
  const [monto, setMonto] = useState<number>(0);
  const [fecha, setFecha] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState<boolean>(false);

  const FormatDate = (current: Date) => {
    const day =
      current.getDate() < 10 ? `0${current.getDate()}` : `${current.getDate()}`;

    const month =
      current.getMonth() + 1 < 10
        ? `0${current.getMonth() + 1}`
        : `${current.getMonth() + 1}`;

    const year = current.getFullYear();
    return `${year.toString()}-${month.toString()}-${day.toString()}`;
  };

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
      monto === 0
    ) {
      Alert.alert("Mensaje!", "Debe llenar todos los campos.", [
        { text: "Cerrar" },
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
            onChangeText={(text) => setCedula(text)}
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
              onChangeText={(text) => setPlaca(text)}
              value={placa}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.label}>Número de Registro</Text>
            <TextInput
              style={{ ...styles.input }}
              onChangeText={(text) => setRegistro(text)}
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
