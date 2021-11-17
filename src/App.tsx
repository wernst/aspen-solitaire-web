import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`;

function App() {
  return (
    <DarkModeProvider>
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

export default App;
