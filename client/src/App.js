import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import './App.css';
import Post from './components/Post'

function App() {
  return (
    <BrowserRouter>
   <div className="App">

    <Route exact path="/login"><Login/></Route>
    <Route exact path="/"><Signup/></Route>
    <Route exact path="/posts/:id"><Post/></Route>

   </div>
   </BrowserRouter>
  );
}

export default App;
