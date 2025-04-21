import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";

import {Registration} from "./components/Registration.js";
import {Login} from "./components/Login.js";
import {UsersList} from "./components/usersList.js";
import {UserProfile} from "./components/UserProfile.js";
import {Home} from "./components/Home.js";
import {UpdateProfile} from "./components/UpdateProfile.js";

import {ProductList} from "./components/Product/ProductList.js";
import {AddProduct} from "./components/Product/AddProduct.js";
import {UpdateProduct} from "./components/Product/UpdateProduct.js";
import {AddCategory} from "./components/Category/AddCategory.js";

import './App.css';

function App() {
  return (
    <>
      <Routes>
    
    <Route path="/" element={<Registration/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/userslist" element={<UsersList/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/profile/:id" element={<UserProfile/>}/>
      <Route path="/update/:id" element={<UpdateProfile/>}/>

      <Route path="/productlist" element={<ProductList/>}/>
      <Route path="/updateProduct/:id" element={<UpdateProduct/>}/>
      <Route path="/update/:id" element={<UpdateProfile/>}/>
      <Route path="/addProduct" element={<AddProduct/>}/>
      <Route path="/addCategory" element={<AddCategory/>}/>
      </Routes>
    </>
  );
}

export default App;