import { createContext } from "react";
import StartPage from "./pages/StartPage";
import GlobalStore from "./stores/GlobalStore";
import GamesList from "./pages/GamesList";
import { observer } from "mobx-react";

const globalStore = new GlobalStore();
export const GlobalStoreContext = createContext(globalStore);

const App = () => {

  return (
    <div style={{
      position: "absolute",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      margin: "0",
      padding: "0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Press Start 2P', cursive !important"
    }}
    >
      <GlobalStoreContext.Provider value={globalStore}>
        {globalStore.playerName ? <GamesList /> : <StartPage />}
      </GlobalStoreContext.Provider>
    </div>
  );
};

export default observer(App);