import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { createGlobalStyle } from "styled-components";
import { useContext, useEffect } from "react";
import {
  AspenConfigContext,
  AspenConfigProvider,
} from "./contexts/AspenConfigContext";
import { initializeNavigation } from "@aspen.cloud/client";

// TODO: disable transition on page load
// transition: background 0.2s ease-in, color 0.2s ease-in;
const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

function ConfiguredApp() {
  const [aspenConfig, _setAspenConfigValue] = useContext(AspenConfigContext);
  return (
    <DarkModeProvider isDarkMode={aspenConfig.DARK_MODE === "true"}>
      <GlobalStyles />
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/games/:gameId" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </DarkModeProvider>
  );
}

function App() {
  useEffect(() => {
    initializeNavigation();
  }, []);
  return (
    <AspenConfigProvider>
      <ConfiguredApp />
    </AspenConfigProvider>
  );
}

export default App;
