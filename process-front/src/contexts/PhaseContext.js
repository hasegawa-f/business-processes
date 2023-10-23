import React, { createContext, useContext, useState } from 'react';

const PhaseContext = createContext();

export const usePhaseContext = () => {
  return useContext(PhaseContext);
};

export const PhaseProvider = ({ children }) => {
  const [phase, setPhase] = useState('menu');

  const changePhase = (newPhase) => {
    setPhase(newPhase);
  }

  return (
    <PhaseContext.Provider value={{  phase, changePhase }}>
      {children}
    </PhaseContext.Provider>
  );
};