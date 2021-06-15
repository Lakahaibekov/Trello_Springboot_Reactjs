import React, {useState, useEffect, useContext} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import { UserContext } from '../App';


function CardDetails() {
    const context = useContext(UserContext);

    let {cardId} = useParams();

    const [id, setId] = useState(cardId);
    const [name, setName] = useState("");
    const [addedDate, setAddedDate] = useState(new Date());
    const [message, setMessage] = useState("");
    const [newId, setNewId] = useState(0);
    

    useEffect (()=>{
        getCard(cardId);
        loadTasks(cardId);
        context.profile();
    },[newId]);

    const handleNameChange = event =>{
        setName(event.target.value)
      }

    const handleAddedDateChange = event =>{
        setAddedDate(new Date())
      }

    const handleSubmit = event =>{
        const inputData = {id, name, addedDate}
        saveCard(inputData);
        event.preventDefault();
    }


    async function setData(data) {
        setId(data.id);
        setName(data.name);
        setAddedDate(new Date());
    }

    async function saveCard(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/savecard", {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Authorization":bearer,
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
        let messData = await response.json();
        setMessage(messData.id? "Data Saved" : "Error");
    }

    async function getCard(CardId) {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/getcard/"+CardId,{
            method:"GET",
            headers:{
              "Authorization":bearer
            }
          });
        if(response.status == 200){
            let data = await response.json();
            setData(data);
            console.log(data)
        }
        
    }
    

    async function toDeleteCard() {
        const inputData = {id, name, addedDate};
        deleteCard(inputData);  
    }

    async function deleteCard(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/deletecard", {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Authorization":bearer,
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
        });
        let messData = await response.json();
        setMessage(messData.id? "Data Deleted" : "Error");
    }



    const [taskText, setTaskText] = useState("");
    const [addedDateTask, setAddedDateTask] = useState(new Date());
    const [done, setDone] = useState(false);
    
    const [messageTask, setMessageTask] = useState("");

    const handleTaskTextChange = event =>{
        setTaskText(event.target.value)
      }

    const handleAddedDateTaskChange = event =>{
        setAddedDate(new Date())
      }

    const handleDoneChange = event =>{
        setDone(false)
      }

    

    const handleSubmitTask = event =>{
        const card = {id, name, addedDate}
        var addedDate = addedDateTask;
        const inputData = {taskText, addedDate, done, card}
        addTask(inputData);
        setTaskText("");
        setAddedDateTask(new Date());
        setDone(false);
        event.preventDefault();
    }

    async function addTask(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/addtask",{
            method: "POST",
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
        let mesDataText = await response.json();
        setMessageTask(mesDataText.id? "Task added":"Error")
        setNewId(mesDataText.id);
    }

    const [tasks, setTasks] = useState([]);

    async function loadTasks(CardId){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/gettasksbyid/"+CardId,{
            method:"GET",
            headers:{
              "Authorization":bearer
            }
          });
        let tableTasks = await response.json();
        setTasks(tableTasks);
    }

    return (
        <div>
            <h3>{message}</h3>
            <div className="card" style={{backgroundColor:"gray"}}>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="card-content">
                            <h4>Card details:</h4>
                            <div>
                                <input type="text" className="validate" placeholder="Create new card" value={name} onChange={handleNameChange}/>
                                <input type="hidden" className="validate" value={addedDate} onChange={handleAddedDateChange}/>
                                <button className="btn waves-effect waves-light" type="submit" name="action">Save Card<i className="material-icons right">save</i></button>
                                <a className="btn waves-effect waves-light" style={{backgroundColor: "red"}} href={"/allcards"} type="button" onClick = {toDeleteCard}>Delete Card<i className="material-icons right">delete</i></a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="row">
                <div >
                    <h2>{messageTask}</h2>
                    <div className="card">
                        <form onSubmit={handleSubmitTask}>
                            <div className="row">
                                <div className="card-content">
                                    <div >
                                        <input type="text" className="validate" placeholder="Create new task" value={taskText} onChange={handleTaskTextChange}/>
                                        <input type="hidden" className="validate" value={addedDate} onChange={handleAddedDateChange}/>
                                        <input type="hidden" className="validate" value={done} onChange={handleDoneChange}/>
                                        <button className="btn waves-effect waves-light" type="submit" name="action">Add Task<i className="material-icons right">send</i></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row">
                {tasks?.map(task=>(
                    <div className="card">
                        <div className="card-content">
                            <h4>{task.taskText}</h4>
                            <span>{task.addedDate}</span>
                        </div>
                        <div className="card-action">
                            <div className="row">
                                <div className="col s10">
                                    <div className="switch">
                                        <label>
                                            Off
                                        <input checked={task.done} type="checkbox"/>
                                        <span className="lever"></span>
                                            On
                                        </label>
                                    </div>
                                </div>
                                <div className="col s2">
                                <a className="card-title activator grey-text text-darken-1" style={{float: "right", fontSize: "18px"}} href={`/taskdetails/${task.id}`}><strong>Details</strong></a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardDetails;