import X from "../../assets/x.svg";
import O from "../../assets/o.svg";
import { useMemo, useState } from "react";
import TicTacToeStore from "../../stores/TicTacToeStore";
import { Player } from "../../misc/types";
import { observer } from "mobx-react";

interface CellProps {
  ticTacToeStore: TicTacToeStore,
  position: number,
  mark?: Player,
};

const Cell = ({ ticTacToeStore, position, mark }: CellProps) => {
  const imageUrl = useMemo(() => {
    if (!mark) return "";
    return mark === "X" ? X : O;
  }, [mark])

  const handleClick = () => {
    if (mark || ticTacToeStore.frozen) {
      console.log("the cell is clicked or frozen");
      return;
    }

    ticTacToeStore.makeMove(position);
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
        mark &&
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

export default observer(Cell);