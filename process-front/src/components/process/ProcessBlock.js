import React, { useState } from "react";
import ProcessList from "./ProcessList";

function ProcessBlock(props) {
  const [ showSubprocess, toggleSubprocess ] = useState(false);

  return(
    <table>
      <caption>Process</caption>
      <thead>
        <tr>
          <th>Process Id</th>
          <th>Process Name</th>
          <th>Process Department</th>
          <th>Process Description</th>
          <th>Subprocesses</th>
        </tr>
      </thead>
      <tbody>
        <React.Fragment key={props.process.id}>
          <tr>
            <td colSpan={1}>{props.process.id}</td>
            <td colSpan={1}>{props.process.name}</td>
            <td colSpan={1}>{props.process.departmentName}</td>
            <td colSpan={1}>{props.process.description}</td>
            {props.process.subprocesses.length === 0 ? <td> No subprocess found </td> : 
              <td colSpan={1}>
                <button onClick={() => toggleSubprocess(!showSubprocess)}>
                  {showSubprocess ? 'Hide Subprocesses' : 'Show Subprocesses'}
                </button>
              </td>
            }
          </tr>
          <tr> {!(showSubprocess) ? <></> : <td colSpan={5}> <ProcessList data={ props.process.subprocesses } fromProcess={true} /> </td> } </tr>
        </React.Fragment>
      </tbody>
    </table>
  );
}

export default ProcessBlock;