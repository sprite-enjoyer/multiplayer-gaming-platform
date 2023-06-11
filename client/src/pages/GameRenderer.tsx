import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react";
import ScoreStore from "../stores/ScoreStore";
import { useContext } from "react";
import { GlobalStoreContext } from "../App";
import GameScore from "../components/GameScore";

export interface GameRendererProps {
  GameElement: (props: any) => JSX.Element,
}

const GameRenderer = ({ GameElement }: GameRendererProps) => {
  const globalStore = useContext(GlobalStoreContext);
  const scoreStore = new ScoreStore();

  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: "0",
        left: "0",
        margin: "0",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          height: "70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Typography variant="h4">{globalStore.currentGame}</Typography>
      </Box>
      <Box
        sx={{
          width: "30%",
          aspectRatio: "1",
          marginTop: "150px",
        }}
      >
        <GameElement scoreStore={scoreStore} />
      </Box>
      <GameScore scoreStore={scoreStore} />
    </Box>
  );
};

export default observer(GameRenderer);