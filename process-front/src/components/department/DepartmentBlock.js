import React from "react";

function DepartmentBlock(props) {
  return(
    <div className="department-list-item">
      <h5>Department</h5>
      <div className="label-and-input">
        <span>Department Id</span>
        <p> {props.department.id} </p>
      </div>
      <div className="label-and-input">
        <span>Name</span>
        <p> {props.department.name} </p>
      </div>
  </div>
  );
}

export default DepartmentBlock;