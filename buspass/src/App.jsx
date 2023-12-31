import React, { useEffect } from "react";
import StartPage from "./components/startPage";
import { BrowserRouter, Route, Routes, useParams, Outlet } from "react-router-dom"; // Note the imports
import Home from "./components/Home";
import LogIn from "./components/login";
import VerificationForm from "./components/verificationForm";
import RenewForm from "./components/renewForm";
import axios from "axios";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/:data/verify" element={<LogIn />} />
          <Route path="/Home" element={<Home />}>
            <Route path="verify" element={<VerificationForm />} />
            <Route path="renew" element={<RenewForm />} />
          </Route>
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
