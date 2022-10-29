import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

// let bgColor = value;

const Note = ({ note }) => {
  let timer = 500,
    timeout;

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);
    const monthNames = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    let hrs = date.getHours();
    let amPm = hrs >= 12 ? "PM" : "AM";
    hrs = hrs ? hrs : "12";
    hrs = hrs > 12 ? (hrs = 24 - hrs) : hrs;

    let min = date.getMinutes();
    min = min < 10 ? "0" + min : min;

    let day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${hrs}:${min} ${amPm} ${day} ${month}`;
  };

  const debounce = (func) => {
    clearTimeout(timeout);
    timeout = setTimeout(func, timer);
  };

  const updateText = (text, id) => {
    debounce(() => props.updateText(text, id));
  };
  const { text, time, color } = note || {};

  return (
    <View style={styles.note}>
      <TextInput
        style={styles.input}
        defaultValue={text}
        // onChangeText={onChangeText}
      />
      <Text>{time}</Text>
    </View>
  );
};

export default Note;

const styles = StyleSheet.create({
  note: {
    padding: 25,
    height: 280,
    width: 260,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "cyan",
    borderRadius: 30,
  },
  note_text: {
    flex: 1,
    // resize: "none",
    resizeMode: "none",
    backgroundColor: "transparent",
    fontSize: "1rem",
    lineHeight: "1.875rem",
    outline: "none",
    border: "none",
  },
});
