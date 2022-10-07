import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Loader(message: string) {
  return (
    <View style={[styles.container]}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color="#0984e3" />
        <Text style={styles.message}>{message && "Cargando ... "}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(61,61,61,0.8)",
    zIndex: 1000,
  },
  loaderBox: {
    backgroundColor: "#fff",
    top: -40,
    width: 250,
    height: 100,
    border: 1,
    borderRadius: 5,
    borderColor: "#757575",
    padding: 15,
    alignItems: "center",
  },
  message: {
    fontWeight: "bold",
    marginTop: 10,
  },
});
