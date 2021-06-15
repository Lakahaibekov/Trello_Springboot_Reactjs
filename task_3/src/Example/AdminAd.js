import React, { useContext, useEffect, useState } from 'react';
import M from 'materialize-css'
import {UserContext} from "./Navbar"
import { Link } from 'react-router-dom';

function AdminAd(props) {

    const context = useContext(UserContext);
    const [ads,setAds] = useState([]);
    const [newId,setNewId] = useState(0);

    const [categories,setCategories] = useState([]);
    const [regions,setRegions] = useState([]);
    const [types,setTypes] = useState([]);

    const [ad,setAd] = useState({
      id:0,
      title:"",
      description:"",
      date:new Date().toISOString().substr(0,10),
      room:1,
      price:0,
      image:"",
      type:1,
      category:1,
      region:1
    });


    const handleAdDataChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
      
        setAd((prevalue) => {
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

        loadAds();
        loadCategories();
        loadRegions();
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


      async function loadRegions() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/allRegions",{
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
        setRegions(Data);
        }
       
      }

      async function loadCategories() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/allCategories",{
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
        setCategories(Data);
        }
       
      }

      function setAd2(data){
        setAd({
          id:data.id,
          title:data.title,
          description:data.description,
          date:new Date(data.date).toISOString().substr(0,10),
          room:data.room,
          price:data.price,
          image:data.image,
          type:data.type.id,
          category:data.category.id,
          region:data.region.id
        })
        console.log(ad);
      }

      function setAd3(){
        setAd({
          id:0,
          title:"",
          description:"",
          date:new Date().toISOString().substr(0,10),
          room:1,
          price:0,
          image:"",
          type:1,
          category:1,
          region:1
        });
        console.log(ad);
      }

      async function loadAds() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/allAds",{
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
        setAds(Data);
        }
       
      }

      const addAdSubmit = event =>{
          const data = {title:ad.title,
          description:ad.description,
          date:new Date(ad.date).toISOString().substr(0,10),
          room:ad.room,
          price:ad.price,
          image:ad.image,
          type:{id:ad.type,name:""},
          category:{id:ad.category,name:""},
          region:{id:ad.region,name:"",code:""}
          };
          addAd(data);
          event.preventDefault();
      }

      const editAdSubmit = event =>{
        console.log(ad);
        const data = {
          id:ad.id,
          title:ad.title,
          description:ad.description,
          date:new Date(ad.date).toISOString().substr(0,10),
          room:ad.room,
          price:ad.price,
          image:ad.image,
          type:{id:ad.type,name:""},
          category:{id:ad.category,name:""},
          region:{id:ad.region,name:"",code:""}
          };
        editAd(data);
        event.preventDefault();
    }

    const deleteAdSubmit = event =>{
        deleteAd(ad);
        event.preventDefault();
    }


    async function editAd(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/editAd", {
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
            setAd({
              id:0,
              title:"",
              description:"",
              date:new Date().toISOString().substr(0,10),
              room:1,
              price:0,
              image:"",
              type:1,
              category:1,
              region:1
            });
            console.log(Data);
            setNewId(newId+1);
        }
      }

      async function deleteAd(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/deleteAd", {
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
          setAd({
            id:0,
            title:"",
            description:"",
            date:new Date().toISOString().substr(0,10),
            room:1,
            price:0,
            image:"",
            type:1,
            category:1,
            region:1
          });
            setNewId(newId+1);
        }
       
      }

      async function addAd(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/addAd", {
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
           // let Data = await response.json();
            setAd({
              id:0,
              title:"",
              description:"",
              date:new Date().toISOString().substr(0,10),
              room:1,
              price:0,
              image:"",
              type:1,
              category:1,
              region:1
            });
            setNewId(newId+1);
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
                  <div className="col s10"><h3>Ad</h3></div>
                  <div className="col s2"><button data-target="modal1" onClick={()=>setAd3()} className="waves-effect waves-light btn blue right modal-trigger" style={{marginTop:"40px"}}>Add New</button></div>
              </div>
              <div className="row" style={{marginLeft:"20px"}}>
          <table className="striped">
        <thead>
          <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Date</th>
              <th>Room</th>
              <th>Type</th>
              <th>Category</th>
              <th>Region</th>
          </tr>
        </thead>

        <tbody>
            {ads.map(ad=>
                 <tr>
                 <td>{ad.id}</td>
                 <td>{ad.title}</td>
                 <td>{new Date(ad.date).toISOString().substr(0,10)}</td>
                 <td>{ad.room}</td>
                 <td>{ad.type.name}</td>
                 <td>{ad.category.name}</td>
                 <td>{ad.region.name}</td>
                 <td width="20%">
                    <button data-target="modal2" className="waves-effect waves-light btn green modal-trigger" onClick={()=>setAd2(ad)}>Edit</button>
                    <button data-target="modal3"  className="waves-effect waves-light btn red  modal-trigger" onClick={()=>setAd(ad)} style={{marginLeft:"10px"}}>Delete</button>
                 </td>
               </tr>
            )}
        
        </tbody>
      </table>




  <div id="modal1" class="modal modal-fixed-footer">
  <form onSubmit={addAdSubmit}>
    <div class="modal-content">
      <h4>Add Ad</h4>
      <br/>
      
          <div className="input-field">
          <input id="title" type="text" name="title" value={ad.title} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="title">Title</label>
          </div>
          <div className="input-field">
          <textarea id="textarea1" name="description" value={ad.description} onChange={handleAdDataChange} class="materialize-textarea"/>
          <label className="active" for="textarea1">Description</label>
          </div>
          <div className="input-field">
          <input id="date" type="date" name="date" value={new Date(ad.date).toISOString().substr(0,10)} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="date">Date</label>
          </div>
          <div className="input-field">
          <input id="room" type="number" name="room" value={ad.room} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="room">Room</label>
          </div>
          <div className="input-field">
          <input id="price" type="number" name="price" value={ad.price} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="price">Price</label>
          </div>
          <div className="input-field">
          <input id="image" type="text" name="image" value={ad.image} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="image">Image</label>
          </div>
          <div className="input-field">
          <select className="browser-default" value={ad.category} onChange={handleAdDataChange} name="category">
            {categories.map(category=>
              <option value={category.id}>{category.name}</option>
              )}
          </select>
          </div>

          <div className="input-field">
          <select className="browser-default" value={ad.type} onChange={handleAdDataChange} name="type">
            {types.map(type=>
              <option value={type.id}>{type.name}</option>
              )}
          </select>
          </div>

          <div className="input-field">
          <select className="browser-default" value={ad.region} onChange={handleAdDataChange} name="region">
            {regions.map(region=>
              <option value={region.id}>{region.name}</option>
              )}
          </select>
          </div>

      
      
    </div>
    <div class="modal-footer">
      <button  class="modal-close waves-effect waves-green btn green">Add New</button>
    </div>
    </form>
  </div>


  <div id="modal2"  class="modal modal-fixed-footer">
  <form onSubmit={editAdSubmit}>
    <div class="modal-content">
      <h4>Edit Ad</h4>
      <br/>
      
      <div className="input-field">
          <input id="title" type="text" name="title" value={ad.title} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="title">Title</label>
          </div>
          <div className="input-field">
          <textarea id="textarea1" name="description" value={ad.description} onChange={handleAdDataChange} class="materialize-textarea"/>
          <label className="active" for="textarea1">Description</label>
          </div>
          <div className="input-field">
          <input id="date" type="date" name="date" value={new Date(ad.date).toISOString().substr(0,10)} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="date">Date</label>
          </div>
          <div className="input-field">
          <input id="room" type="number" name="room" value={ad.room} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="room">Room</label>
          </div>
          <div className="input-field">
          <input id="price" type="number" name="price" value={ad.price} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="price">Price</label>
          </div>
          <div className="input-field">
          <input id="image" type="text" name="image" value={ad.image} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="image">Image</label>
          </div>
          <div className="input-field">
          <select className="browser-default" value={ad.category} onChange={handleAdDataChange} name="category">
          {categories.map(category=>
              <option value={category.id}>{category.name}</option>
              )}
          </select>
          </div>

          <div className="input-field">
          <select className="browser-default" value={ad.type} onChange={handleAdDataChange} name="type">
          {types.map(type=>
              <option value={type.id}>{type.name}</option>
              )}
          </select>
          </div>

          <div className="input-field">
          <select className="browser-default" value={ad.region} onChange={handleAdDataChange} name="region">
          {regions.map(region=>
              <option value={region.id}>{region.name}</option>
              )}
          </select>
          </div>
      
      
    </div>
    <div class="modal-footer">
      <button  class="modal-close waves-effect waves-green btn green">Edit</button>
    </div>
    </form>
  </div>



  <div id="modal3" style={{width:"500px",height:"300px"}} class="modal modal-fixed-footer">
  <form onSubmit={deleteAdSubmit}>
    <div class="modal-content">
      <h4>Delete Ad</h4>
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

export default AdminAd;