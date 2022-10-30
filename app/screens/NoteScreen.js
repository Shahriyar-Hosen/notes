import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Note from "../components/Note";
import NoteDetailModal from "../components/NoteDetailModal";
import NoteInputModal from "../components/NoteInputModal";
import RoundIconBtn from "../components/RoundIconBtn";
import SearchBar from "../components/SearchBar";
import colors from "../misc/colors";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  padding-inline: 20px;
  flex: 1;
  z-index: 1;
`;
const Header = styled.Text`
  font-size: 25px;
  font-weight: bold;
`;
const EmptyHeader = styled.Text`
  font-size: 30px;
  text-transform: uppercase;
  font-weight: bold;
  opacity: 0.2;
`;
const EmptyHeaderContainer = styled.Text`
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
      <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>

          {notes.length ? (
            <SearchBar containerStyle={{ marginVertical: 15 }} />
          ) : null}

          <FlatList
            data={notes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Note onPress={() => detailNote(item)} item={item} />
            )}
          />

          {!notes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Notes</Text>
            </View>
          ) : null}
        </View>
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
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  addBtn: {
    position: "absolute",
    right: 15,
    bottom: 50,
    zIndex: 1,
  },
});

export default NoteScreen;
