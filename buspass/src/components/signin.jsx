import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";




function SignIn(){

    const [data,setData] = React.useState({username:"",passward:"",phone:""});
    const [msg,setMsg] = React.useState("");
    const navigate = useNavigate();

    async function Sign(event){
           event.preventDefault();

           const obj = await axios.post("/signin",data);

           if (obj.data.Status==='exits'){
                   setMsg("UserName is already exits try another one");
           }

           else if (obj.data.Status==='success') {
                event.target.reset();
                alert("account has been create successfully, you can now login")
                setTimeout(2000);
                navigate("/")
           }
           else {
               console.log("Failed to signup please, try again");
           }
    }

    function Fun1(event){

        const target = event.target;

        setData(prev =>{

            return {
                ...prev,
                [target.name] : target.value
            }
        })
    }
    



    return (
         <div id='container'>
             <h1 style={{color:"red"}}>{msg}</h1>
            <form onSubmit={Sign}>

                    <label>Username <input type='text' onChange={Fun1} name='username' placeholder="Enter username" /> </label> <br></br>
                    <label>Password <input type='text' onChange={Fun1} name='passward' placeholder="Enter passward" /> </label> <br></br>
                    <label>E-mail <input type='text' onChange={Fun1} name='email' placeholder="Enter email" /> </label> <br></br>
                    <label>Phone <input type='text' onChange={Fun1} name='phone' placeholder="Enter phone number" /> </label> <br></br>
                    <input type="submit" className="btn"></input>
                        <br></br>
                    
            </form>

            
         </div>
    )
}

export default SignIn;