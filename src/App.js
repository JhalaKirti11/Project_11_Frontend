import { Routes, Route } from "react-router-dom";

import { Registration } from "./Components/Registration.js";
import { Login } from "./Components/Login.js";
import { UsersList } from "./Components/UsersList.js";
import { UserProfile } from "./Components/UserProfile.js";
import { Home } from "./Components/Home.js";
import { UpdateProfile } from "./Components/UpdateProfile.js";

import { ProductList } from "./Components/Product/ProductList.js";
import { AddProduct } from "./Components/Product/AddProduct.js";
import { UpdateProduct } from "./Components/Product/UpdateProduct.js";
import { AddCategory } from "./Components/Category/AddCategory.js";

import {TextEditor} from './Components/TextEditorPage/TextEditor.js';
import {Editor} from './Components/TextEditorPage/Editor.js';

import {Message} from './Components/Chatting/Message.js';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userslist" element={<UsersList />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/update/:id" element={<UpdateProfile />} />

        <Route path="/productlist" element={<ProductList />} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />
        <Route path="/update/:id" element={<UpdateProfile />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/addCategory" element={<AddCategory />} />

        <Route path='/textEditor' element={<TextEditor/>}/>
        <Route path='/tiptapEditor' element={<Editor/>}/>

        <Route path='/chat' element={<Message/>}/>

      </Routes>
    </>
  );
}

export default App;