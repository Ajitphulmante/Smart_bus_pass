// import {Link} from "react-router-dom";
// import { BrowserRouter } from 'react-router-dom';

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";



function LogIn(){

   
    const [error,seterror] = React.useState("");
    const [values,setValues] = React.useState({username:"",passward:""});
    const navigate = useNavigate();

   async function Validate(event){
        event.preventDefault();
        console.log("event:",values);
        const res = await axios.post("/login",values);
        console.log("res:",res);


        

        if (res.data.Status==='failure') seterror("Username or Passward is wrong");
        else navigate('/Home',{ state :{username:values.username,profile:res.data.profile}});

    }

    function Fun1(event){
        const id =event.target.name;
        setValues(prev =>{
             
            if (id==="username"){
                 return ({
                    username : event.target.value,
                    passward : prev.passward
                 })
            }

            else {
                return ({
                    username : prev.username,
                    passward : event.target.value
                 })
            }
        }
     )}

    return (
         <div id='container'>
             <div style={{color:"red"}}>{error}</div>
            <form onSubmit={Validate}>

                    <label>Username <input type='text' name='username' onChange={Fun1} placeholder="Enter username" /> </label> <br></br>
                    <label>Password <input type='text' name='passward' onChange={Fun1}placeholder="Enter passward" /> </label> <br></br>
                    <input type="submit" className="btn"></input>
                        <br></br>    
            </form>

            
         </div>
    )
}

export default LogIn;