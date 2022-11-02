import AsyncStorage from "@react-native-async-storage/async-storage";
import Intro from "./app/screens/Intro";
import { useEffect, useState } from "react";
import NoteScreen from "./app/screens/NoteScreen";
import { ThemeProvider } from "styled-components/native";
import colors from "./app/misc/colors";
import dark from "./app/misc/dark";
import useTheme from "./app/hooks/useTheme";

const App = () => {
  const [user, setUser] = useState({});
  const [isDarkMode, setIsDarkMode] = useTheme();

  const theme = {
    main: isDarkMode ? dark : colors,
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
      <NoteScreen
        user={user}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    </ThemeProvider>
  );
};

export default App;
