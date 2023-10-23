import React, { useState, useRef, useEffect } from "react";
import DepartmentBlock from "./DepartmentBlock";
import { fetchSingleDepartmentFromAPI, updateDepartmentToAPI, deleteDepartmentFromAPI } from "../../Service/apiService";

function DepartmentOperation({ type }) {
  const [showDepartment, toggleDepartment] = useState(false);
  const [isRightDepartment, toggleRightDepartment] = useState(false);
  const [departmentId, setDepartmentId] = useState(0);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const [department, setDepartment] = React.useState({
    id: 0,
    name: ''
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const fetchDepartment = async (id) => {
    try {
      const response = await fetchSingleDepartmentFromAPI(id);
      setDepartment(response.data);
      toggleDepartment(true);
    } catch (responseError) {
      window.alert('Id not found!');
      setError(responseError);
    }
  };

  const handleIdInput = (event) => {
    const { value } = event.target;
    setDepartmentId(value);
  };

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setDepartment({
      ...department,
      [name]: value
    });
  };

  const confirmOperation = async () => {
    switch (type) {
      case 'update':
        toggleRightDepartment(true);
        toggleDepartment(false);
        setDepartment({
          ...department,
          id: departmentId
        });
        break;
      case 'delete':
        await deleteDepartmentFromAPI(departmentId);
        window.alert('Department Deleted!');
        newSearch();
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    await updateDepartmentToAPI(departmentId, department);
    window.alert('Department updated');
    toggleDepartment(false);
    toggleRightDepartment(false);
    newSearch();
  };

  const newSearch = () => {
    setDepartment({
      id: 0,
      name: ''
    });
    inputRef.current.value = '';
    inputRef.current.focus();
    toggleDepartment(false);
    toggleRightDepartment(false);
  };

  return (
    <div className="department-main-container">
      <input
        type="number"
        inputMode="numeric"
        ref={inputRef}
        className="id-to-search"
        placeholder={`Type the Department ${type === 'update' ? 'Id' : 'Name'}`}
        onChange={type === 'update' ? handleIdInput : handleInputChanges}
      />
      <button onClick={() => fetchDepartment(departmentId)}> Search Department </button>
      <button style={{ display: 'inline' }} onClick={newSearch}> Clear </button>
      {showDepartment &&
        <>
          <DepartmentBlock department={department} />
          {type === 'update' &&
            <button onClick={confirmOperation}> Confirm Department </button>
          }
          <button onClick={confirmOperation}>
            {type === 'update' ? 'Update Department' : 'Delete Department'}
          </button>
          <button style={{ display: 'inline' }} onClick={newSearch}> Cancel </button>
          {isRightDepartment && type === 'update' &&
            <div className="add-department-container">
              <h5> New Department</h5>
              <div className="label-and-input">
                <span>Name</span>
                <input type="text" name="name" placeholder="Department Name" onChange={handleInputChanges} />
              </div>
              <button onClick={handleSubmit}> Confirm </button>
            </div>
          }
        </>
      }
    </div>
  );
}

export default DepartmentOperation;