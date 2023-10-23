import { useRef } from "react";
import React from "react";
import { postDepartmentToAPI } from "../../Service/apiService";

function AddDepartment() {
  const inputRef = useRef(null);
  const [department, setDepartment] = React.useState({
    id: 0,
    name: ''
  });

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setDepartment({
      ...department,
      [name]: value,
    });
  }

  const handleSubmit = async () => {
    await postDepartmentToAPI(department);
    window.alert('Department Added!');
    inputRef.current.value = '';
  }

  return (
    <div className="add-department-container">
      <h5> New Department </h5>
      <div className="label-and-input">
        <span>Name</span>
        <input type="text" ref={inputRef} name="name" placeholder="Department Name" onChange={handleInputChanges} />
      </div>
      <button onClick={handleSubmit}> Confirm </button>
    </div>
  )
}

export default AddDepartment;
