import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Intro from "./app/screens/Intro";
import { useEffect, useState } from "react";
import NoteScreen from "./app/screens/NoteScreen";

const App = () => {
  const [user, setUser] = useState({});

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");
    if (result !== null) {
      setUser(JSON.parse(result));
    }
    console.log(result);
  };

  useEffect(() => {
    findUser();
    // AsyncStorage.clear()
  }, []);

  if (!user?.name) return <Intro onFinish={findUser} />;

  return <NoteScreen user={user} />;
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
