import React, { useState, useEffect } from "react";
import OptionsMenu from "./OptionsMenu";
import ProcessList from "./process/ProcessList";
import ProcessOperation from "./process/ProcessOperations";
import AddProcess from "./process/AddProcess";
import IndividualDepartment from "./department/IndividualDepartment";
import DepartmentList from "./department/DepartmentList";
import AddDepartment from "./department/AddDepartment";
import UpdateDepartment from "./department/UpdateDepartment";
import DeleteDepartment from "./department/DeleteDepartment";
import MainButton from "./MainButton";
import { fetchProcessDataFromAPI, fetchDepartmentDataFromAPI } from '../Service/apiService';
import { usePhaseContext } from "../contexts/PhaseContext";

function MainContainer() {
  const [ processData, setProcessData ] = useState([]);
  const [ departmentData, setDepartmentData ] = useState([]);
  const [ error, setError ] = useState(null);
  const { phase, changePhase } = usePhaseContext();

  useEffect(() => {
    updateData();
    // eslint-disable-next-line
  }, [phase] );

  const updateData = async () => {
    try {
      const processResponse = await fetchProcessDataFromAPI();
      setProcessData(processResponse);
      const departmentResponse = await fetchDepartmentDataFromAPI();
      setDepartmentData(departmentResponse);
    } catch (responseError) {
      setError(responseError);
      console.error(error);
    }
  }

  const returnToMainMenu = () => {
    changePhase('menu');
  }

  let componentToRender;

  switch (phase) {
    case 'menu':
      componentToRender = <OptionsMenu />
    break;

    case 'listProcess':
      componentToRender = <ProcessList data={processData}/>;
    break;

    case 'showProcess':
      componentToRender = <ProcessOperation type={'read'} />;
    break;

    case 'addProcess':
      componentToRender = <AddProcess departmentList={departmentData} />;
    break;

    case 'updateProcess':
      componentToRender = <ProcessOperation type={'update'} departmentList={departmentData} />;
    break;

    case 'deleteProcess':
      componentToRender = <ProcessOperation type={'delete'} />
    break;

    case 'listDepartment':
      componentToRender = <DepartmentList data={departmentData}/>;
    break;

    case 'showDepartment':
      componentToRender = <IndividualDepartment />;
    break;

    case 'addDepartment':
      componentToRender = <AddDepartment />;

    break;

    case 'updateDepartment':
      componentToRender = <UpdateDepartment />;
    break;

    case 'deleteDepartment':
      componentToRender = <DeleteDepartment />
    break;

    default:
    break;
  }

  return (
    <>
    {(phase === 'menu') ? <></> : 
          <button className="return-button" onClick={returnToMainMenu}> Return to Main Menu </button>}
      <div className="main-container">
        {componentToRender}
        {(phase === 'start') ? <></> : (
          <MainButton changePhase={changePhase} />
        )}
      </div>
    </>
  );
}

export default MainContainer;