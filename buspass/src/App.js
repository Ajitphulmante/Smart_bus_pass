import React from "react";
import StartPage from "./components/startPage";
// import axios from "axios";
function App() {

  // const [backenddata, setbackEnd] = React.useState([{}]);

  // axios.get("/api").then((response)=>{
  //   if (response.status===200){
  //       setbackEnd(response.data)
  //   }
  // })





  return (
    <div>
      <center><h1>WELCOME TO GOVERNMENT BUS SURVICES</h1></center>
      <StartPage></StartPage>

      {/* {
        backenddata.user === undefined ? <h1>Loading....</h1> :
          backenddata.user.map((user, i) => (
            <p key={i}>{user}</p>
          ))
      } */}
    </div>
  )
}

export default App;