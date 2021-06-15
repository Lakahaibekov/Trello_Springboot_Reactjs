import React, { Component, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, Route,BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Carousel from './Carousell';
import Ads from './Ads';
import Content from './Content';
import CreateAccount from './CreateAccount';
import Details from './Details';
import Home from './Home';
import SignIn from './SignIn';
import UpdateProfile from './UpdateProfile';
import HomePage from './HomePage';
import AdminCategory from './AdminCategory';
import AdminType from './AdminType';
import AdminRegion from './AdminRegion';
import AdminRole from './AdminRole';
import AdminAd from './AdminAd';
import AllAds from './AllAds';
import AdDetails from './AdDetails';


export const UserContext = React.createContext();

function Navbar(props) {

const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

const [isOnline, setIsOnline] = useState(false);
const [remember, setRemember] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [fullName, setFullName] = useState("");
const [id, setId] = useState(0);
const [roles,setRoles] = useState([{}]);


const handleFullNameChange = event =>{
  setFullName(event.target.value);
}

const handleEmailChange = event =>{
  setEmail(event.target.value);
}

const handleIsOnline = event =>{
  setIsOnline(event.target.value);
}

const handlePasswordChange = event =>{
  setPassword(event.target.value);
}

const handleRememberChange = event =>{
  setRemember(!remember);
}

function logout(){
  if(!remember){
    setEmail("");
    setPassword("");
    setFullName("");
    removeCookieJWT("jwt");
  }
  setIsOnline(false);
}

async function profile(){
  if(cookieJWT['jwt']!=null){
  const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
  const response = await fetch("http://localhost:8000/api/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization":bearer,
    },
  });
  if(response.status==200){
      let userData = await response.json();
      console.log(userData);
      setEmail(userData.email);
      setFullName(userData.fullName);
      setIsOnline(true);
      setRoles(userData.roles);


  }else{
      console.log("404 ITEM NOT FOUND");
  }
}
}

        return (<Router>

        
        <header className="row">

       
        <nav className="amber darken-2" role="navigation">
                    <div className="nav-wrapper container">
                    <Link to="/" id="logo-container" className="brand-logo" style={{fontWeight:"bold"}}><i class="material-icons">home</i>KRISHA</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {roles[0].role=="ROLE_ADMIN"?<li><Link to="/AdminAd">Admin</Link></li>:""}
                        {isOnline?<li><Link to="/allAds">All Ads</Link></li>:""}
                        {isOnline?<li><Link data-target="modal1" className="modal-trigger" to="#">Post and Ad</Link></li>:""}
                        {isOnline?"":<li><Link to="/register">Register</Link></li>}
                        {isOnline?"":<li><Link to="/login">Login</Link></li>}
                        {isOnline?<li><Link to="/profile">{fullName}</Link></li>:""}
                        {isOnline? <li><Link to="/logout" onClick={logout} >Logout</Link></li>:""}
                       
                    </ul>
                    </div>
            </nav>
            </header>
            <main style={{minHeight:"55vh"}}>
            <UserContext.Provider value={{
               remember,
               isOnline, 
               email,
               password,
               fullName,
               handleFullNameChange:handleFullNameChange,
               handleEmailChange:handleEmailChange,
               handlePasswordChange:handlePasswordChange,
               setIsOnline:setIsOnline,
               handleRememberChange:handleRememberChange,
               setEmail:setEmail,
               setPassword:setPassword,
               setFullName:setFullName,
               profile:profile,
               cookieJWT,
               setCookieJWT,
               removeCookieJWT
              }
            }>
            <Switch>
           
              <Route path={`/details/:cardId`}>
                <Details/>
              </Route>
              
             <Route path="/login">
             {isOnline?<Redirect to="/allAds"/>:
                <SignIn/>}
              </Route>
              <Route path="/register">
                <CreateAccount/>
              </Route>
              <Route path="/allCards">
                <Content/>
              </Route>
              <Route path="/profile">
                <UpdateProfile/>
              </Route>

              <Route path="/adminCategory">
                <AdminCategory/>
              </Route>
              <Route path="/adminType">
                <AdminType/>
              </Route>

              <Route path="/adminRegion">
                <AdminRegion/>
              </Route>

              <Route path="/adminRole">
                <AdminRole/>
              </Route>

              <Route path="/adminAd">
                <AdminAd/>
              </Route>

              <Route path="/allAds">
                <AllAds/>
              </Route>

              <Route path={`/adsDetails/:advertId`}>
              <AdDetails/>
              </Route>

              <Route path="/">
                <Home/>
              </Route>

            
            </Switch>
            </UserContext.Provider>
            </main>
            </Router>
            

            
        );
    }

export default Navbar;






