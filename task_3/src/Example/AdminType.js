import React, { useContext, useEffect, useState } from 'react';
import M from 'materialize-css'
import {UserContext} from "./Navbar"
import { Link } from 'react-router-dom';

function AdminType(props) {

    const context = useContext(UserContext);
    const [types,setTypes] = useState([]);
    const [newId,setNewId] = useState(0);
    const [name,setName] = useState("");
    const [type,setType] = useState({id:0,name:""});


    const handleNameChange = event =>{
        setName(event.target.value);
    }

    const handleTypeDataChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
      
        setType((prevalue) => {
          return {
            ...prevalue,            
            [name]: value
          }
        })
      }


    useEffect(() => {
    
        context.profile();
        var elems = document.querySelector('.sidenav');
        var instances = M.Sidenav.init(elems,{});

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});

        M.updateTextFields();

        loadTypes();
      }, [newId]);

      M.updateTextFields();

      async function loadTypes() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/allTypes",{
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
        if(response.status==200){
        let Data = await response.json();
        setTypes(Data);
        }
       
      }

      const addTypeSubmit = event =>{
          const data = {name:name};
          addType(data);
          event.preventDefault();
      }

      const editTypeSubmit = event =>{
        editType(type);
        event.preventDefault();
    }

    const deleteTypeSubmit = event =>{
        deleteType(type);
        event.preventDefault();
    }


    async function editType(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/editType", {
          method: "PUT",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Authorization":bearer,
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data)
        });
        if(response.status==200){
            let Data = await response.json();
            setName("");
            setNewId(newId+1);
        }
      }

      async function deleteType(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/deleteType", {
          method: "DELETE",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Authorization":bearer,
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data)
        });
        if(response.status==200){
            setType({id:0,name:""});
            setNewId(newId+1);
        }
       
      }

      async function addType(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/addType", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Authorization":bearer,
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data)
        });
        if(response.status==200){
            let Data = await response.json();
            setName("");
            setNewId(Data.id);
        }
       
      }

    return (
        <div className="row">
          <div className="col" style={{padding:"inherit",width:"300px"}}>
          <ul id="slide-out" class="sidenav sidenav-fixed" style={{top:"64px",maxHeight:"397px"}}>
      <li><a href="#!" className="grey lighten-1">Dashboard</a></li>
      <li><a href="#!" >Users</a></li>
      <li><Link to="/adminAd">Advertisements</Link></li>
      <li><Link to="/adminCategory">Categories</Link></li>
      <li><Link to="/adminRegion">Regions</Link></li>
      <li><Link to="/adminType">Types</Link></li>
      <li><Link to="/adminRole">Roles</Link></li>
    </ul>

          </div>


          <div className="col s9">
              <div className="row" style={{marginLeft:"20px"}}>
                  <div className="col s10"><h3>Type</h3></div>
                  <div className="col s2"><button data-target="modal1" className="waves-effect waves-light btn blue right modal-trigger" style={{marginTop:"40px"}}>Add New</button></div>
              </div>
              <div className="row" style={{marginLeft:"20px"}}>
          <table className="striped">
        <thead>
          <tr>
              <th>ID</th>
              <th>Type Name</th>
          </tr>
        </thead>

        <tbody>
            {types.map(type=>
                 <tr>
                 <td>{type.id}</td>
                 <td>{type.name}</td>
                 <td width="20%">
                    <button data-target="modal2" className="waves-effect waves-light btn green modal-trigger" onClick={()=>setType(type)}>Edit</button>
                    <button data-target="modal3"  className="waves-effect waves-light btn red  modal-trigger" onClick={()=>setType(type)} style={{marginLeft:"10px"}}>Delete</button>
                 </td>
               </tr>
            )}
        
        </tbody>
      </table>




  <div id="modal1" style={{width:"500px",height:"300px"}} class="modal modal-fixed-footer">
  <form onSubmit={addTypeSubmit}>
    <div class="modal-content">
      <h4>Add Type</h4>
      <br/>
      
          <div className="input-field">
          <input id="name" type="text" value={name} onChange={handleNameChange} className="validate"/>
          <label className="active" for="name">Name</label>
          </div>
      
      
    </div>
    <div class="modal-footer">
      <button  class="modal-close waves-effect waves-green btn green">Add New</button>
    </div>
    </form>
  </div>


  <div id="modal2" style={{width:"500px",height:"300px"}} class="modal modal-fixed-footer">
  <form onSubmit={editTypeSubmit}>
    <div class="modal-content">
      <h4>Edit Type</h4>
      <br/>
      
          <div className="input-field">
          <input id="name2" type="text" name="name" value={type.name} onChange={handleTypeDataChange} className="validate"/>
          <label className="active" for="name2">Name</label>
          </div>
      
      
    </div>
    <div class="modal-footer">
      <button  class="modal-close waves-effect waves-green btn green">Edit</button>
    </div>
    </form>
  </div>



  <div id="modal3" style={{width:"500px",height:"300px"}} class="modal modal-fixed-footer">
  <form onSubmit={deleteTypeSubmit}>
    <div class="modal-content">
      <h4>Delete Type</h4>
      <br/>
      <h5>Are you sure?</h5>  
    </div>
    <div class="modal-footer">
      <button  class="modal-close waves-effect waves-green btn red">Delete</button>
    </div>
    </form>
  </div>


      </div>
          </div>
        </div>
    );
}

export default AdminType;