import React, { useState, useRef, useEffect } from "react";
import DepartmentBlock from "./DepartmentBlock";
import { fetchSingleDepartmentFromAPI } from "../../Service/apiService";

function IndividualDepartment() {
  const [ showDepartment, toggleDepartment ] = useState(false);
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

  const handleInputChanges = (event) => {
    const { value } = event.target;
    setDepartmentId(value);
  }

  const newSearch = () => {
    setDepartment({
      id: 0,
      name: ''
    });
    inputRef.current.value = '';
    inputRef.current.focus();
    toggleDepartment(false);
  }

   return (
    <div className="department-main-container">
      <input 
        type="number"
        inputMode="numeric"
        ref={inputRef}
        className="id-to-search"
        placeholder="Type the Department Id"
        onChange={handleInputChanges}
      />
      <button onClick={() => fetchDepartment(departmentId)}> Search Department </button>
      <button style={{display: 'inline'}} onClick={newSearch}> Clear </button>
      {showDepartment ? <DepartmentBlock department={department} /> : <></>}
    </div>
  );
}

export default IndividualDepartment;