import React, {useState, useEffect, useContext} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { UserContext } from '../App';

function Navbar(props) {

    const context = useContext(UserContext);


    return (
        <div>
            <nav style={{backgroundColor:'#084F8F', color: "#FFFFFF", height: "60px"}}>
                <div className="container nav-wrapper" >
                    <Link to ='/' className="brand-logo">ITrello</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {context.isOnline?<li><Link to="/allcards">All Cards</Link></li>:""}
                        {context.isOnline?"":<li><Link to="/register">Register</Link></li>}
                        {context.isOnline?"":<li><Link to="/login">Login</Link></li>}
                        {context.isOnline?<li><Link to="/profile">{context.fullName}</Link></li>:""}
                        {context.isOnline? <li><Link to="/logout" onClick={context.logout} >Logout</Link></li>:""}
                    </ul>
                </div>
            </nav>
        </div>

        
    );
}

export default Navbar;