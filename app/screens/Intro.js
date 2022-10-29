import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const Intro = () => {
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text>Enter Your Name to Continue</Text>
        <TextInput />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Intro;
