import { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../App";
import GameRenderer from "../pages/GameRenderer";
import GamesList from "../pages/GamesList";
import StartPage from "../pages/StartPage";
import { observer } from "mobx-react";
import { Route, Routes, useNavigate } from "react-router-dom";
import TicTacToe from "../games/TicTacToe";
import MemoryGame from "../games/MemoryGame";

const RoutesManager = () => {
  const globalStore = useContext(GlobalStoreContext);
  const navigate = useNavigate();

  useEffect(() => {

    if (globalStore?.hasPlayerJoinedGame) navigate("/game");
    navigate(globalStore?.isPlayerPresent ? "/gamesList" : "/");

  }, [globalStore?.hasPlayerJoinedGame, globalStore?.isPlayerPresent]);

  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/gamesList" element={<GamesList />} />
      <Route path="/TicTacToe" element={<GameRenderer GameElement={TicTacToe} />} />
      <Route path="/MemoryGame" element={<GameRenderer GameElement={MemoryGame} />} />
    </Routes>
  )
};

export default observer(RoutesManager);