import React, { useContext, useEffect, useState } from 'react';
import M from 'materialize-css'
import { Button, Icon, Modal } from 'react-materialize';
import { UserContext } from './Navbar';
import { Link } from 'react-router-dom';


function EditTask(props) {
  return  <div className="row">
          <form>
          <div className="input-field">
                <input value={props.taskText} onChange={props.handleTaskTextChange}
                    name="cardName" type="text" className="validate"/>
                </div>
                <div className="switch">
                <label style={{fontWeight:"bold"}}>
                Done
                <input checked={props.done} type="checkbox" onChange={props.handleDoneChange}/>
                <span className="lever"></span>
                </label>
            </div>

                 
          </form>
        
        </div>
}


function DeleteTask(props) {
  return (
        <div className="row">
         <h4>Are you sure?</h4>
        </div>
  )
}






function TaskDetails(props) {
  const context = useContext(UserContext);

  const [id, setId] = useState(0);
  const [taskText, setTaskText] = useState("");
  const [addedDate,setAddedDate] = useState(new Date());
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState("");
  const [card, setCard] = useState();


  const handleTaskTextChange = event =>{
    setTaskText(event.target.value);
}

const handleDoneChange = event =>{
    setDone(!done);
}

  useEffect(()=>{
    getTask(props.task.id);
    context.profile();
},[id]);



const handleSubmit = event =>{

  const inputData = {id,card,taskText,addedDate,done};
  saveTask(inputData);
  event.preventDefault();
  M.toast({html: "Saved successfully!",classes: 'green darken-1 rounded',marginRight:"150px"});

}


async function setData(data) {
  setId(data.id);
  setTaskText(data.taskText);
  setAddedDate(data.addedDate);
  setDone(data.done);
  setCard(data.card);
}



async function saveTask(data){
  const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
  const response = await fetch("http://localhost:8000/api/saveTask", {
  method: "PUT",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
      "Content-Type": "application/json",
      "Authorization":bearer,
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
  body: JSON.stringify(data)
  });
  let messData = await response.json();
  setMsg(messData.id? "Data Saved" : "Error");
}

async function getTask(TaskId) {
  const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
  let response = await fetch("http://localhost:8000/api/getTask/"+TaskId,{
    method:"GET",
    headers: {
      "Authorization":bearer,
      'Content-Type': 'application/json',
    },
  });
  if(response.status==200){
      let data = await response.json();
      setData(data);
  }else{
    setMsg("404 ITEM NOT FOUND");
  }
}


async function toDeleteTask() {
  const inputData = {id,card,taskText,addedDate,done};
  deleteTask(inputData);
  M.toast({html: "Deleted successfully!",classes: 'center red darken-1 rounded'});
}

async function deleteTask(data){
  const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
  const response = await fetch("http://localhost:8000/api/deleteTask", {
  method: "DELETE",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
      "Content-Type": "application/json",
      "Authorization":bearer,
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
  body: JSON.stringify(data)
  });
  let messData = await response.json();
  setMsg(messData.id? "Data Deleted" : "Error");
}

    return (
          <div className="card">
          
            <div className="card-content" >
            <p className="card-title">{taskText}</p>
            <p><span style={{color:"#999",fontSize:"12px",fontWeight:"bold"}}> {new Date(props.task.addedDate).toLocaleDateString() +
                  " " +
                  new Date(props.task.addedDate).toLocaleTimeString()}</span></p>            
            </div>
            <div className="card-action" >
              <div className="row">
                <div className="input-field">
                <div className="switch left">
                <label>
                Done
                <input checked={done} type="checkbox" readOnly/>
                <span className="lever"></span>
                </label>
            </div>
                </div>

                <div className="input-field">
                


            <Modal
              actions={[
                <Button
                  flat
                  modal="close"
                  node="button"
                  waves="green"
                  className=" white-text"
                  style={{backgroundColor:"#455a64 "}}
                >
                  Close<Icon right>close</Icon>
                </Button>,
                <a
                  node="button"
                  waves="light"
                  onClick={toDeleteTask}
                  className="btn left red white-text"
                  href={"/details/"+props.task.card.id}
                >
                  Delete<Icon right>delete</Icon>
                </a>,
              ]}
              bottomSheet={false}
              fixedFooter
              header="Edit Card"
              id="Modal-0"
              open={false}
              style={{
                width: "500px",
                height: "250px",
              }}
              options={{
                dismissible: true,
                endingTop: "10%",
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                opacity: 0.5,
                outDuration: 250,
                preventScrolling: true,
                startingTop: "4%",
              }}
              trigger={<a className="right"  href="#" ><Icon style={{color:"#f44336",fontSize:"180%"}}>delete</Icon></a>}
            >
              <DeleteTask/>
            </Modal>



            <Modal
              actions={[
                <Button
                  flat
                  modal="close"
                  node="button"
                  waves="green"
                  className="white-text"
                  style={{backgroundColor:"#455a64 "}}
                >
                  Close<Icon right>close</Icon>
                </Button>,
                <Button
                  flat
                  node="button"
                  waves="light"
                  onClick={handleSubmit}
                  className="left green white-text"
                >
                  Edit<Icon right>edit</Icon>
                </Button>,
              ]}
              bottomSheet={false}
              fixedFooter
              header="Edit Task"
              id="Modal-0"
              open={false}
              style={{
                width: "500px",
                height: "270px",
              }}
              options={{
                dismissible: true,
                endingTop: "10%",
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                opacity: 0.5,
                outDuration: 250,
                preventScrolling: true,
                startingTop: "4%",
              }}
              trigger={<a className="right" href="#" ><Icon style={{color:"black",fontSize:"170%"}}>border_color</Icon></a>}
            >
              <EditTask
                taskText={taskText}
                done={done}
                handleTaskTextChange={handleTaskTextChange}
                handleDoneChange={handleDoneChange}
              />
            </Modal>
                </div>
              </div>
            

            





            </div>




           
          </div>
    );
}

export default TaskDetails;