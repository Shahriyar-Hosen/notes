import { View, Text, StyleSheet } from "react-native";
import React from "react";

const NoteDetail = () => {
  return (
    <View style={styles.container}>
      <Text>NoteDetail</Text>
    </View>
  );
};

export default NoteDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
