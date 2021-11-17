import React, { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../themes";

export const DarkModeContext = createContext(false);

interface DarkModeProviderProps {
  isDarkMode: boolean;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  isDarkMode,
  children,
}) => {
  return (
    <DarkModeContext.Provider value={isDarkMode}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
};
