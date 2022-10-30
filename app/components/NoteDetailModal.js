import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert, Keyboard, Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View
} from "react-native";
import styled from "styled-components/native";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";

const Container = styled.TouchableOpacity`
  background-color: ${colors.PRIMARY};
  width: ${10}px;
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

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDesc(text);
  };

  const handleSubmit = () => {
    if (!title?.trim() && !desc?.trim()) return onClose();

    // onSubmit(title, desc);
    setTitle("");
    setDesc("");
    onClose();
  };

  const closeModal = () => {
    setTitle("");
    setDesc("");
    onClose();
  };

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem("notes");

    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => n.id !== item.id);
    const seletedNotes = notes.filter((n) => n.id === item.id);

    console.log(seletedNotes);
    setNotes(newNotes);

    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));

    // console.log(newNotes, "Delete Done");
    onClose();
    // props.navigation.goBack();
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
