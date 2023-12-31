import Footer from "./footer";
import React, { useEffect } from "react";
import axios from "axios";
import Sidebar from "./sidebar";
import {  Outlet, json, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Navigate } from "react-router";


import 'react-toastify/dist/ReactToastify.css';

let location,Name,profilePic="";


function Home() {

    // const [data, setData] = React.useState({ name: "", age: "", source: "", destination: "", adhar: "", lightbill: "", passform: "" });

    const [profile, setprofile] = React.useState(("https://tse1.mm.bing.net/th?id=OIP.SxuyKL-Ca-_bXp1TC4c4-gHaF3&pid=Api&rs=1&c=1&qlt=95&w=148&h=117"));
    location = useLocation();
    
    useEffect(()=>{
        
        console.log("form useEffect");
        setTimeout(async() => {
            
            let data = window.localStorage.getItem('data');
            data = JSON.parse(data);
         
            Name=data[0];
            profilePic=data[1];
            
            setprofile(profilePic);
   
        }, 0);
    },[])

    async function setpic(event) {
        event.preventDefault();

        const profilePic = event.target.files[0];
       
        await convertImg(profilePic).then(async(result) => {
            setprofile(result);
            console.log("result :",result);
            const picResult = await axios.post('/profile',{profile:result,username:{Name}});
        })
            .catch((err) => { console.log("errr:", err) })
    }

    return (

        <div id='Home'>

            <div id="header">
               <h2 style={{color:"white"}}>WELCOME TO GOVERNMENT BUS SERVICES</h2>
            </div>
           
           <div id="user">
            <label htmlFor="profile"  >
                    <img id="profile-img" src={profile} alt="profile"></img>
                </label>

                <input style={{ display: "none" }} type="file" id="profile" onChange={setpic}></input>

                <h3>Hii {Name} thanks for visiting our website</h3>
            
            </div>

            <div id="sidebar">
           
                  <Link to="verify">verification</Link>
                  <Link to="renew">Renew</Link>
       
          </div>
          <Outlet></Outlet>

            
            <Footer></Footer>


        

        </div>

    )

}

export default Home;

function convertImg(file) {
    return new Promise((resolve, reject) => {
        
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result)
        };

        fileReader.onerror = (error) => {
            reject(error);
        }

    })
}
