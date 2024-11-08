import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
import Navbar from './components/HomeNavbar';
import Navbar2 from './components/ListNavbar';
import Navbar3 from './components/LoginNavbar';
import Navbar4 from './components/RestaurantNavbar';
import Navbar5 from './components/OwnerSignupNavbar';
import Navbar6 from './components/UserSignupNavbar';
import Navbar7 from './components/ProfileNavbar';
import Home from './pages/Home';
import Restaurants from './pages/List';
import Restaurant from './pages/Restaurant';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import OwnerSignup from './pages/OwnerSignup';  
import UserSignup from './pages/UserSignup';
import UserProfile from './pages/UserProfile';
import EditUserProfile from './pages/EditUserProfile';
import OwnerProfile from './pages/OwnerProfile';
import ChangePassword from './pages/ChangePassword';
import EditProfile from './pages/EditOwnerProfile'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [userData, setUserData] = useState(null); 
  const [ownerData, setOwnerData] = useState(null); 

  useEffect(() => {
    if (isLoggedIn) { 
      if (role === 'owner') {
        window.location.href = '/ownerProfile';
      } else if (role === 'user') {
        window.location.href = '/userProfile';
      }
    }
  }, [isLoggedIn, role]);

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setRole(data.role);
    if (data.role === 'owner') {
      setOwnerData(data.ownerData);
    } else {
      setUserData(data.userData);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/home" element={<><Navbar /><Home /></>} />
        <Route path="/restaurants" element={<><Navbar2 /><Restaurants /></>} />
        <Route path="/restaurants/:id" element={<><Navbar4 /><Restaurant /></>} /> 
        <Route path="/login" element={<><Navbar3 /><Login handleLogin={handleLogin} /></>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup/owner" element={<><Navbar5 /><OwnerSignup /></>} /> 
        <Route path="/signup/user" element={<><Navbar6 /><UserSignup /></>} />
        <Route path="/userProfile" element={<><Navbar7 /><UserProfile userData={userData} /></>} />
        <Route path="/edit-user-profile" element={<EditUserProfile />} />
        <Route path="/ownerProfile" element={<><Navbar7 /><OwnerProfile ownerData={ownerData} /></>} />
        <Route path="/edit-ownerProfile" element={<EditProfile />} /> 
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
};

export default App;




