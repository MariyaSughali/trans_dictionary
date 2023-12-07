import React, { createContext, useState } from "react";

export const ClickContext = createContext();

export const ClickProvider = ({ children }) => {
  const [isclicked, setIsclicked] = useState(false);

  const handleDictionary = (newValue) => {
    console.log(newValue);
    setIsclicked(newValue);
  };

  return (
    <ClickContext.Provider value={{ isclicked, handleDictionary }}>
      {children}
    </ClickContext.Provider>
  );
};
