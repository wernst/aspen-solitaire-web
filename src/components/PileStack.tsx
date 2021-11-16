import {
  Card as GameCard,
  BoardLocation,
  PILE_LOCATIONS,
} from "aspen-will-solitaire";
import { DragCard } from "../../types";
import { useDrop } from "react-dnd";
import DraggableCard from "./DraggableCard";
import CardPlaceholder from "./CardPlaceholder";
import CardBack from "./CardBack";

export default function PileStack({
  cards,
  pileIndex,
  handleDrop,
  cardDoubleClickHandler,
}: {
  cards: GameCard[];
  pileIndex: number;
  handleDrop: (item: DragCard, monitor: any) => Promise<void>;
  cardDoubleClickHandler: (
    from: BoardLocation,
    fromIndex: number,
    card: GameCard
  ) => Promise<void>;
}) {
  const [collectedProps, drop] = useDrop<DragCard, any, any>(
    () => ({
      accept: "CARD",
      drop: async (item, monitor) => {
        await handleDrop(item, monitor);
      },
      canDrop: (item, monitor) => {
        return true;
      },
    }),
    [handleDrop]
  );

  return (
    <div style={{ position: "relative" }} ref={drop}>
      {cards.length ? (
        cards.map((card, i) => {
          return (
            <div
              key={i}
              style={
                i !== 0 ? { position: "absolute", top: `${30 * i}px` } : {}
              }
            >
              {card.upturned ? (
                <DraggableCard
                  card={card}
                  location={PILE_LOCATIONS[pileIndex]}
                  locationIndex={i}
                  doubleClickHandler={async () =>
                    await cardDoubleClickHandler(
                      PILE_LOCATIONS[pileIndex],
                      i,
                      card
                    )
                  }
                />
              ) : (
                <CardBack />
              )}
            </div>
          );
        })
      ) : (
        <CardPlaceholder />
      )}
    </div>
  );
}
