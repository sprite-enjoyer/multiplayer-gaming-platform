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
    if (globalStore?.hasPlayerJoinedGame) {
      navigate(`/${globalStore.currentGame}`);
      return;
    }

    navigate(globalStore?.isPlayerPresent ? "/gamesList" : "/");

  }, [globalStore?.hasPlayerJoinedGame, globalStore?.isPlayerPresent]);

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        margin: "0",
        padding: "0",
      }}
    >
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/gamesList" element={<GamesList />} />
        <Route path="/TicTacToe" element={<GameRenderer GameElement={TicTacToe} />} />
        <Route path="/MemoryGame" element={<GameRenderer GameElement={MemoryGame} />} />
      </Routes>
    </div>
  )
};

export default observer(RoutesManager);