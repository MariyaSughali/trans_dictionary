import React, { useContext } from "react";
import logo from "../assets/applogo.png";
import { ClickContext } from "./ClickContext";

function Topbar() {
  const { isclicked, handleDictionary } = useContext(ClickContext);

  return (
    <div className="topbar">
      <div className="logo">
        <img className="logophoto" src={logo} alt="img"></img>
      </div>
      <div className="search"></div>
      <div className="notification">
        <div className="dictionaryIcon">
          <span className="material-symbols-outlined icon1">dictionary</span>
          <span
            className="text"
            onClick={() => {
              handleDictionary(true);
            }}
          >
            Dictionary
          </span>
        </div>
        <span className="text">Ongoing Projects</span>
      </div>
    </div>
  );
}

export default Topbar;
