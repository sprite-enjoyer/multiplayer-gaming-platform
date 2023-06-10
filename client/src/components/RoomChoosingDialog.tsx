import { Box, Button, Container, Dialog, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { GlobalStoreContext } from "../App";
import GamesListStore from "../stores/GamesListStore";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

interface RoomChoosingDialogProps {
  gamesListStore: GamesListStore
}

const RoomChoosingDialog = ({ gamesListStore }: RoomChoosingDialogProps) => {
  const [inputValue, setInputValue] = useState("");
  const globalStore = useContext(GlobalStoreContext);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (inputValue === "") return;
    globalStore.setRoomID(inputValue);
    globalStore.setCurrentGame(gamesListStore.forWhichGameDialogIsOpen);
    gamesListStore.setDialogOpen(false);
    gamesListStore.setForWhichGameDialogIsOpen(undefined);
    navigate(`/${globalStore?.currentGame}`);
  };

  return (
    <Dialog
      open={gamesListStore.dialogOpen}
      onClose={() => gamesListStore.setDialogOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Container
          sx={{
            height: "40vh",
            aspectRatio: "1.5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "5%",
          }}
        >
          <TextField
            autoFocus
            onChange={(e) => setInputValue(e.target.value)}
            label="Room ID"
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleButtonClick}
          >
            Join Room
          </Button>
        </Container>
      </Box>
    </Dialog>
  );
};

export default observer(RoomChoosingDialog);