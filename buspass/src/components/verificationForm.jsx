import React from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

function VerificationForm() {

    const [data, setData] = React.useState({ name: "", age: "", source: "", destination: "", adhar: {}, lightbill: {}, passform: {} });
    
    async function verify(event) {
        event.preventDefault();
        console.log("data :",data);
    
        const formData = new FormData;
        
        formData.append("name",data.name)
        formData.append("age",data.age)
        formData.append("source",data.source)
        formData.append("destination",data.destination)
        formData.append("adhar",data.adhar)
        formData.append("lightbill",data.lightbill)
        formData.append("passform",data.passform)

        console.log("adhar:",data.adhar);

        const res = await axios.post('/validate', formData ,{
            headers : {
                'Content-Type' : "multipart/form-data",
            },
        });

        if (res.data.Status === 'success') { 
            alert("Form submitted successfully");
            event.target.reset()
         }
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

    function Fun2(event) {

        const target = event.target;

        setData(prev => {

            return {
                ...prev,
                [target.name]: target.files[0]
            }

        })
    }

  return (
    <div id="options">

                

                    <form id="verification1" onSubmit={verify}>
                    <h2>Document Verification</h2>
                        <label>Name : <input onChange={Fun1} type="text" placeholder="Enter name" name="name" content={data.name} required ></input></label>
                        <label>Age : <input onChange={Fun1} type="text" placeholder="Enter Age" name="age" value={data.age} required></input></label>
                        <label>Sourse : <input onChange={Fun1} type="text" placeholder="Enter source point" name="source" required></input></label>
                        <label>Destination: <input onChange={Fun1} type="text" placeholder="Enter destination point" name="destination" required></input></label>
                        <label>Adhar card : <input onChange={Fun2} type="file" name="adhar" required></input></label>
                        <label>Light bill  : <input onChange={Fun2} type="file" name="lightbill" required></input></label>
                        <label>Pass form : <input onChange={Fun2} type="file" name="passform" required></input></label>

                        <input className="btn" type="submit"></input>
                        <input className="btn" type="reset"></input>
                    </form>

                </div>
  )
}

export default VerificationForm;

function convert(file){

    return new Promise((resolve,reject)=>{
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
  
        fileReader.onload= ()=>{
            console.log("onload:",fileReader.result);
            resolve(fileReader.result)}
        fileReader.rejecct = (error)=>{reject(error)}
    })
}
