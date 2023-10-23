import React, { useEffect, useState } from "react";
import ProcessBlock from "./ProcessBlock";
import { postProcessToAPI, fetchSingleProcessFromAPI } from "../../Service/apiService";

function AddProcess(props) {
  const [ isSubprocess, setSubprocessToggle ] = useState(false);
  const [ isRightParent, setRightParentToggle ] = useState(false);
  const [ showParentInfo, toggleShowParentInfo ] = useState(false);
  const [ departmentList ] = useState(props.departmentList);
  const [ departmentOption, setdepartmentOption ] = useState('');
  const [ parentId, setParentId ] = useState('');
  const [ error, setError ] = useState(null);
  const [ nameInputValue, setNameInputValue ] = useState('');
  const [ descriptionInputValue, setDescriptionInputValue ] = useState('');

  const [ process, setProcess ] = React.useState({
    id: 0,
    name: '',
    departmentId: null,
    description: '',
    parentProcessId: null
  });

  const [ parentProcess, setParentProcess ] = React.useState({
    id: null,
    name: '',
    departmentName: null,
    description: '',
    parentProcessId: null,
    subprocesses: []
  });

  let emptyProcess = {
    id: 0,
    name: '',
    departmentName: null,
    description: '',
    parentProcessId: null,
    subprocesses: []
  };

  useEffect(() => {
    console.log('Process after Test:', process);
  }, [process]);

  const verifyInputs = () => {
    if (nameInputValue === '' || departmentOption === '' || descriptionInputValue === '') {
      window.alert('At least one field is empty!');
    } else {
      assignProcessValues();
      setRightParentToggle(true);
    }
  }

 const assignProcessValues = () => {
  let newParentId = null;
  if(parentId != null){
    newParentId = parseInt(parentId);
  }
  setProcess({
    ...process,
    name: nameInputValue,
    departmentId: parseInt(departmentOption),
    description: descriptionInputValue,
    parentProcessId: newParentId
  });
 }

  const handleSubmit = async () => {
    assignProcessValues();
    verifyInputs();
    if(isRightParent){
      await postProcessToAPI(process);
      window.alert('Process Added!');
      clearComponentProperties();
    }
  }

  const clearComponentProperties = () => {
    setNameInputValue('');
    setDescriptionInputValue('');
    setdepartmentOption('');
    setProcess(emptyProcess);
    setParentProcess(emptyProcess);    
    setSubprocessToggle(false);
    toggleShowParentInfo(false);
    setRightParentToggle(false);
  }

  const handleIsSubprocess = () => {
    setSubprocessToggle(true);
  }

  const fetchParentInfo = async (parentId) => {
    try {
      const response = await fetchSingleProcessFromAPI(parentId);
      setParentProcess(response.data);
      toggleShowParentInfo(true)
    } catch (responseError) {
      window.alert('Id not found!');
      setError(responseError);
      console.error(error);
    }
  }

  const wrongParent = () => {
    setParentProcess(emptyProcess);
  }

  return (
    <div className="add-process-container">
      <h5> New Process</h5>
      <div className="label-and-input">
        <span>Name</span>
        <input 
          type="text"          
          name="name"
          placeholder="Process Name"
          value={nameInputValue}
          onChange={(e) => setNameInputValue(e.target.value)} 
        />
      </div>
      <div className="label-and-input">
        <span>Department</span>
        <select value={departmentOption} onChange={(e) => setdepartmentOption(e.target.value)}>
          <option value="">Select an option</option>
          {departmentList.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select> 
        <p>Selected department ID: {departmentOption}</p>
      </div>
      <div className="label-and-input">
        <span>Description</span>
        <input 
          type="text"           
          name="description" 
          placeholder="Process Description" 
          value={descriptionInputValue}
          onChange={(e) => setDescriptionInputValue(e.target.value)}  
        />
      </div>
      <span>Does this process belong to another process?</span>
      <button style={{ display: 'block' }} onClick={handleIsSubprocess}> Yes </button>
      {!(isSubprocess) ? <></> : 
        <>
          <input
            type="number"            
            className="id-to-search"
            placeholder="Type the Process Id"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          />
          <button onClick={() => fetchParentInfo(parentId)}> Search Process </button>
          {showParentInfo ? 
          <>
            <ProcessBlock process={parentProcess} />
            <span> Is this process the right parent? </span>
            <button onClick={verifyInputs}> Yes </button>
            <button onClick={() => wrongParent}> No </button>
          </>           
          : <></>}
        </>
      }
      <button style={{ display: 'block' }} onClick={verifyInputs}> No </button>
      {isRightParent ? <button style={{ display: 'block' }} onClick={handleSubmit}> Confirm and Add Process </button> : <></>}
    </div>
  )
}

export default AddProcess;