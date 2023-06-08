import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import GlobalStore from "../stores/GlobalStore";

interface StartPageProps {
  globalStore: GlobalStore,
}

const StartPage = ({ globalStore }: StartPageProps) => {

  const [inputValue, setInputValue] = useState("");

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        margin: "0",
        padding: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "30px"
      }}
    >
      <Container
        sx={{
          width: "400px",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "30px",
          paddingBottom: "150px",
        }}
      >
        <TextField
          fullWidth
          label="Player Name"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          fullWidth
          size={"large"}
          variant={"contained"}
          onClick={() => inputValue.length !== 0 && globalStore.setPlayerName(inputValue)}
        >
          Start
        </Button>
      </Container>
    </div>
  );
};

export default StartPage;