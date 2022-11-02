import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const theme = { dark: isDarkMode };
    AsyncStorage.setItem("theme", JSON.stringify(theme));
  }, [isDarkMode]);

  const result = AsyncStorage.getItem("theme");

  console.log(result);

  return [isDarkMode, setIsDarkMode];
};

export default useTheme;
