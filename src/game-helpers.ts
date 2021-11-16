import {
  Suit,
  BoardLocation,
  RED_SUITS,
  BLACK_SUITS,
} from "aspen-will-solitaire";

export const isRed = (suit: Suit) =>
  !!RED_SUITS.find((redSuit) => redSuit === suit);
export const isBlack = (suit: Suit) =>
  !!BLACK_SUITS.find((blackSuit) => blackSuit === suit);

export const suitFoundationMap: Record<Suit, BoardLocation> = {
  CLUB: "FOUNDATION_CLUBS",
  DIAMOND: "FOUNDATION_DIAMONDS",
  HEART: "FOUNDATION_HEARTS",
  SPADE: "FOUNDATION_SPADES",
};
