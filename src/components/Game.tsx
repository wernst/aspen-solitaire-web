import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Agent as AgentClient } from "@aspen.cloud/client";
import {
  Card as GameCard,
  Game as GameState,
  SUITS,
  BoardLocation,
} from "aspen-will-solitaire";
import DeckStack from "./DeckStack";
import FoundationStack from "./FoundationStack";
import PileStack from "./PileStack";
import styled from "styled-components";

const agent = new AgentClient("@will/solitaire");

const StyledGame = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 600px;
  min-height: 600px;
  background-color: ${(props) => props.theme.colors.table};
  padding: 30px;
  box-sizing: border-box;
`;

export default function Game() {
  const params = useParams();
  const [game, setGame] = useState<GameState>();

  const refreshGame = async () => {
    const resp = await agent.getView("game", { id: params.gameId });
    setGame({ ...resp });
  };
  useEffect(() => {
    refreshGame();
  }, []);

  const onCardDoubleClick = async (
    from: BoardLocation,
    fromIndex: number,
    card: GameCard
  ) => {
    await agent.runAction("moveCard", {
      gameId: params.gameId,
      from,
      fromIndex,
      to: `FOUNDATION_${card.suit}S`,
    });
    await refreshGame();
  };

  return (
    <StyledGame>
      {game ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <div>
              <DeckStack
                cards={game.deck}
                handleCardTurn={async () => {
                  if (!game) return;
                  const cards = game.deck;
                  await agent.runAction("turnCard", {
                    gameId: params.gameId,
                  });
                  await refreshGame();
                }}
                cardDoubleClickHandler={onCardDoubleClick}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              {SUITS.map((suit) => (
                <FoundationStack
                  key={suit}
                  suit={suit}
                  cards={game.foundations[suit]}
                  handleDrop={async (item, monitor) => {
                    await agent.runAction("moveCard", {
                      gameId: params.gameId,
                      // @ts-ignore
                      from: item.from,
                      fromIndex: item.fromIndex,
                      to: `FOUNDATION_${suit}S`,
                      toIndex: game.foundations[suit].length - 1,
                    });
                    await refreshGame();
                  }}
                  cardDoubleClickHandler={onCardDoubleClick}
                />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {game.piles.map((cards, i) => (
              <PileStack
                key={i}
                pileIndex={i}
                cards={cards}
                handleDrop={async (item, monitor) => {
                  await agent.runAction("moveCard", {
                    gameId: params.gameId,
                    from: item.from,
                    fromIndex: item.fromIndex,
                    to: `PILE${i}`,
                    toIndex: cards.length - 1,
                  });
                  await refreshGame();
                }}
                cardDoubleClickHandler={onCardDoubleClick}
              />
            ))}
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading Game
        </div>
      )}
    </StyledGame>
  );
}
