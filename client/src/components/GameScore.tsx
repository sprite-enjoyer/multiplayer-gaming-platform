import { Box, Typography } from "@mui/material"
import ScoreStore from "../stores/ScoreStore"
import { observer } from "mobx-react";

interface GameScoreProps {
  scoreStore: ScoreStore,
}

const GameScore = ({ scoreStore }: GameScoreProps) => {
  return (
    <Box
      sx={{
        width: "30%",
        height: "100px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "2%",
      }}
    >
      <Box>
        <Typography variant="h5">
          You: {scoreStore.playerScore}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5">
          Opponent: {scoreStore.opponentScore}
        </Typography>
      </Box>
    </Box>
  );
};

export default observer(GameScore);