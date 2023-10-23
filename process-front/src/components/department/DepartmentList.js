import React from "react";
import DepartmentBlock from "./DepartmentBlock";

function DepartmentList(props) {
  return (
    <div className="department-list">
      {props.data.map((department) => (
        // <div className="department-list-item"> 
          <DepartmentBlock department={department} />
        // {/* </div> */}
      ))}
    </div>
  );
}

export default DepartmentList;