import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-materialize';
import M from 'materialize-css'
import { Link, Route,BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

function Carousell(props) {
  useEffect(() => {
    var elems = document.querySelectorAll('.carousel');
    
    var instances = M.Carousel.init(elems,
      {
      fullWidth: true,
      indicators: true
    });
  }, []);

    return (
      <div className="carousel carousel-slider center" style={{height:"303px"}}>
        <div className="carousel-fixed-item center">
          <Link to="/register" className="btn waves-effect waves-red white black-text darken-text-2">Register Now</Link>
        </div>
        <div className="carousel-fixed-item white-text" style={{marginBottom:"150px"}}>
          <center><h4 style={{backgroundColor:"#283593 ",width:"fit-content",paddingLeft:"10px",paddingRight:"10px",height:"50px",paddingTop:"7px",paddingBottom:"10px",fontWeight:"bold"}}>Manage with your tasks</h4></center>
        </div>
        <div className="carousel-item white-text" href="#one!">
         <img src="/img/1.jpeg"/>
        </div>
        <div className="carousel-item white-text" href="#two!">
        <img src="/img/1.jpeg"/>
        </div>
        <div className="carousel-item white-text" href="#three!">
        <img src="/img/1.jpeg"/>
        </div>
        <div className="carousel-item white-text" href="#four!">
        <img src="/img/1.jpeg"/>
        </div>
    </div>
    );
}

export default Carousell;