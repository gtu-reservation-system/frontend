import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
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
import UserReservations from './pages/UserReservations';
import OwnerProfile from './pages/OwnerProfile';
import ChangePassword from './pages/ChangePassword';
import EditProfile from './pages/EditOwnerProfile';
import OwnerReservations from './pages/OwnerReservations';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [ownerData, setOwnerData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const savedRole = localStorage.getItem('role');
    
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }

    if (savedIsLoggedIn) {
      setIsLoggedIn(savedIsLoggedIn);
      setRole(savedRole);

      if (savedRole === 'owner') {
        const savedOwnerData = JSON.parse(localStorage.getItem('ownerData'));
        setOwnerData(savedOwnerData);
      } else if (savedRole === 'user') {
        const savedUserData = JSON.parse(localStorage.getItem('userData'));
        setUserData(savedUserData);
      }
    }
  }, []);

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setRole(data.role);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('role', data.role);

    if (data.role === 'USER') {
      setUserData(data.userData);
      localStorage.setItem('userData', JSON.stringify(data.userData));
    } else {
      setOwnerData(data.ownerData);
      localStorage.setItem('ownerData', JSON.stringify(data.ownerData));
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', newDarkMode);
  };

  const withDarkMode = (NavbarComponent) => {
    return (props) => (
      <NavbarComponent 
        {...props} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
      />
    );
  };

  const WrappedNavbar = withDarkMode(Navbar);
  const WrappedNavbar2 = withDarkMode(Navbar2);
  const WrappedNavbar3 = withDarkMode(Navbar3);
  const WrappedNavbar4 = withDarkMode(Navbar4);
  const WrappedNavbar5 = withDarkMode(Navbar5);
  const WrappedNavbar6 = withDarkMode(Navbar6);
  const WrappedNavbar7 = withDarkMode(Navbar7);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<><WrappedNavbar /><Home /></>} />
        <Route path="/home" element={<><WrappedNavbar /><Home /></>} />
        <Route path="/restaurants" element={<><WrappedNavbar2 /><Restaurants /></>} />
        <Route path="/restaurants/:id" element={<><WrappedNavbar4 /><Restaurant /></>} />
        <Route path="/login" element={<><WrappedNavbar3 /><Login handleLogin={handleLogin} /></>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup/owner" element={<><WrappedNavbar5 /><OwnerSignup /></>} />
        <Route path="/signup/user" element={<><WrappedNavbar6 /><UserSignup /></>} />

        <Route 
          path="/userProfile" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <><WrappedNavbar7 /><UserProfile userData={userData} /></>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/edit-userProfile" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <EditUserProfile />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/user-reservations" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <UserReservations />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/ownerProfile" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <><WrappedNavbar7 /><OwnerProfile ownerData={ownerData} /></>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/edit-ownerProfile" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <EditProfile />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/change-password" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <ChangePassword />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/owner-reservations" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <OwnerReservations />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
