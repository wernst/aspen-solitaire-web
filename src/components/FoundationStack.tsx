import {
  Card as GameCard,
  BoardLocation,
  Suit,
} from "@aspen-agents/will-solitaire";
import { DragCard } from "../../types";
import { useDrop } from "react-dnd";
import DraggableCard from "./DraggableCard";
import { isBlack, suitFoundationMap } from "../game-helpers";
import CardPlaceholder from "./CardPlaceholder";
import { SuitDisplays } from "../style-constants";

export default function FoundationStack({
  cards,
  suit,
  handleDrop,
  cardDoubleClickHandler,
}: {
  cards: GameCard[];
  suit: Suit;
  handleDrop: (item: DragCard, monitor: any) => Promise<void>;
  cardDoubleClickHandler: (
    from: BoardLocation,
    fromIndex: number,
    card: GameCard
  ) => Promise<void>;
}) {
  const [_collectedProps, drop] = useDrop<DragCard, any, any>(
    () => ({
      accept: "CARD",
      drop: async (item, monitor) => {
        await handleDrop(item, monitor);
      },
    }),
    [handleDrop]
  );
  return (
    <div ref={drop}>
      {cards.length ? (
        <DraggableCard
          card={cards[cards.length - 1]}
          location={suitFoundationMap[suit]}
          locationIndex={cards.length - 1}
          doubleClickHandler={async () =>
            await cardDoubleClickHandler(
              suitFoundationMap[suit],
              cards.length - 1,
              cards[cards.length - 1]
            )
          }
        />
      ) : (
        <CardPlaceholder
          message={SuitDisplays[`${suit}S`]}
          style={{ color: isBlack(suit) ? "black" : "red" }}
        />
      )}
    </div>
  );
}
