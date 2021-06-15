import React, { useState,useEffect } from 'react';
import { Button, Icon, TextInput } from 'react-materialize';

function CreateCard(props) {

    const [name,setName] = useState("");
    const [message, setMessage] = useState("");

    const handleNameChange = event =>{
      setName(event.target.value);
    }

    const handleSubmit = event =>{
      var date = new Date();
      
      const inputData = {name,date}
      addCard(inputData);
      setName("");
      event.preventDefault();
  
    }


    async function addCard(data){
      const response = await fetch("http://localhost:8000/api/addCard", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
      });
      let messData = await response.json();
      setMessage(messData.id? "Data Added : " : "Error");
      console.log(messData);
    }

    return (
        <div className="row">
        <div className="col s6 offset-s3">
          <div className="card">
          
            <div className="card-content">
            <span className="card-title">Create New Card</span>
            <form onSubmit={handleSubmit}>
            <div className="input-field">
                <input value={name} onChange={handleNameChange}
                    id="card" name="cardName" type="text" className="validate"/>
                <label htmlFor="card">Card Name</label>
                </div>
                <Button waves="light">add new <Icon right>add</Icon></Button>
            </form>
                
            </div>
          </div>
        </div>
      </div>
    );
}

export default CreateCard;