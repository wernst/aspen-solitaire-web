import { Card as GameCard, BoardLocation } from "@aspen-agents/will-solitaire";

export interface DragCard extends GameCard {
  from: BoardLocation;
  fromIndex: number;
}
