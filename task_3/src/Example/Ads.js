import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Ads(props) {

        return (
            <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
              <img className="activator" src={props.ad.image}/>
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">{props.ad.price} KZT<i class="material-icons right">more_vert</i></span>
              
              <span>{props.ad.description}</span>
              <p>{props.ad.price}</p>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
              <p>Here is some more information about this product that is only revealed once clicked on.</p>
            </div>
            <div className="card-action">
            <Link to={`/adsDetails/${props.ad.id}`} >Read More</Link>
            </div>
          </div>
          
        );
    }

export default Ads;