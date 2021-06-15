import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from './Navbar';

function AdDetails(props) {

    const context = useContext(UserContext);
    let {advertId} = useParams();

    const [ad,setAd] = useState({
        id:0,
        title:"",
        description:"",
        date:new Date().toISOString().substr(0,10),
        room:1,
        price:0,
        image:"",
        type:{},
        category:{},
        region:{}
      });


      useEffect(() => {
        context.profile();
        getAd();
      }, []);


      async function getAd() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/getPost/"+advertId,{
          method:"GET",
        headers: {
          "Authorization":bearer,
          'Content-Type': 'application/json',
        },
           }
        );
        if(response.status==200){
        let Data = await response.json();
        setAd(Data);
        console.log(Data);
        }  else{
            alert("404");
        }
      };

    return (
        <div className="container">
            <div className="row">
                <div className="col s6">
                   <img src={ad.image} style={{width:"500px"}}/>
                </div>
                <div className="col s6">

                <div class="card ">
        <div class="card-content">
          <span class="card-title">{ad.title}</span>
          <p>{ad.description}</p><br/>
          <p>Room Number : {ad.room}</p><br/>
          <p>Price : {ad.price} KZT</p><br/>
          <p>Type : {ad.type.name}</p><br/>
          <p>Category : {ad.category.name}</p><br/>
          <p>Region : {ad.region.name+" "+ad.region.code}</p><br/>

        </div>
        <div class="card-action">
          <a href="#">Add to Favorite</a>
          <a href="#">This is a link</a>
          <span className="right">{new Date(ad.date).toLocaleDateString()}</span>
        </div>
      </div>
                </div>
            </div>
        </div>
    );
}

export default AdDetails;