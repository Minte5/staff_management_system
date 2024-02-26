import React, { useState } from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



/*import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';*/

import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import UserPage1 from './pages/UserPage1';
import UserPage2 from './pages/UserPage2';
//import { Register } from './pages/Register';


function App() {
  
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user1" element={<UserPage1 />} />
          <Route path="/user2" element={<UserPage2 />} />
        </Routes>
      </Router>
    </div>
    
  );
};


/*function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className='App'>
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
      }

    </div>


    /*<div className="App">
      <header className="App-header">
        <Navbar/>
      </header>
    </div>*/
  /*);
} */
export default App;
