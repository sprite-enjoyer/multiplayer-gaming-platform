import { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../App";
import { observer } from "mobx-react";
import ScoreStore from "../stores/ScoreStore";
import TicTacToeStore from "../stores/TicTacToeStore";
import { Box } from "@mui/material";
import Cell from "../components/TicTacToe/Cell";

interface TicTacToeProps {
  scoreStore: ScoreStore
}

const TicTacToe = ({ scoreStore }: TicTacToeProps) => {
  const globalStore = useContext(GlobalStoreContext);
  const ticTacToeStore = new TicTacToeStore(scoreStore, globalStore);

  useEffect(() => {
    ticTacToeStore.joinRoom();
    ticTacToeStore.receiveMessage();
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
      {
        ticTacToeStore.gameBoard.map((_, i) =>
          <Cell
            key={i}
            ticTacToeStore={ticTacToeStore}
            position={i}
          />
        )
      }
    </Box>
  );
};

export default observer(TicTacToe);