import React from 'react';
import { Button, Icon, TextInput } from 'react-materialize';
import { Link } from 'react-router-dom';

function Card(props) {

  

  var date = new Date(props.card.date);

    return (
        <div className="col s4">
          <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
              <img className="activator" src="images/office.jpg"/>
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
              <p><a href="#">This is a link</a></p>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
              <p>Here is some more information about this product that is only revealed once clicked on.</p>
            </div>
          </div>
      </div>  
    );
}

export default Card;