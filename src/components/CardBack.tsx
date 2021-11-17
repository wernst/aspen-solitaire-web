import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { CARD_HEIGHT, CARD_WIDTH } from "../style-constants";

export default function CardBack() {
  const isDarkMode = useContext(DarkModeContext);
  return (
    <div
      style={{
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
      }}
    >
      <img
        src={
          process.env.PUBLIC_URL +
          `/${isDarkMode ? "card-back-dark.png" : "card-back.png"}`
        }
        height="100%"
        width="100%"
      ></img>
    </div>
  );
}
