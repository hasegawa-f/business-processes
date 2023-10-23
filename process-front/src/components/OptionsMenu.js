import React from 'react';
import { usePhaseContext } from '../contexts/PhaseContext';

function OptionsMenu() {
  const { changePhase } = usePhaseContext();

  const renderProcess = (option) => {
    switch (option) {
      case 1:
        console.log("Option 1");
        changePhase('addProcess');
        break;
      case 2:
        changePhase('listProcess');
        break;
      case 3:
        changePhase('showProcess');
        break;
      case 4:
        changePhase('updateProcess');
        break;
      case 5:
        changePhase('deleteProcess');
        break;
      case 6:
        changePhase('addDepartment');
        break;
      case 7:
        changePhase('listDepartment');
        break;
      case 8:
        changePhase('showDepartment');
        break;
      case 9:
        changePhase('updateDepartment');
        break;
      case 10:
        changePhase('deleteDepartment');
        break;
      default:
        console.log("No option");
        break;
    }
  }

  return (
    <div className="menu">
      <p>Choose an option:</p>
      <ol>
        <li onClick={() => renderProcess(1)}> Add Process </li>
        <li onClick={() => renderProcess(2)}> List Processes </li>
        <li onClick={() => renderProcess(3)}> View Process By ID </li>
        <li onClick={() => renderProcess(4)}> Update Process </li>
        <li onClick={() => renderProcess(5)}> Delete Process </li>
        <li onClick={() => renderProcess(6)}> Add Department </li>
        <li onClick={() => renderProcess(7)}> List Department </li>
        <li onClick={() => renderProcess(8)}> View Department by ID </li>
        <li onClick={() => renderProcess(9)}> Update Department </li>
        <li onClick={() => renderProcess(10)}> Delete Department </li>
      </ol>
    </div>
  );
};

export default OptionsMenu;