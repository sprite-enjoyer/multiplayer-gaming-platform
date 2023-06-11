import { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../App";
import ScoreStore from "../stores/ScoreStore";
import TicTacToeStore from "../stores/TicTacToeStore";
import { Box } from "@mui/material";
import CellList from "../components/TicTacToe/CellList";

interface TicTacToeProps {
  scoreStore: ScoreStore
}

const TicTacToe = ({ scoreStore }: TicTacToeProps) => {
  const globalStore = useContext(GlobalStoreContext);
  const ticTacToeStore = new TicTacToeStore(scoreStore, globalStore);

  useEffect(() => {
    ticTacToeStore.joinRoom();
    ticTacToeStore.receiveMessage();

    return () => {
      ticTacToeStore.socket.disconnect();
    };
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr",
        width: "100%",
        height: "100%",
        gap: "5px",
      }}
    >
      <CellList ticTacToeStore={ticTacToeStore} />
    </Box>
  );
};

export default TicTacToe;