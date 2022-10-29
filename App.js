import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Intro from "./app/screens/Intro";
import { useEffect } from "react";

const App = () => {
  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");
    console.log(result);
  };

  useEffect(() => {
    findUser();
  }, []);

  return <Intro />;
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
