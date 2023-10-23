import React, { useEffect } from "react";
import { usePhaseContext } from "../contexts/PhaseContext";

function MainButton() {
  const { phase, changePhase } = usePhaseContext();

  useEffect(() => {}, [phase]);

  const returnToMainMenu = () => {
    changePhase('menu');
  }

  return (
    <>
      {phase === 'menu' ? <></> :
        <div className="button-conatiner">
          <button onClick={returnToMainMenu}> Return To Main Menu </button>
        </div>
      }
    </>
  );
}

export default MainButton;
