import { useContext } from "react";
import GameStore from "../stores/GameStore";
import { GlobalStoreContext } from "../App";
import ScoreStore from "../stores/ScoreStore";

export interface MemoryGameProps {
  scoreStore: ScoreStore,
}

const MemoryGame = ({ scoreStore }: MemoryGameProps) => {
  const globalStore = useContext(GlobalStoreContext);
  const gameStore = new GameStore(globalStore);

  return (
    <div>
    </div>
  );
};

export default MemoryGame;