import { Card as GameCard, BoardLocation } from "aspen-will-solitaire";
import { useDrag } from "react-dnd";
import { DragCard } from "../../types";
import { Card } from "./Card";

export default function DraggableCard({
  card,
  location,
  locationIndex,
  doubleClickHandler,
}: {
  card: GameCard;
  location: BoardLocation;
  locationIndex: number;
  doubleClickHandler: () => Promise<void>;
}) {
  const [collected, drag] = useDrag(
    () => ({
      type: "CARD",
      item: { ...card, from: location, fromIndex: locationIndex } as DragCard,
    }),
    [card, location]
  );
  return (
    <div
      ref={drag}
      {...collected}
      onDoubleClick={async () => await doubleClickHandler()}
    >
      <Card card={card} />
    </div>
  );
}
