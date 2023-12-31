import React from "react";
import LogIn from "./login";
import SignIn from "./signin";
import { useEffect } from "react";


function StartPage(){

     let [newUser,setpage] = React.useState(null);

     let [component,setComponent] = React.useState(null);

     useEffect(()=>{
       
               
                //  window.location.reload(1);
                 window.localStorage.setItem('data',["",""]);
        
     },[newUser])
     
     function user(arg1){
          setpage(newUser=arg1);

          console.log(newUser);

          (newUser) ? setComponent(<SignIn></SignIn>) : setComponent(<LogIn></LogIn>)
     }


     return (
         <div id='start-page'>
             <div id='startbtn'>
             <button onClick={()=>{user(false)}} className="startbtn">Already hava an Account</button>
             <button onClick={()=>{user(true)}} className="startbtn">New user</button></div>
             {component}
         </div>
     )

}

export default StartPage;