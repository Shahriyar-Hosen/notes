import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  padding: 0 20px;
  padding-top: 15px;
  flex: 1;
  background-color: ${({ theme }) => theme?.main?.BG};
`;
const Title = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.main.COLOR};
  margin: 18px 0;
  font-weight: bold;
  text-align: center;
`;
const Desc = styled.Text`
  font-size: 15px;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.main.LITE_COLOR};
`;
const ModalBG = styled.View`
  background-color: ${({ theme }) => theme?.main?.BG};
  flex: 1;
  z-index: -1;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
  margin: 20px 0;
`;
const BtnContainerL = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 20px;
`;

const NoteDetailModal = ({ visible, onClose, setNotes, item }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDesc(item.desc);
    }
  }, [item]);

  const handleSubmit = () => {
    if (!title?.trim() && !desc?.trim()) return onClose();
    setTitle("");
    setDesc("");
    onClose();
  };

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem("notes");

    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => n.id !== item.id);

    setNotes(newNotes);

    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));

    onClose();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      "Are You Sure!",
      "This action will delete your note permanently!",
      [
        {
          text: "Delete",
          onPress: deleteNote,
        },
        {
          text: "No Thanks",
          onPress: () => console.log("no thanks"),
          //   onPress: () => console.log("no thanks"),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <>
      {/* <StatusBar hidden /> */}
      <Modal visible={visible} animationType="fade">
        {/* Btn Container */}
        <BtnContainer>
          <RoundIconBtn
            size={15}
            antIconName="arrowleft"
            onPress={handleSubmit}
            style={{
              backgroundColor: colors.SAME_DARK,
            }}
          />
          <BtnContainerL>
            <RoundIconBtn
              size={15}
              antIconName="delete"
              style={{
                backgroundColor: colors.ERROR,
                color: colors.LIGHT,
                marginLeft: 15,
              }}
              onPress={displayDeleteAlert}
            />

            <RoundIconBtn
              size={15}
              antIconName="edit"
              style={{ marginLeft: 15 }}
              onPress={handleSubmit}
            />
          </BtnContainerL>
        </BtnContainer>

        <Container>
          <Title>{item.title}</Title>
          <Desc>{item.desc}</Desc>
        </Container>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <ModalBG style={StyleSheet.absoluteFillObject} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default NoteDetailModal;
