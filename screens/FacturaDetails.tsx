import { FacturaExt } from "../types/factura";
import { FacturaDetailsProps } from "../types/navigation";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function FacturaDetails(
  facturaDetail: FacturaDetailsProps
): JSX.Element {
  const collectionId = facturaDetail.route.params.collectionId;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Factura # {collectionId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#babdbe",
    borderRadius: 2,
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  item: {
    // width: "100%",
    // flex: 1,
  },
});
