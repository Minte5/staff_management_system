import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes , useLocation} from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import AdminPage from './pages/AdminDashboard';
import UserPage1 from './pages/UserPage1';
import UserPage2 from './pages/UserPage2';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordConfirm from './pages/ForgotPasswordConfirm';
import AdminDashboard from './pages/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';





const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  // Get the current location using useLocation hook
  const location = useLocation();

  // Determine whether to render the Navbar based on the current route
  const shouldRenderNavbar = location.pathname !== '/' && location.pathname !== '/forgot-password' && location.pathname !== '/forgot-password-confirm';

  return (
    <div className='App'>
      {/* Conditionally render the Navbar */}
      {shouldRenderNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password-confirm" element={<ForgotPasswordConfirm />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/user1" element={<UserPage1 />} />
        <Route path="/user2" element={<UserPage2 />} />
      </Routes>
    </div>
  );
};



/*function App() {

  const location = useLocation();

  // Determine whether to render the Navbar based on the current route
  const shouldRenderNavbar = location.pathname !== '/Login' && location.pathname !== '/forgot-password';

  
  return (
    <div className='App'>
      <Router>
        
        {shouldRenderNavbar && <Navbar />}
        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password-confirm" element={<ForgotPasswordConfirm />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user1" element={<UserPage1 />} />
          <Route path="/user2" element={<UserPage2 />} />
        </Routes>
        
        
      </Router>
    </div>
    
  );
};*/


export default App;
