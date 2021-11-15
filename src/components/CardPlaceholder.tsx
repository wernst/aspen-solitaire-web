import {
  CARD_BORDER_RADIUS,
  CARD_HEIGHT,
  CARD_WIDTH,
} from "../style-constants";

export default function CardPlaceholder({
  message,
  style = {},
}: {
  message?: string;
  style?: any;
}) {
  return (
    <div
      style={{
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        borderRadius: CARD_BORDER_RADIUS,
        border: "black solid 3px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ ...style }}>{message}</div>
    </div>
  );
}
