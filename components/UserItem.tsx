import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { UserModel } from "../types/user";
import { FontAwesome5 } from "@expo/vector-icons";

interface Props {
  user: UserModel;
  onPress: () => void;
}
export default function UserItem(props: Props): JSX.Element {
  const { user } = props;
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome5
          style={styles.icon}
          name={"user-alt"}
          color={"#ffffff"}
          size={16}
        />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.texto}>{user.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eceff1",
    borderColor: "#babdbe",
    border: 1,
    borderRadius: 2,
    padding: 5,
    margin: 5,
    flexDirection: "row",
    height: 50,
  },
  iconContainer: {
    backgroundColor: "#42a5f5",
    height: 40,
    boder: 1,
    borderRadius: 50,
    paddingHorizontal: 12,
    borderColor: "#9ea7aa",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontWeight: "bold",
    color: "#fff",
  },
  userInfo: {
    justifyContent: "center",
    paddingStart: 10,
  },
  texto: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
