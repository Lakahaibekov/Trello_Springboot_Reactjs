import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './Navbar';
import M from 'materialize-css'
import Ads from './Ads';
function AllAds(props) {
    const [data, setData] = useState([]);
    const context = useContext(UserContext);
    const [categories,setCategories] = useState([]);
    const [regions,setRegions] = useState([]);
    const [types,setTypes] = useState([]);
    const [newId,setNewId] = useState(0);
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

  
    async function loadData() {
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
      let Data = await response.json();
      setData(Data);
     
    }

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

    useEffect(() => {
        loadCategories();
        loadRegions();
        loadTypes();
      loadData();
      context.profile();

      var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});

    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
     
    }, [newId]);


    return (
        <div className="container">
            <div className="row" >
            <div class="card amber darken-2">
        <div class="card-content white-text" style={{padding:"0"}}>
        <div className="row" style={{marginBottom:"0"}}>
        <div className="input-field col s2">
          <select className="browser-default" name="type">
            {types.map(type=>
              <option value={type.id}>{type.name}</option>
              )}
          </select>
          </div>

          <div className="input-field col s2">
          <select className="browser-default" name="category">
            {categories.map(category=>
              <option value={category.id}>{category.name}</option>
              )}
          </select>
          </div>

          <div className="input-field col s2">
          <select className="browser-default" name="region">
            {regions.map(region=>
              <option value={region.id}>{region.name}</option>
              )}
          </select>
          </div>

          <div className="input-field col s2">
                    <select className="browser-default">
                        <option value="1">any room</option>
                        <option value="1">1 room</option>
                        <option value="1">1-2 rooms</option>
                        <option value="1">2 rooms</option>
                        <option value="1">2-3 rooms</option>
                    </select>
                    </div>

                    <div className="input-field col s1">
                    <input className="center" type="text" name="from" placeholder="from" style={{backgroundColor:"white",fontWeight:"bold"}}/>
                    </div>
                    <div className="input-field col s1">
                    <input className="center" type="text" name="to" placeholder="to" style={{backgroundColor:"white",fontWeight:"bold"}}/>
                    </div>
        </div>
        <div className="row">
        <div className="input-field col s2">
        <label htmlFor="check1">
        <input id="check1" type="checkbox" style={{backgroundColor:"white",fontWeight:"bold"}} class="white" />
        <span className="white-text">has photo</span>
      </label> 
      </div>

      <div className="input-field col s3">
        <label>
        <input type="checkbox" style={{backgroundColor:"white",fontWeight:"bold"}} class="white" />
        <span className="white-text">from trusted agencies</span>
      </label> 
      </div>

      <div className="input-field col s2">
        <label>
        <input type="checkbox" style={{backgroundColor:"white",fontWeight:"bold"}} class="white" />
        <span className="white-text">from the owners

</span>
      </label> 
      </div>

      <div className="input-field col s2">
        <button className="btn">Search</button>
      </div>
        </div>
        </div>
      </div>
            </div>




<div className="row">
    {data.map(ad=>
    <div className="col s3">
<Ads key={ad.id} ad={ad}/>
        </div>
        
        )}
</div>

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

        </div>
    );
}

export default AllAds;