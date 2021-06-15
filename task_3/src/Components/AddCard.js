import React, {useState} from 'react';

function AddCard(props) {

    


    return (
        <div>
            <h2>{props.message}</h2>
            <div className="card">
                <form onSubmit={props.handleSubmit}>
                    <div className="row">
                        <div className="card-content">
                            <div >
                                <input type="text" className="validate" placeholder="Create new card" value={props.name} onChange={props.handleNameChange}/>
                                <input type="hidden" className="validate" value={props.addedDate} onChange={props.handleAddedDateChange}/>
                                <button className="btn waves-effect waves-light" type="submit" name="action">Add Card<i class="material-icons right">send</i></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCard;