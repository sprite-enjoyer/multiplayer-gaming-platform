import { createContext, useMemo } from "react";
import GlobalStore from "./stores/GlobalStore";
import { observer } from "mobx-react";
import RoutesManager from "./components/RoutesManager";
import { BrowserRouter } from "react-router-dom";

export const GlobalStoreContext = createContext<GlobalStore | undefined>(undefined);

const App = () => {
  const globalStore = new GlobalStore();
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
        <BrowserRouter>
          <RoutesManager />
        </BrowserRouter>
      </GlobalStoreContext.Provider>
    </div>
  );
};

export default observer(App);