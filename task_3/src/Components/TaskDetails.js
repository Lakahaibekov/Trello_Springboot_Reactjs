import React, { useContext, useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import { UserContext } from '../App';

function TaskDetails(props) {
    const context = useContext(UserContext);

    let {taskId} = useParams();

    const [id, setId] = useState();
    const [taskText, setTaskText] = useState("");
    const [addedDate, setAddedDate] = useState(new Date());
    const [done, setDone] = useState(false);
    const [message, setMessage] = useState("");
    const [card, setCard] = useState();
    const [cardId, setCardId] = useState(0);


    useEffect (()=>{
        getTask(taskId);
        context.profile();
    },[]);

    const handleTaskTextChange = event =>{
        setTaskText(event.target.value)
      }

    const handleAddedDateChange = event =>{
        setAddedDate(new Date())
      }

    const handleDoneChange = event =>{
        setDone(!done);
      }

    async function setData(data) {
        setId(data.id);
        setTaskText(data.taskText);
        setAddedDate(new Date(data.addedDate));
        setDone(data.done);
        setCard(data.card);
        setCardId(data.card.id);
    }

    async function handleSubmitTask(){
        const inputData = {id, taskText, addedDate, done, card}
        saveTask(inputData);
    }
    

    async function getTask(TaskId) {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/gettask/"+TaskId,{
            method:"GET",
            headers: {
              "Authorization":bearer,
              'Content-Type': 'application/json',
            },
          });
        if(response.status == 200){
            let data = await response.json();
            setData(data);
            console.log(data)
        }
        
    }

    async function saveTask(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/savetask", {
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
        setMessage(messData.id? "Task Saved" : "Error");
    }



    async function toDeleteTask() {
        const inputData = {id, taskText, addedDate, done, card};
        deleteCard(inputData);
    }

    async function deleteCard(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/deletetask", {
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
        setMessage(messData.id? "Task Deleted" : "Error");
    }

    return (
        <div>
            <h3>{message}</h3>
            <div className="card">
                <form onSubmit={handleSubmitTask}>
                    <div className="row">
                        <div className="card-content">
                            <div>
                                <input type="text" className="validate" placeholder="Create new card" value={taskText} onChange={handleTaskTextChange}/>
                                <input type="hidden" className="validate" value={addedDate} onChange={handleAddedDateChange}/>
                                <div className="switch">
                                    <label>
                                        Off
                                    <input checked={done} onChange={handleDoneChange} type="checkbox"/>
                                    <span className="lever"></span>
                                        On
                                    </label>
                                </div>
                                <h1></h1>
                                <a className="btn waves-effect waves-light" type="button" name="action" onClick={handleSubmitTask} href={"/carddetails/"+cardId}>Save Card<i className="material-icons right">save</i></a>
                                <a className="btn waves-effect waves-light" style={{backgroundColor: "red"}} type="button" onClick = {toDeleteTask} href={"/carddetails/"+cardId}>Delete Card<i className="material-icons right">delete</i></a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskDetails;