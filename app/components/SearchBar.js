import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import colors from "../misc/colors";
import styled from "styled-components/native";

const Container = styled.View`
  justify-content: center;
`;
const SearchInput = styled.TextInput`
  border-width: 1px;
  border-color: ${({ theme }) => theme?.main?.PRIMARY};
  color: ${({ theme }) => theme?.main?.PRIMARY};
  height: 40px;
  border-radius: 30px;
  padding-left: 15px;
  font-size: 20px;
  padding: 0 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme?.main?.SEARCH};
`;

const SearchBar = ({ containerStyle, value, onClear, onChangeText }) => {
  return (
    <Container style={containerStyle}>
      <SearchInput
        value={value}
        onChangeText={onChangeText}
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
    </Container>
  );
};

const styles = StyleSheet.create({
  clearIcon: {
    position: "absolute",
    right: 10,
  },
});

export default SearchBar;
