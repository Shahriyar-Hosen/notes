import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Intro from "./app/screens/Intro";
import { useEffect, useState } from "react";
import NoteScreen from "./app/screens/NoteScreen";
import { ThemeProvider } from "styled-components/native";
import colors from "./app/misc/colors";
import dark from "./app/misc/dark";

const App = () => {
  const [user, setUser] = useState({});

  const theme = {
    main: dark || "mediumseagreen",
  };

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");
    if (result !== null) {
      setUser(JSON.parse(result));
    }
  };

  useEffect(() => {
    findUser();
    // AsyncStorage.clear();
  }, []);

  if (!user?.name)
    return (
      <ThemeProvider theme={theme}>
        <Intro onFinish={findUser} />
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={theme}>
      <NoteScreen user={user} />
    </ThemeProvider>
  );
};

export default App;
