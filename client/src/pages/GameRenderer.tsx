import { Container } from "@mui/material";
import { observer } from "mobx-react";

export interface GameRendererProps {
  GameElement: () => JSX.Element,
}

const GameRenderer = ({ GameElement }: GameRendererProps) => {

  return (
    <Container
      sx={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: "0",
        left: "0",
        margin: "0",
        padding: "0",
      }}
    >
      <GameElement />
    </Container>
  );
};

export default observer(GameRenderer);