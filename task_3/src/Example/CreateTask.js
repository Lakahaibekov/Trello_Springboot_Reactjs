import React from 'react';
import { Button, Icon } from 'react-materialize';

function CreateTask(props) {
    return (props.msg==""?
    <div className="row">
    <div className="card">
    
      <div className="card-content">
      <span className="card-title">Create New Task</span>
      <form onSubmit={props.handleSubmitTask}>
      <div className="input-field">
          <input id="card" value={props.taskText} onChange={props.handleTaskTextChange} name="taskName" type="text" className="validate"/>
          <label htmlFor="card">Task Name</label>
          
          </div>
          <Button waves="light">add new <Icon right>add</Icon></Button>
      </form>
          
      </div>
    </div>
</div>
         :
         <div>
         </div>

  
        
    );
}

export default CreateTask;