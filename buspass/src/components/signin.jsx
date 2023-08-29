import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";



function SignIn(){

    const [data,setData] = React.useState({username:"",passward:"",phone:""});
    const navigate = useNavigate();

    async function Sign(event){
           event.preventDefault();

           const obj = await axios.post("/signin",data);

           console.log("obj:",obj);

           if (obj.data.Status==='success') {
               navigate("/login");
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
            <form onSubmit={Sign}>

                    <label>Username <input type='text' onChange={Fun1} name='username' placeholder="Enter username" /> </label> <br></br>
                    <label>Password <input type='text' onChange={Fun1} name='passward' placeholder="Enter passward" /> </label> <br></br>
                    <label>Phone <input type='text' onChange={Fun1} name='phone' placeholder="Enter phone number" /> </label> <br></br>
                    <input type="submit" className="btn"></input>
                        <br></br>
                    
            </form>

            
         </div>
    )
}

export default SignIn;