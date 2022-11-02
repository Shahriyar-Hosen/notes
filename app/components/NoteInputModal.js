import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Modal,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";
import styled from "styled-components/native";

const Container = styled.View`
  padding: 0 20px;
  padding-top: 15px;
  background-color: ${({ theme }) => theme?.main?.BG};
  color: ${({ theme }) => theme?.main?.COLOR};
  height: 100%;
`;
const Header = styled.Text`
  font-size: 25px;
  font-weight: bold;
  padding: 20px 0;
  color: ${({ theme }) => theme?.main?.COLOR};
  text-align: center;
`;
const Title = styled.TextInput`
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }) => theme?.main?.PRIMARY};
  font-size: 18px;
  color: ${({ theme }) => theme?.main?.PRIMARY};
  height: 40px;
  margin-bottom: 15px;
  font-weight: bold;
  padding: 0 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme?.main?.SEARCH};
`;
const Desc = styled.TextInput`
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }) => theme?.main?.PRIMARY};
  font-size: 16px;
  color: ${({ theme }) => theme?.main?.PRIMARY};
  min-height: 70px;
  // height: 100px;
  padding: 0 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme?.main?.SEARCH};
`;
const ModalBG = styled.View`
  flex: 1;
  z-index: -1;
`;
const BtnContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 15px 0;
`;

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();

    onSubmit(title, desc);
    setTitle("");
    setDesc("");
    onClose();
  };

  const closeModal = () => {
    setTitle("");
    setDesc("");
    onClose();
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType="fade">
        <Container>
          <Header>Add New Notes!</Header>
          <Title
            value={title}
            onChangeText={(text) => handleOnChangeText(text, "title")}
            placeholder="Title"
          />
          <Desc
            value={desc}
            multiline
            placeholder="Note"
            onChangeText={(text) => handleOnChangeText(text, "desc")}
          />

          <BtnContainer>
            <RoundIconBtn
              size={15}
              antIconName="check"
              onPress={handleSubmit}
            />

            {title.trim() || desc.trim() ? (
              <RoundIconBtn
                size={15}
                style={{ marginLeft: 15 }}
                antIconName="close"
                onPress={closeModal}
              />
            ) : null}
          </BtnContainer>
        </Container>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <ModalBG style={StyleSheet.absoluteFillObject} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default NoteInputModal;
