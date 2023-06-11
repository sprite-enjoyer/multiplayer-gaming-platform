import { observer } from "mobx-react";
import TicTacToeStore from "../../stores/TicTacToeStore"
import Cell from "./Cell";

interface CellListProps {
  ticTacToeStore: TicTacToeStore
}

const CellList = ({ ticTacToeStore }: CellListProps) => {
  return (
    <>
      {ticTacToeStore.gameBoard.map((item, i) =>
        <Cell
          key={i}
          mark={item}
          ticTacToeStore={ticTacToeStore}
          position={i}
        />
      )}
    </>
  );
};

export default observer(CellList);