import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import colors from "../misc/colors";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  justify-content: center;
`;
const searchBar = styled.Text`
  border-width: 0.5px;
  border-color: ${colors.PRIMARY};
  height: 40;
  border-radius: 40;
  padding-left: 15;
  font-size: 20;
`;
const clearIcon = styled.Text`
  position: absolute;
  right: 10;
`;

const SearchBar = ({ containerStyle, value, onClear, onChangeText }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.searchBar}
        placeholder="Search here.."
      />
      {value ? (
        <AntDesign
          name="close"
          size={20}
          color={colors.PRIMARY}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
  },
  container: {
    justifyContent: "center",
  },
  clearIcon: {
    position: "absolute",
    right: 10,
  },
});

export default SearchBar;
