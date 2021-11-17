import { Card as GameCard } from "aspen-will-solitaire";
import {
  CardsLayouts,
  CARD_BORDER_RADIUS,
  CARD_HEIGHT,
  CARD_WIDTH,
  SuitDisplays,
} from "../style-constants";
import { isBlack } from "../game-helpers";
import styled from "styled-components";

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

const StyledCard = styled.div<{ cardBlack: boolean }>`
  height: ${CARD_HEIGHT};
  width: ${CARD_WIDTH};
  border-radius: ${CARD_BORDER_RADIUS};
  background-color: ${(props) => props.theme.colors.card};
  color: ${(props) =>
    props.cardBlack
      ? props.theme.colors.blackSuit
      : props.theme.colors.redSuit};
  position: relative;
`;

export function Card({ card }: { card: GameCard }) {
  let suitSymbols;
  let rankSymbol;
  if (Array.isArray(CardsLayouts[card.display])) {
    suitSymbols = CardsLayouts[card.display].map((style: any, i: number) => (
      <SuitSymbol style={style} suit={`${card.suit}S`} key={i} />
    ));
  } else rankSymbol = <RankSymbol symbol={CardsLayouts[card.display]} />;

  return (
    <StyledCard cardBlack={isBlack(card.suit)}>
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
    </StyledCard>
  );
}
