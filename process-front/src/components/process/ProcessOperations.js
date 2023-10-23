import React, { useState, useRef, useEffect } from "react";
import ProcessBlock from "./ProcessBlock";
import { fetchSingleProcessFromAPI, updateProcessToAPI, deleteProcessFromAPI } from "../../Service/apiService";

function ProcessOperation({ type, departmentList }) {
  const [ showProcess, toggleProcess ] = useState(false);
  const [ isRightProcess, toggleRightProcess ] = useState(false);
  const [ processId, setProcessId ] = useState(null);
  const [ error, setError ] = useState(null);
  const inputRef = useRef(null);
  const [ departmentOption, setdepartmentOption ] = useState('');
  const [ nameInputValue, setNameInputValue ] = useState('');
  const [ descriptionInputValue, setDescriptionInputValue ] = useState('');
  const [ process, setProcess ] = React.useState({
    id: null,
    name: '',
    departmentName: null,
    description: '',
    parentProcessId: null,
    subprocesses: []
  });
  const [ updateProcess, setUpdateProcess ] = React.useState({
    id: null,
    name: '',
    departmentId: null,
    description: '',
    parentProcessId: null
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    console.log('Process after:', process);
    // eslint-disable-next-line
  }, [updateProcess]);

  const fetchProcess = async (id) => {
    try {
      const response = await fetchSingleProcessFromAPI(id);
      setProcess(response.data);
      toggleProcess(true);
    } catch (responseError) {
      window.alert('Id not found!');
      setProcessId(null);
      setError(responseError);
    }
  };

  const handleIdInput = (event) => {
    const { value } = event.target;
    setProcessId(value);
    console.log(processId);
  };

  const assignUpdateProcessValues = () => {
    let newDepartment = null;
    if(departmentOption === ''){
      newDepartment = updateProcess.departmentId;
    }
    setUpdateProcess({
      id: parseInt(process.id),
      name: nameInputValue,
      departmentId: newDepartment,
      description: descriptionInputValue,
      parentProcessId: process.parentProcessId
    });
   }

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setProcess({
      ...process,
      [name]: value
    });
  };

  const newSearch = () => {
    setProcess({
      id: null,
      name: '',
      departmentName: null,
      description: '',
      parentProcessId: null,
      subprocesses: []
    });
    inputRef.current.value = '';
    inputRef.current.focus();
    setNameInputValue('');
    setDescriptionInputValue('');
    setdepartmentOption('');
    setProcessId(null);
    toggleProcess(false);
    toggleRightProcess(false);
  };

  const handleOperation = async () => {
    switch (type) {
      case 'update':
        if (isRightProcess) {
          try{
            assignUpdateProcessValues();
            await updateProcessToAPI(parseInt(processId), updateProcess);
            window.alert('Process updated');
            toggleProcess(false);
            toggleRightProcess(false);
            newSearch();
          } catch (responseError) {
            window.alert('Something went wrong! Canceling...');
            setError(responseError);
            console.error(error);
            newSearch();
          }
        } else {
          window.alert('Please confirm the process details before updating.');
        }
      break;
      case 'delete':
        try {
          await deleteProcessFromAPI(processId);
          window.alert('Process Deleted!');
          newSearch();
        } catch (responseError) {
          window.alert('Something went wrong! Canceling...');
          setError(responseError);
          console.error(error);
          newSearch();
        }
      break;
      default:
      break;
    }
  };

  return (
    <div className="process-main-container">
      <input
        type="number"
        ref={inputRef}
        className="id-to-search"
        placeholder="Type the Process Id"
        onChange={handleIdInput}
      />
      <button onClick={() => fetchProcess(processId)}> Search Process </button>
      <button style={{ display: 'inline' }} onClick={newSearch}> Clear </button>
      {showProcess ?
        <>
          <ProcessBlock process={process} />
          {type === 'update' || type === 'delete' ?
            <button onClick={() => toggleRightProcess(true)}>
              Confirm Process
            </button>
          : <></> }
          <button style={{ display: 'inline' }} onClick={newSearch}> Cancel </button>
          {isRightProcess && type === 'update' ?
            <div className="add-process-container">
              <h5> New Process Info</h5>
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
            </div>
          : <></>}
          {type === 'read' ? <></> :
            isRightProcess ? 
              <button style={{ display: 'block' }} onClick={handleOperation}>
                {type === 'update' ? 'Update Process' : 'Delete Process'}
              </button>
            : <></>
          }
        </>
      : <></>}
    </div>
  );
}

export default ProcessOperation;