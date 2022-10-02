import { UsersProps, Routes } from "../types/navigation";
import { UserModel } from "../types/user";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { GetUsers } from "../storage/api";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native";

export default function Users({ navigation }: UsersProps) {
  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    const unsubscribe = async () => {
      const datos = await GetUsers();
      setUsers(datos);
    };

    unsubscribe();
  }, [setUsers]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(Routes.UserAdd)}
      >
        <FontAwesome5
          style={styles.buttonIcon}
          name={"user-plus"}
          color={"#ffffff"}
          size={16}
        />
        <Text style={styles.buttonTitle}>Añadir Usuario</Text>
      </TouchableOpacity>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          style={styles.flatList}
          data={users}
          // keyExtractor={(item) => item.userId}
          renderItem={({ item, index }) => {
            return <Text key={index}>{item.name}</Text>;
          }}
        />
      </SafeAreaView>
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
  button: {
    backgroundColor: "#0984e3",
    width: 350,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    marginRight: 5,
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  safeArea: {
    width: "100%",
    flex: 1,
  },
  flatList: {
    width: "100%",
  },
});
