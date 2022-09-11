import { StyleSheet, Text, View } from "react-native";

export default function Facturas() {
  return (
    <View style={styles.container}>
      <Text>Facturas Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
