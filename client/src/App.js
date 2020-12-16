import React,{useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import Login from './components/Login'
import Signup from './components/Signup'
import Addprod from './components/Addprod'
import Home from './components/Home'
import ProdDetail from "./components/ProdDetail"
import Buynow from './components/Buynow'
import UserHome from './components/UserHome'
import BasketDetail from './components/BasketDetail'

import {ProductProvider} from './contexts/ProductsContext'
import './App.css';

function App() {

  return (
    <BrowserRouter>
    <ProductProvider>
   <div className="App">

    <Route exact path="/login"><Login/></Route>
    <Route exact path="/signup"><Signup/></Route>
    <Route exact path="/add"><Addprod /></Route>
    <Route exact path="/"><Home /></Route>
    <Route exact path="/basket/:id"><BasketDetail /></Route>
    <Route exact path="/proddetail/:id"><ProdDetail /></Route>
    <Route exact path="/id/buynow"><Buynow /></Route>
    <Route exact path="/user/:id"><UserHome /></Route>

   </div>
   </ProductProvider>
   </BrowserRouter>
  );
}

export default App;
