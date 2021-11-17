import { Agent as AgentClient } from "@aspen.cloud/client";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Game } from "aspen-will-solitaire";
import { AspenConfigContext } from "../contexts/AspenConfigContext";

const agent = new AgentClient("@will/solitaire");

export default function Home() {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    (async () => {
      const gamesResp = (await agent.getView("games", {})) as Game[];
      setGames(gamesResp);
    })();
  }, []);

  const startGame = useCallback(async () => {
    const gameId = await agent.runAction("startGame", {});
    navigate(`/games/${gameId}`);
  }, []);

  const [aspenConfig, setAspenConfigValue] = useContext(AspenConfigContext);

  return (
    <div>
      <h3>Welome to Solitaire</h3>
      <h4>Your Games</h4>
      <ul>
        {games.map((game) => (
          <li>
            <Link to={`/games/${game.id}`}>Game {game.id}</Link>
          </li>
        ))}
      </ul>
      <button onClick={async () => await startGame()}>Start a new game</button>
      <button
        onClick={() => {
          setAspenConfigValue(
            "DARK_MODE",
            aspenConfig.DARK_MODE === "true" ? "false " : "true"
          );
        }}
      >
        Toggle dark mode
      </button>
    </div>
  );
}
