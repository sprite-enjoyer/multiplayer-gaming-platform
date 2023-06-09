import X from "../../assets/x.svg";
import O from "../../assets/o.svg";
import { useState } from "react";
import TicTacToeStore from "../../stores/TicTacToeStore";

interface CellProps {
  ticTacToeStore: TicTacToeStore,
  position: number,
};

const Cell = ({ ticTacToeStore, position }: CellProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleClick = () => {
    if (isClicked) return;
    ticTacToeStore.makeMove(position);
    setImageUrl(ticTacToeStore.player === "X" ? X : O);
    setIsClicked(true);
  }

  return (
    <div
      style={{
        all: "unset",
        flex: "1 1",
        outline: "2px solid black",
        borderRadius: "2px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={handleClick}
    >
      {
        isClicked &&
        <img
          src={imageUrl}
          style={{
            width: "90%",
            aspectRatio: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      }
    </div>
  );
};

export default Cell;