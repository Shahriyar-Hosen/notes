import {  Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import Note from "../Note/Note";

const NoteContainer = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>NoteContainer</Text>
      <SafeAreaView style={styles.note_container_notes}>
        <Note
          note={{
            text: "abcdefgh",
            time: "11:14 AM",
            color: "cyan",
          }}
        />
        <Note
          note={{
            text: "abcdefgh",
            time: "11:14 AM",
            color: "cyan",
          }}
        />
        <Note
          note={{
            text: "abcdefgh",
            time: "11:14 AM",
            color: "cyan",
          }}
        />
        <Note
          note={{
            text: "abcdefgh",
            time: "11:14 AM",
            color: "cyan",
          }}
        />
        <Note
          note={{
            text: "abcdefgh",
            time: "11:14 AM",
            color: "cyan",
          }}
        />
        <Note
          note={{
            text: "abcdefgh",
            time: "11:14 AM",
            color: "cyan",
          }}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default NoteContainer;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  header: {
    marginBottom: 20,
  },
  note_container_notes: {
    height: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
r
    // gap: 100,
    // overflowY: "scroll",
  },
});
