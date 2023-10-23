import React, { useState, useRef, useEffect } from "react";
import DepartmentBlock from "./DepartmentBlock";
import { fetchSingleDepartmentFromAPI, updateDepartmentToAPI } from "../../Service/apiService";

function UpdateDepartment() {
  const [ showDepartment, toggleDepartment ] = useState(false);
  const [ isRightDepartment, toggleRightDepartment ] = useState(false);
  const [ departmentId, setDepartmentId ] = useState(0);
  const [ error, setError] = useState(null);
  const inputRef = useRef(null);
  const [ department, setDepartment] = React.useState({
    id: 0,
    name: ''
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  const fetchDepartment = async (id) => {
    await fetchSingleDepartmentFromAPI(id)
      .then((response) => {
        setDepartment(response.data);
        toggleDepartment(true);
      })
      .catch((responseError) => {
        window.alert('Id not found!');
        setError(responseError);
      });
  }

  const handleIdInput = (event) => {
    const { value } = event.target;
    setDepartmentId(value);
  }

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setDepartment({
      ...department,
      [name]: value
    });
  }

  const confirmRightDepartment = () => {
    toggleRightDepartment(true);
    toggleDepartment(false);
    setDepartment({
      ...department,
      id: departmentId
    });
  }

  const handleSubmit = async () => {
    await updateDepartmentToAPI(departmentId, department);
    window.alert('Department updated');
    toggleDepartment(false);
    toggleRightDepartment(false);
    newSearch();
  }

  const newSearch = () => {
    setDepartment({
      id: 0,
      name: ''
    });
    inputRef.current.value = '';
    inputRef.current.focus();
    toggleDepartment(false);
    toggleRightDepartment(false);
  }

   return (
    <div className="department-main-container">
      <input 
        type="number"
        inputMode="numeric"
        ref={inputRef}
        className="id-to-search"
        placeholder="Type the department Id"
        onChange={handleIdInput}
      />
      <button onClick={() => fetchDepartment(departmentId)}> Search Department </button>
      <button style={{display: 'inline'}} onClick={newSearch}> Clear </button>
      {showDepartment ? 
      <>
        <DepartmentBlock department={department} />
        <button onClick={confirmRightDepartment}> Confirm Department </button>
        <button style={{display: 'inline'}} onClick={newSearch} > Cancel </button>
      </>
      : <></>}
      {isRightDepartment ? 
      <div className="add-department-container">
        <h5> New Department</h5>
        <div className="label-and-input">
          <span>Name</span>
          <input type="text" name="name" placeholder="Department Name" onChange={handleInputChanges} />
        </div>
        <button onClick={handleSubmit}> Confirm </button>
      </div>   
       : <></>}
    </div>
  );
}

export default UpdateDepartment;