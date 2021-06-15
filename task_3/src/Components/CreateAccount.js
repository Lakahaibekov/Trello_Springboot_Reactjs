import React, { useContext, useEffect, useState } from 'react';
import M from 'materialize-css'
import { UserContext } from '../App';

function CreateAccount(props) {
    const context = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = event =>{
        if(event.target.name=="full_name"){
            setFullName(event.target.value);
        }
        else if(event.target.name=="email"){
            setEmail(event.target.value);
        }
        else if(event.target.name=="password"){
            setPassword(event.target.value);
        }
        else if(event.target.name=="re_password"){
            setRePassword(event.target.value);
        }
      }





      useEffect(() => {
        M.updateTextFields();

      }, []);



      const handleSubmit = event =>{
        const inputData = {email,password,fullName}
        if(password != repassword){
            M.toast({html: "<i class='small material-icons left'>warning</i><strong>Wrong Re-Password </strong>",classes: 'center yellow darken-4 rounded'});
      
        }else{
            if(email=="" || password=="" || fullName==""){
                M.toast({html: "<i class='small material-icons left'>warning</i><strong>You must fill in all the fields</strong>",classes: 'center yellow darken-4 rounded'});
            }
            else{
                addUser(inputData);
            }
           
        }
      
        
        event.preventDefault();
    
    
      }
    
    
      async function addUser(data){
        const response = await fetch("http://localhost:8000/api/registr", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data)
        });
        if(response.status==200){
           // let messData = await response.json();
            //setMessage(messData.id? "Data Added : " : "Error");
            //console.log(messData);
            M.toast({html: "<i class='small material-icons left'>check</i><strong>You have successfully registered!</strong>",classes: 'green darken-1 rounded',marginRight:"150px"});
            setEmail("");
            setPassword("");
            setRePassword("");
            setFullName("");
        
        }else{
            M.toast({html: "<i class='small material-icons left'>error</i><strong>This user already exists!</strong>",classes: 'red red-1 rounded',marginRight:"150px"});
        }
       
      }

    return (
        <div className="container">
            <div className="row">

                
                <div className="col s6 offset-s3">
                <blockquote>
              <h5>Create New Account</h5>
                </blockquote>
                </div>
                <form className="col s6 offset-s3" onSubmit={handleSubmit}>
                    <div className="input-field row">
                    <i className="large material-icons prefix" style={{color:"#01579b"}}>account_circle</i>
                    <input id="full_name" name="full_name" value={fullName} onChange={handleChange} type="text" className="validate"/>
                    <label className="active" for="full_name">Full Name</label>
                    <span class="helper-text" data-error="wrong" data-success="right"></span>
                    </div>
                    <div className="input-field row">
                    <i className="material-icons prefix" style={{color:"#01579b  "}}>email</i>
                    <input id="email" type="email" name="email" value={email} onChange={handleChange} className="validate"/>
                    <label className="active" for="email">Email</label>
                    <span class="helper-text" data-error="wrong" data-success="right"></span>
                    </div>
                    <div className="input-field row">
                    <i className="material-icons prefix" style={{color:"#01579b  "}}>https</i>
                    <input id="password" type="password" name="password" value={password} onChange={handleChange} className="validate"/>
                    <label className="active" for="password">Password</label>
                    <span class="helper-text" data-error="wrong" data-success="right"></span>
                    </div>
                    <div className="input-field row">
                    <i className="material-icons prefix" style={{color:"#01579b  "}}>https</i>
                    <input id="re_password" type="password" name="re_password" value={repassword} onChange={handleChange} className="validate"/>
                    <label className="active" for="re_password">Repeat Password</label>
                    <span class="helper-text" data-error="wrong" data-success="right"></span>
                    </div>
                    
                <div className="row" >
                    <label style={{marginLeft:"6px"}}>
                        <input type="checkbox" />
                        <span>I have read and accepted the terms and conditions</span>
                    </label>
                    </div>
                    <div className="input-field row">
                    <button className="btn waves-effect waves-light indigo darken-3 right"><i className="material-icons right">send</i>Register</button>
                </div>
                </form>
            </div>

   
        </div>
    );
}

export default CreateAccount;