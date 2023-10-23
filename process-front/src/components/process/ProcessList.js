import React, { useEffect, useState } from "react";

function ProcessList(props) {
  const [processes, setProcesses] = useState([]);
  const [processStates, setProcessStates] = useState([]);
  
  useEffect (() => {
    setProcesses(props.data);
    setProcessStates(props.data.map(() => false));
  }, [props.data]);

  const toggleSubprocessTable = (index) => {
    const newProcessStates = [...processStates];
    newProcessStates[index] = !newProcessStates[index];
    setProcessStates(newProcessStates);
  };

  return(
    <table>
      <caption>{props.fromProcess ? 'Subprocesses' : 'Processes'} </caption>
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
        {processes.map((process, index) => (
          <React.Fragment key={process.id}>
            <tr>
              <td colSpan={1}>{process.id}</td>
              <td colSpan={1}>{process.name}</td>
              <td colSpan={1}>{process.departmentName}</td>
              <td colSpan={1}>{process.description}</td>
              <td colSpan={1}>
                {process.subprocesses.length === 0 ? 'No subprocess found' : 
                  <button onClick={() => toggleSubprocessTable(index)}>
                    {processStates[index] ? 'Hide Subprocesses' : 'Show Subprocesses'}
                  </button>
                }
              </td>
            </tr>
            <tr>  {!(processStates[index]) ? <></> : <td colSpan={5}> <ProcessList data={ process.subprocesses } fromProcess={true}/>  </td> } </tr>
          </React.Fragment>            
        ))}
      </tbody>
    </table>
  );
}

export default ProcessList;