import React, { useContext, useEffect, useState } from 'react';
import M from 'materialize-css'
import {UserContext} from "./Navbar"
import { Link } from 'react-router-dom';

function AdminRole(props) {

    const context = useContext(UserContext);
    const [roles,setRoles] = useState([]);
    const [newId,setNewId] = useState(0);
    const [name,setName] = useState("");
    const [role,setRole] = useState({id:0,role:""});


    const handleNameChange = event =>{
        setName(event.target.value);
    }

    const handleRoleDataChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
      
        setRole((prevalue) => {
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

        loadRoles();
      }, [newId]);

      M.updateTextFields();

      async function loadRoles() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/allRoles",{
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
        setRoles(Data);
        }
       
      }

      const addRoleSubmit = event =>{
          const data = {role:name};
          addRole(data);
          event.preventDefault();
      }

      const editRoleSubmit = event =>{
        editRole(role);
        event.preventDefault();
    }

    const deleteRoleSubmit = event =>{
        deleteRole(role);
        event.preventDefault();
    }


    async function editRole(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/editRole", {
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

      async function deleteRole(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/deleteRole", {
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
            setRole({id:0,role:""});
            setNewId(newId+1);
        }
       
      }

      async function addRole(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/addRole", {
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
                  <div className="col s10"><h3>Role</h3></div>
                  <div className="col s2"><button data-target="modal1" className="waves-effect waves-light btn blue right modal-trigger" style={{marginTop:"40px"}}>Add New</button></div>
              </div>
              <div className="row" style={{marginLeft:"20px"}}>
          <table className="striped">
        <thead>
          <tr>
              <th>ID</th>
              <th>Role</th>
          </tr>
        </thead>

        <tbody>
            {roles.map(role=>
                 <tr>
                 <td>{role.id}</td>
                 <td>{role.role}</td>
                 <td width="20%">
                    <button data-target="modal2" className="waves-effect waves-light btn green modal-trigger" onClick={()=>setRole(role)}>Edit</button>
                    <button data-target="modal3"  className="waves-effect waves-light btn red  modal-trigger" onClick={()=>setRole(role)} style={{marginLeft:"10px"}}>Delete</button>
                 </td>
               </tr>
            )}
        
        </tbody>
      </table>




  <div id="modal1" style={{width:"500px",height:"300px"}} class="modal modal-fixed-footer">
  <form onSubmit={addRoleSubmit}>
    <div class="modal-content">
      <h4>Add Role</h4>
      <br/>
      
          <div className="input-field">
          <input id="name" type="text" value={name} onChange={handleNameChange} className="validate"/>
          <label className="active" for="name">Role</label>
          </div>
      
      
    </div>
    <div class="modal-footer">
      <button  class="modal-close waves-effect waves-green btn green">Add New</button>
    </div>
    </form>
  </div>


  <div id="modal2" style={{width:"500px",height:"300px"}} class="modal modal-fixed-footer">
  <form onSubmit={editRoleSubmit}>
    <div class="modal-content">
      <h4>Edit Role</h4>
      <br/>
      
          <div className="input-field">
          <input id="name2" type="text" name="role" value={role.role} onChange={handleRoleDataChange} className="validate"/>
          <label className="active" for="name2">Role</label>
          </div>
      
      
    </div>
    <div class="modal-footer">
      <button  class="modal-close waves-effect waves-green btn green">Edit</button>
    </div>
    </form>
  </div>



  <div id="modal3" style={{width:"500px",height:"300px"}} class="modal modal-fixed-footer">
  <form onSubmit={deleteRoleSubmit}>
    <div class="modal-content">
      <h4>Delete Role</h4>
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

export default AdminRole;