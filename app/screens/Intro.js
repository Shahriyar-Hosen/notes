import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Dimensions, StatusBar } from "react-native";
import RoundIconBtn from "../components/RoundIconBtn";
import colors from "../misc/colors";
import styled from "styled-components/native";

const width = Dimensions.get("window").width - 50;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const InputTitle = styled.Text`
  align-self: flex-start;
  padding: 25px;
  margin-bottom: 5;
  opacity: 0.5;
`;
// ${colors.PRIMARY};
const TextInputC = styled.TextInput`
  border-width: 2px;
  border-color: ${({ theme }) => theme?.main?.PRIMARY};
  color: ${({ theme }) => theme?.main?.PRIMARY};
  width: ${width}px;
  height: 50px;
  border-radius: 10px;
  padding-left: 15px;
  font-size: 25px;
  margin-bottom: 15px;
`;

const Intro = ({ onFinish }) => {
  const [name, setName] = useState("");

  const handleOnChangeText = (text) => setName(text);

  const handleSubmit = async () => {
    const user = { name: name };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    if (onFinish) onFinish();
  };

  return (
    <>
      <StatusBar hidden />
      <Container>
        <InputTitle>Enter Your Name to Continue</InputTitle>
        <TextInputC
          value={name}
          onChangeText={handleOnChangeText}
          placeholder="Enter Name"
        />

        {/* If Text value > 3 than show Button */}
        {name.trim().length >= 3 ? (
          <RoundIconBtn antIconName="arrowright" onPress={handleSubmit} />
        ) : null}
      </Container>
    </>
  );
};

export default Intro;
