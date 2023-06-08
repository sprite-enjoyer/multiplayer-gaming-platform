import { Box, Button, Container } from "@mui/material";

interface GameCardProps {
  imageUrl: string,
  name: string,
  onClick: () => void,
}

const GameCard = ({ imageUrl, name, onClick }: GameCardProps) => {

  return (
    <Button
      onClick={onClick}
      sx={{
        color: "rgba(2, 232, 18, 1)",
        fontWeight: "600",
        fontSize: "1.2em",
        height: "300px",
        maxWidth: "300px",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          padding: "5px",
          backgroundColor: "rgba(195, 52, 235, 0.7)",
        }}
      >
        <Container
          sx={{
            flex: "5 5",
            margin: "0",
            paddingTop: "10px",
          }}
        >
          <img
            src={imageUrl}
            style={{
              width: "100%",
              borderRadius: "10px",
            }}
          />
        </Container>
        <Container
          sx={{
            flex: "1 1",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            width: "100%",
            fontSize: "1.3em",
            margin: "0",
          }}
        >
          {name}
        </Container>

      </Box>
    </Button>
  );
};

export default GameCard;