import { action, makeObservable, observable } from "mobx";
import { Game } from "../misc/types";

class GamesListStore {

  dialogOpen = false;

  forWhichGameDialogIsOpen?: Game;

  constructor() {
    makeObservable(this, {
      dialogOpen: observable,
      forWhichGameDialogIsOpen: observable,
      setDialogOpen: action,
      setForWhichGameDialogIsOpen: action,
    });
  }

  setDialogOpen(newValue: boolean) {
    this.dialogOpen = newValue;
  }

  setForWhichGameDialogIsOpen(newValue?: Game) {
    this.forWhichGameDialogIsOpen = newValue;
  }
}

export default GamesListStore;