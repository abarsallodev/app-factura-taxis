import { UsersProps, Routes } from "../types/navigation";
import { UserModel } from "../types/user";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { GetUsers } from "../storage/api";
import UserItem from "../components/UserItem";
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
  }, [users, setUsers]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.floatinButton}
        onPress={() => navigation.navigate(Routes.UserAdd)}
      >
        <FontAwesome5 name={"user-plus"} color={"#ffffff"} size={16} />
      </TouchableOpacity>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          style={styles.flatList}
          data={users}
          renderItem={({ item, index }) => {
            return <UserItem key={index} user={item} onPress={() => {}} />;
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
    flex: 1,
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
