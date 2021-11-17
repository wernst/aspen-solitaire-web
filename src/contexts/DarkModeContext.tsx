import React, { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../themes";

export const DarkModeContext = createContext({});

export const DarkModeProvider: React.FC = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {props.children}
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
};
