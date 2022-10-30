import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import colors from "../misc/colors";

const Note = ({ item, onPress }) => {
  const { title, desc } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text numberOfLines={3}>{desc}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    width: width - 10,
    margin: 5,
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: colors.SAME_DARK,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.DARK,
    textAlign: "center",
    marginBottom: 5,
  },
});

export default Note;
