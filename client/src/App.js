import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Join from './components/Join/Join.js';
import Chat from './components/Chat/Chat.js';

const App = () => (
  <Routes>
    <Route path="/" element={<Join />}></Route>
    <Route path = "/chat" element = {<Chat/>}> </Route>

  </Routes>
);


export default App;
