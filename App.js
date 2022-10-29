import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Intro from "./app/screens/Intro";

const App = () => {
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
