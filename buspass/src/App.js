import React from "react";
import StartPage from "./components/startPage";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/login";
// import axios from "axios";
function App() {

  


  return (
    
     

      <BrowserRouter>
           {/* <center><h1>WELCOME TO GOVERNMENT BUS SURVICES</h1></center> */}
           
           <Routes>
                <Route path='/Home' element={<Home />}></Route>
                <Route path='/login' element={<LogIn />}></Route>
                <Route path='/' element={<StartPage />}></Route>    
           </Routes>
           
          
          
      </BrowserRouter>
  
  )
}

export default App;