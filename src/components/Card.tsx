import { Card as GameCard } from "@aspen-agents/will-solitaire";
import {
  CardsLayouts,
  CARD_BORDER_RADIUS,
  CARD_HEIGHT,
  CARD_WIDTH,
  SuitDisplays,
} from "../style-constants";
import { isBlack } from "../game-helpers";

const SuitAndRank = ({
  suit,
  rank,
  position,
}: {
  suit: string;
  rank: string;
  position: any;
}) => {
  return (
    <div
      style={{
        ...position,
        display: "inline-block",
        position: "absolute",
        textAlign: "center",
        transform: "bottom" in position ? "rotate(180deg)" : null,
      }}
    >
      <div>{rank}</div>
      <div style={{ position: "relative", top: -5 }}>{SuitDisplays[suit]}</div>
    </div>
  );
};

const RankSymbol = ({ symbol, style = {} }: { symbol: any; style?: any }) => {
  return (
    <div
      style={{
        ...style,
        fontSize: 40,
        paddingTop: 57,
        margin: "auto",
        lineHeight: "55px",
        width: 50,
        height: 53,
        textAlign: "center",
      }}
    >
      {symbol}
    </div>
  );
};

const SuitSymbol = ({ suit, style = {} }: { suit: string; style?: any }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: 50,
        fontSize: 40,
        textAlign: "center",
        ...style,
      }}
    >
      {SuitDisplays[suit]}
    </div>
  );
};

export function Card({ card }: { card: GameCard }) {
  let suitSymbols;
  let rankSymbol;
  if (Array.isArray(CardsLayouts[card.display])) {
    suitSymbols = CardsLayouts[card.display].map((style: any, i: number) => (
      <SuitSymbol style={style} suit={`${card.suit}S`} key={i} />
    ));
  } else rankSymbol = <RankSymbol symbol={CardsLayouts[card.display]} />;

  return (
    <div
      style={{
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        borderRadius: CARD_BORDER_RADIUS,
        backgroundColor: "white",
        color: isBlack(card.suit) ? "black" : "red",
        position: "relative",
      }}
    >
      <SuitAndRank
        suit={`${card.suit}S`}
        rank={card.display}
        position={{ top: 4, left: 5 }}
      />
      <SuitAndRank
        suit={`${card.suit}S`}
        rank={card.display}
        position={{ bottom: 4, right: 5 }}
      />
      {suitSymbols}
      {rankSymbol}
    </div>
  );
}
