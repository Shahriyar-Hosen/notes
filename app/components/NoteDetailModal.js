import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  padding-inline: 20px;
  padding-top: 15px;
  flex: 1;
`;

const Input = styled.TouchableOpacity`
  font-size: 20px;
  color: ${colors.DARK};
`;
const Title = styled.TouchableOpacity`
  margin-block: 20px;
  font-weight: bold;
  text-align: center;
`;
const Desc = styled.TouchableOpacity`
  margin-bottom: 25px;
  color: ${colors.SAME_DARK};
`;
const ModalBG = styled.TouchableOpacity`
  flex: 1;
  z-index: -1;
`;
const BtnContainer = styled.TouchableOpacity`
  flex-direction: "row";
  justify-content: "center";
  padding-inline: 15px;
  border-bottom-width: 2px;
  border-bottom-color: ${colors.PRIMARY};
`;
const BtnContainerS = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding-inline: 15px;
  margin-block: 20px;
`;
const BtnContainerS2 = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  margin-block: 20px;
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
      <StatusBar hidden />
      <Modal visible={visible} animationType="fade">
        {/* Btn Container */}
        <View style={styles.btnContainerS}>
          <RoundIconBtn
            size={15}
            antIconName="arrowleft"
            onPress={handleSubmit}
            style={{
              backgroundColor: colors.LIGHT,
            }}
          />
          <View style={styles.btnContainerS2}>
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
          </View>
        </View>

        <ScrollView style={styles.container}>
          <Text style={[styles.input, styles.title]}>{item.title}</Text>
          <Text style={[styles.input, styles.desc]}>{item.desc}</Text>
        </ScrollView>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    flex: 1,
  },
  input: {
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    marginVertical: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  desc: {
    marginBottom: 25,
    color: colors.SAME_DARK,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
  },
  btnContainerS: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    marginHorizontal: 20,
  },
  btnContainerS2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
});

export default NoteDetailModal;
