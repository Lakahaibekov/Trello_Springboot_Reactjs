import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import CardDetails from './CardDetails';
import CreateTask from './CreateTask';
import TaskDetails from './TaskDetails';
import M from "materialize-css"
import { UserContext } from './Navbar';





function Details(props) {
    
    const context = useContext(UserContext);

    let {cardId} = useParams();

    const [id, setId] = useState(cardId);
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date());
    const [message, setMessage] = useState("");

    const [newId, setNewId] = useState(0);
    const [taskText, setTaskText] = useState("");
    const [addedDate,setAddedDate] = useState(new Date());
    const [done, setDone] = useState(false);
    const [msg, setMsg] = useState("");



    const handleTaskTextChange = event =>{
        setTaskText(event.target.value);
    }

    const handleDoneChange = event =>{
        setDone(event.target.value);
    }

    const handleSubmitTask = event =>{
        var date = new Date();
        var card = {id,name,date}
        const inputData = {card,taskText,addedDate,done}
        addTask(inputData);
        setTaskText("");
        setDone(false);
        console.log(inputData);
        event.preventDefault();
      }

      async function addTask(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/addTask", {
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
        let messData = await response.json();
        setMessage(messData.id? "Data Added : " : "Error");
        console.log(messData);
        setNewId(messData.id);
      }



      const [tasks, setTasks] = useState([]);
    
  
      async function loadData() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/allTasks?id="+id,{
          method:"GET",
          headers:{
            "Authorization":bearer
          }
        });
        let Data = await response.json();
        console.log(Data);
        setTasks(Data);
      }

    
      const tasks2 = tasks?.map(task=>(
        <TaskDetails key={task.id} task={task}/>
      ));


        

    useEffect(()=>{
        getCard(cardId);
        loadData();
        context.profile();
    },[newId]);
    
    const handleNameChange = event =>{
        setName(event.target.value);
    }


    const handleSubmit = event =>{

        const inputData = {id, name, date};
        saveCard(inputData);
        event.preventDefault();

    }

    
    async function setData(data) {
        setId(data.id);
        setName(data.name);
        setDate(data.date);
    }


    
    async function saveCard(data){
      const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/saveCard", {
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
        setMessage(messData.id? "Data Saved" : "Error");
    }

    async function getCard(CardId) {
      const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/getCard/"+CardId,{
          method:"GET",
          headers:{
            "Authorization":bearer
          }
        });
        if(response.status==200){
            let data = await response.json();
            setData(data);
        }else{
            setMsg("404 ITEM NOT FOUND");
        }
    }


    async function toDeleteCard() {
        const inputData = {id, name, date};
        if(tasks.length==0){
            deleteCard(inputData);
        }
       
    }

    async function deleteCard(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/deleteCard", {
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
        setMessage(messData.id? "Data Deleted" : "Error");
    }






    return (
      <div className="row" style={{minHeight:"388px"}}>
        <div className="container">
          <div className="row">
            <div className="col s10 offset-s1">
              <CardDetails
                tasks={tasks}
                name={name}
                date={date}
                id={id}
                handleNameChange={handleNameChange}
                toDeleteCard={toDeleteCard}
                handleSubmit={handleSubmit}
                msg={msg}
              />
              <CreateTask 
              msg={msg}
              handleTaskTextChange={handleTaskTextChange}
              taskText={taskText}
              handleSubmitTask={handleSubmitTask}
              />
             <div className="row">
            {tasks2}
            </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Details;