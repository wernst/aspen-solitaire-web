import { CARD_HEIGHT, CARD_WIDTH } from "../style-constants";

export default function CardBack() {
  return (
    <div
      style={{
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
      }}
    >
      <img
        src={process.env.PUBLIC_URL + "/card-back.png"}
        height="100%"
        width="100%"
      ></img>
    </div>
  );
}
