import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import NoteContainer from "./components/NoteContainer/NoteContainer";

const App = () => {
  return (
    <View style={styles.container}>
    <NoteContainer />
      <StatusBar style="auto" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 0,
    padding:0,
    marginTop: 35
    // alignItems: "center",
    // justifyContent: "center",
  },
});
