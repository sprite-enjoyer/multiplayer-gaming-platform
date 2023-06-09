import { Box, Container } from "@mui/material";
import GameCard from "../components/GameCard";
import RoomChoosingDialog from "../components/RoomChoosingDialog";
import GamesListStore from "../stores/GamesListStore";
import { observer } from "mobx-react";
import { Game } from "../misc/types";
import { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../App";
import { useNavigate } from "react-router-dom";

const gamesListStore = new GamesListStore();

const GamesList = () => {
  const globalStore = useContext(GlobalStoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!globalStore?.isPlayerPresent) navigate("/");
  }, []);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            position: "absolute",
            top: "15%",
            gap: "30px",
          }}
        >
          <GameCard
            game={Game.TicTacToe}
            imageUrl={"https://store-images.s-microsoft.com/image/apps.2005.14057826194083709.67242c47-4fd7-4f1a-9dd6-5d93f6cc10df.f80f14c0-72ab-46ff-86cd-9d801c8e04e8?mode=scale&q=90&h=300&w=300"}
            gamesListStore={gamesListStore}
          >
            Tic Tac Toe
          </GameCard>
          <GameCard
            game={Game.MemoryGame}
            imageUrl={"https://www.patticrafts.co.uk/wp-content/uploads/2022/06/K485.jpg"}
            gamesListStore={gamesListStore}
          >
            Memory Game
          </GameCard>
        </Container>
      </Box>
      <RoomChoosingDialog
        gamesListStore={gamesListStore}
      />
    </>
  );
};

export default observer(GamesList);