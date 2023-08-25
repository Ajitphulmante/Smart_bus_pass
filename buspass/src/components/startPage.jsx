import React from "react";
import LogIn from "./login";
import SignIn from "./signin";


function StartPage(){

     let [newUser,setpage] = React.useState(null);

     let [component,setComponent] = React.useState(null);
     
     function user(arg1){
          setpage(newUser=arg1);

          console.log(newUser);

          (newUser) ? setComponent(<SignIn></SignIn>) : setComponent(<LogIn></LogIn>)
     }


     return (
         <div>
             <div id='startbtn'>
             <button onClick={()=>{user(false)}} className="startbtn">Already hava an Account</button>
             <button onClick={()=>{user(true)}} className="startbtn">New user</button></div>
             {component}
         </div>
     )

}

export default StartPage;