import { Card as GameCard, BoardLocation } from "aspen-will-solitaire";

export interface DragCard extends GameCard {
  from: BoardLocation;
  fromIndex: number;
}
