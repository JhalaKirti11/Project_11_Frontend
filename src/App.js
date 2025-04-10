import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";

import {Registration} from "./components/Registration.js";
import {Login} from "./components/Login.js";
import {UsersList} from "./components/UsersList.js";
import {UserProfile} from "./components/UserProfile.js";

import './App.css';

function App() {
  return (
    <>
      <Routes>
    
    <Route path="/" element={<Registration/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/userslist" element={<UsersList/>}/>
      <Route path="/profile/:id" element={<UserProfile/>}/>
      </Routes>
    </>
  );
}

export default App;
