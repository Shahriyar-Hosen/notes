import React, { useState } from "react";
import { StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import colors from "../misc/colors";
import styled from "styled-components/native";

const width = Dimensions.get("window").width - 40;

const Container = styled.TouchableOpacity`
  background-color: ${colors.PRIMARY};
  width: ${width - 10}px;
  margin: 5px;
  padding: 8px;
  padding-inline: 15px;
  border-radius: 10px;
  color: ${colors.SAME_DARK};
`;
const Title = styled.Text`
  color: ${colors.DARK};
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const Note = ({ item, onPress }) => {
  const { title, desc } = item;

  return (
    <Container onPress={onPress}>
      <Title numberOfLines={2}>{title}</Title>
      <Text numberOfLines={3}>{desc}</Text>
    </Container>
  );
};

export default Note;
