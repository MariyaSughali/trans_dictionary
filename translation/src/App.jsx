import { useState } from "react";

import "./App.css";
import Topbar from "./Components/Topbar";
import Main from "./Components/Main";
import { ClickProvider } from "./Components/ClickContext";

function App() {
  return (
    <div className="content">
      <ClickProvider>
        <Topbar />
        <Main />
      </ClickProvider>
    </div>
  );
}

export default App;
