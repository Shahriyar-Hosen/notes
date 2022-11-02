import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Note from "../components/Note";
import NoteDetailModal from "../components/NoteDetailModal";
import NoteInputModal from "../components/NoteInputModal";
import RoundIconBtn from "../components/RoundIconBtn";
import SearchBar from "../components/SearchBar";
import colors from "../misc/colors";
import styled from "styled-components/native";

const Container = styled.View`
  padding: 0 20px;
  flex: 1;
  z-index: 1;
  background-color: ${({ theme }) => theme?.main?.BG};
`;
const Header = styled.Text`
  font-size: 20px;
  font-weight: bold;
  padding-top: 10px;
  color: ${({ theme }) => theme?.main?.SECONDARY}
`;
const Nav = styled.Text`
  font-size: 25px;
  font-weight: bold;
  padding-top: 20px;
  color: ${({ theme }) => theme?.main?.COLOR}
`;
const EmptyHeader = styled.Text`
  font-size: 30px;
  text-transform: uppercase;
  font-weight: bold;
  opacity: 0.2;
  color: ${({ theme }) => theme?.main?.COLOR}
`;
const EmptyHeaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;
const AddBtn = styled.Text`
  position: absolute;
  right: 15px;
  bottom: 50px;
  z-index: 1;
`;

const NoteScreen = ({ user }) => {
  const [greet, setGreet] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [detailItem, setDetailItem] = useState({});
  const [detailModal, setDetailModal] = useState(false);

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet("Morning");
    if (hrs === 1 || hrs < 17) return setGreet("Afternoon");
    setGreet("Evening");
  };

  const findNotes = async () => {
    const result = await AsyncStorage.getItem("notes");
    if (result !== null) setNotes(JSON.parse(result));
  };

  useEffect(() => {
    // AsyncStorage.clear()
    findNotes();
    findGreet();
  }, []);

  const handleOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const detailNote = (item) => {
    setDetailItem(item);
    setDetailModal(true);
  };

  const detailOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>

          <Nav>Note List</Nav>
          <Header> {`Good ${greet} ${user.name}`}</Header>

          {notes.length ? (
            <SearchBar containerStyle={{ marginVertical: 20 }} />
          ) : null}

          <FlatList
            data={notes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Note onPress={() => detailNote(item)} item={item} />
            )}
          />

          {!notes.length ? (
            <EmptyHeaderContainer style={StyleSheet.absoluteFillObject}>
              <EmptyHeader>Add Notes</EmptyHeader>
            </EmptyHeaderContainer>
          ) : null}
        </Container>
      </TouchableWithoutFeedback>

      <RoundIconBtn
        onPress={() => setModalVisible(true)}
        antIconName="plus"
        style={styles.addBtn}
      />

      <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
      <NoteDetailModal
        visible={detailModal}
        onClose={() => setDetailModal(false)}
        onSubmit={detailOnSubmit}
        item={detailItem}
        setNotes={setNotes}
      />
    </>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    position: "absolute",
    right: 15,
    bottom: 50,
    zIndex: 1,
  },
});

export default NoteScreen;
