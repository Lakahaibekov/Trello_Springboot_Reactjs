import React, { useContext } from 'react';
import Card from './Card';
import  { useState,useEffect } from 'react';
import { Button, Icon } from 'react-materialize';
import userEvent from '@testing-library/user-event';
import {UserContext} from "./Navbar"


function AllCards({newCardAddedId}) {

  const [data, setData] = useState([]);
  const context = useContext(UserContext);
  

  async function loadData() {
    const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/allCards",{
      method:"GET",
    withCredentials: true,
    cache: "no-cache",
    credentials:"same-origin",
    mode:"cors",
    headers: {
      "Authorization":bearer,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
     redirect: "follow",
    referrerPolicy: "no-referrer",
       }
    );
    let Data = await response.json();
    setData(Data);
   
  }
  console.log(context);
  


  useEffect(() => {
    
    loadData();
    context.profile();
   
  }, [newCardAddedId]);

  const cards = data?.map(cards=>(
    <Card key={cards.id} card={cards}/>
  ));

  return (<div className="row">
          {cards}
          </div>
    );
}


function SearchCards({search}) {
  const context = useContext(UserContext);
  const [data, setData] = useState([]);
 
  

  async function loadData() {
    const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/searchCards?name="+search,{
      method:"GET",
      headers: {
        "Authorization":bearer,
        'Content-Type': 'application/json',
      },
    });
    let Data = await response.json();
    setData(Data);
    
  }

  useEffect(() => {
    loadData();
  }, [search]);

  const cards = data?.map(cards=>(
    <Card key={cards.id} card={cards}/>
  ));

  if(data.length!=0){
    return (<div className="row">
      <h4>Search results for : "{search}" </h4>
    {cards}
    </div>
);
  }else{
    return (<div className="row">
       <h4>Search results for : "{search}" </h4>
       <div className="center-align">
       <h2>Result not found</h2>
        <Icon style={{fontSize:"600%",color:"#b71c1c"}}>block</Icon>
       </div>
        
    </div>
);
  }
 
}


function Content(props) {

  const context = useContext(UserContext);

  const [name,setName] = useState("");
  const [message, setMessage] = useState("");
  const [newId, setNewId] = useState(0);
  const [search, setSearch] = useState("");

  const handleSearchChange = event =>{
    setSearch(event.target.value);
  }

  const handleNameChange = event =>{
    setName(event.target.value);
  }

  const handleSearchSubmit = event =>{

  }

  const handleSubmit = event =>{
    var date = new Date();
    
    const inputData = {name,date}
    addCard(inputData);
    setName("");
    
    event.preventDefault();


  }


  async function addCard(data){
    const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
    const response = await fetch("http://localhost:8000/api/addCard", {
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
  


    return (
      <div className="container" style={{minHeight:"407px"}}>
            <div className="row">
            <div className="row">
  <nav>
    <div className="nav-wrapper amber darken-2">
      <form >
        <div className="input-field">
          <input id="search" type="search" value={search} onChange={handleSearchChange} required/>
          <label className="label-icon" for="search"><i className="material-icons">search</i></label>
          <i className="material-icons">close</i>
        </div>
      </form>
    </div>
  </nav>
</div>


            
{search==""?<div>
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
            <AllCards newCardAddedId={newId} />
            </div>
            :
            <SearchCards search={search} />
          } 
        </div>
      </div>
    );
}

export default Content;