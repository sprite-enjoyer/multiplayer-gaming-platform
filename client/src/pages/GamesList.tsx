import { Box, Container } from "@mui/material";
import GameCard from "../components/GameCard";

const GamesList = () => {
  return (
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
          onClick={() => console.log("clicked!")}
          imageUrl={"https://store-images.s-microsoft.com/image/apps.2005.14057826194083709.67242c47-4fd7-4f1a-9dd6-5d93f6cc10df.f80f14c0-72ab-46ff-86cd-9d801c8e04e8?mode=scale&q=90&h=300&w=300"}
          name={"Tic Tac Toe"}
        />
        <GameCard
          onClick={() => console.log("clicked!")}
          imageUrl={"https://www.patticrafts.co.uk/wp-content/uploads/2022/06/K485.jpg"}
          name={"Memory Game"}
        />
      </Container>
    </Box>

  );
};

export default GamesList;