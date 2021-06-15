import React from 'react';

function Card(props) {
    return (
        <div className="col s4">
            <div className="card">
                <div className="card-content">
                    <h4>{props.cards.name}</h4>
                    <a className="card-title activator grey-text text-darken-1" href={`/carddetails/${props.cards.id}`}>Details<i className="material-icons right">more_vert</i></a>
                    <span><small>{props.cards.addedDate}</small></span>
                </div>
               
            </div>
        </div>
    );
}

export default Card;