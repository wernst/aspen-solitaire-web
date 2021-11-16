import { Card as GameCard, Deck, BoardLocation } from "aspen-will-solitaire";
import CardBack from "./CardBack";
import CardPlaceholder from "./CardPlaceholder";
import DraggableCard from "./DraggableCard";

export default function DeckStack({
  cards,
  handleCardTurn,
  cardDoubleClickHandler,
}: {
  cards: Deck;
  handleCardTurn: () => Promise<void>;
  cardDoubleClickHandler: (
    from: BoardLocation,
    fromIndex: number,
    card: GameCard
  ) => Promise<void>;
}) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div
        onClick={async () => {
          await handleCardTurn();
        }}
      >
        {cards.unturned.length ? <CardBack /> : <CardPlaceholder />}
      </div>
      {cards.turned.length ? (
        <DraggableCard
          card={cards.turned[cards.turned.length - 1]}
          location="DECK_TURNED"
          locationIndex={cards.turned.length - 1}
          doubleClickHandler={async () =>
            await cardDoubleClickHandler(
              "DECK_TURNED",
              cards.turned.length - 1,
              cards.turned[cards.turned.length - 1]
            )
          }
        />
      ) : (
        <></>
      )}
    </div>
  );
}
