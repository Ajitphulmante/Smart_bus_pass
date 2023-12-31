import React from "react";
import { Link, Outlet } from "react-router-dom";



function Sidebar(){
     return (
          <div id="sidebar">
               
                 
                  <Link to="verify">verification</Link>
                  <Link to="renew">Renew</Link>
                  
                  <Outlet></Outlet>
          </div>
     )
}

export default Sidebar;