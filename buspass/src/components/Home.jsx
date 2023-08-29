import Footer from "./footer";
import React, { useEffect } from "react";
import axios from "axios";
import { Location, useLocation } from "react-router";


import 'react-toastify/dist/ReactToastify.css';

let location,Name,profilePic="";

function Home() {

    const [data, setData] = React.useState({ name: "", age: "", source: "", destination: "", adhar: "", lightbill: "", passform: "" });

    const [profile, setprofile] = React.useState(("https://tse1.mm.bing.net/th?id=OIP.SxuyKL-Ca-_bXp1TC4c4-gHaF3&pid=Api&rs=1&c=1&qlt=95&w=148&h=117"));
    location = useLocation();
    
    useEffect(()=>{
        
        console.log("form useEffect");
        setTimeout(() => {
            

            console.log("location",location);
            
             Name = location.state.username;
             profilePic = location.state.profile;

             
            if (profilePic!=="") setprofile(profilePic);
    
            
        }, 1);
    })

  

    const Fun2 = ()=>{
         location = useLocation();

        console.log("location",location);
        
         Name = location.state.username;
         profilePic = location.state.profile;

         if (profilePic!=="") setprofile(profilePic);

    }

    
   



    async function verify(event) {
        event.preventDefault();
        //  console.log("data :",data);

        const res = await axios.post('/validate', { data });

        if (res.data.Status === 'success') { event.target.reset() }
        else (console.log("failed to validate"))


        console.log("result :", res);



    }

    function Fun1(event) {

        const target = event.target;

        setData(prev => {

            return {
                ...prev,
                [target.name]: target.value
            }

        })
    }

    async function setpic(event) {
        event.preventDefault();

        const profilePic = event.target.files[0];
        console.log("profile:", profilePic);
        await convertImg(profilePic).then(async(result) => {
            console.log("result:", result);
            setprofile(result);

            const picResult = await axios.post('/profile',{profile:result,username:Name});
            console.log("picc:",picResult);


        })
            .catch((err) => { console.log("errr:", err) })

    }

    return (

        <div id='Home'>

            


            <div id="header">

               <h2>WELCOME TO GOVERNMENT BUS SERVICES</h2>

            </div>
           
           <div id="user">
            <label htmlFor="profile"  >
                    <img id="profile-img" src={profile} alt="profile"></img>
                </label>

                <input style={{ display: "none" }} type="file" id="profile" onChange={setpic}></input>

                <h3>Hii {Name} thanks for visiting our website</h3>
            
            </div>

            <div id="options" >

                <div>

                    <h2>Document Verification</h2>

                    <form id="verification" onSubmit={verify}>
                        <label>Name : <input onChange={Fun1} type="text" placeholder="Enter name" name="name" content={data.name} required></input></label>
                        <label>Age : <input onChange={Fun1} type="text" placeholder="Enter Age" name="age" value={data.age} required></input></label>
                        <label>Sourse : <input onChange={Fun1} type="text" placeholder="Enter source point" name="source" required></input></label>
                        <label>Destination: <input onChange={Fun1} type="text" placeholder="Enter destination point" name="destination" required></input></label>
                        <label>Adhar card : <input onChange={Fun1} type="file" name="adhar" ></input></label>
                        <label>Light bill  : <input onChange={Fun1} type="file" name="lightbill" ></input></label>
                        <label>Pass form : <input onChange={Fun1} type="file" name="passform" ></input></label>

                        <input className="btn" type="submit"></input>
                        <input className="btn" type="reset"></input>
                    </form>

                </div>


                <div>
                    <h2>Renew the Pass</h2>

                    <form id="verification">
                        <label>User Id : <input type="file" required ></input></label>
                        <input className="btn" type="submit"></input>
                    </form>
                </div>
            </div>

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
