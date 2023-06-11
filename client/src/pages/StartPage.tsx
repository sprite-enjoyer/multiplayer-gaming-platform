import { Button, Container, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { GlobalStoreContext } from "../App";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const [inputValue, setInputValue] = useState("");
  const globalStore = useContext(GlobalStoreContext);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (inputValue.length === 0) return;
    globalStore?.setPlayerName(inputValue);
    navigate("/gamesList");
  };

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
          autoFocus
          fullWidth
          label="Player Name"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          fullWidth
          size={"large"}
          variant={"contained"}
          onClick={handleButtonClick}
        >
          Start
        </Button>
      </Container>
    </div>
  );
};

export default observer(StartPage);