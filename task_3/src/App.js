import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar'
import 'materialize-css';
import './materialize/css/materialize.css';
import CardDetails from './Components/CardDetails';
import Content from './Components/Content';
import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import TaskDetails from './Components/TaskDetails';
import Home from './Components/Home';
import CreateAccount from './Components/CreateAccount';
import SignIn from './Components/SignIn';
import UpdateProfile from './Components/UpdateProfile';


export const UserContext = React.createContext();

function App() {

  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

    const [isOnline, setIsOnline] = useState(false);
    const [remember, setRemember] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [id, setId] = useState(0);


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
           
      
      
        }else{
            console.log("404 ITEM NOT FOUND");
        }
      }
      }





  return (
    <div >
      <Router>
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
                logout:logout,
                cookieJWT,
                setCookieJWT,
                removeCookieJWT
                }
              }>
        <Navbar/>
        <div className="container">

          



            <Switch>
              <Route path="/profile">
                <UpdateProfile/>
              </Route>
              <Route path = "/allcards">
                <Content/>
              </Route>
              <Route path = "/login">
                {isOnline?<Redirect to="/allcards"/>:
                  <SignIn/>}
              </Route>
              <Route path = "/register">
                <CreateAccount/>
              </Route>
              <Route path = {`/carddetails/:cardId`}>
                  <CardDetails />
              </Route>
              <Route path = {`/taskdetails/:taskId`}>
                  <TaskDetails />
              </Route>
              <Route path="/">
                <Home/>
              </Route>
              
              
              
              
              
            </Switch>
          
        </div>
        </UserContext.Provider>

        
      </Router>
    </div>
  );
}

export default App;
