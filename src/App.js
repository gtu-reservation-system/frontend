import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/HomeNavbar';
import Navbar2 from './components/ListNavbar';
import Navbar3 from './components/LoginNavbar';
import Navbar4 from './components/RestaurantNavbar';
import Navbar5 from './components/OwnerSignupNavbar';
import Navbar6 from './components/UserSignupNavbar';
import Navbar7 from './components/UserProfileNavbar';
import Navbar8 from './components/OwnerProfileNavbar';
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
import UserChangePassword from './pages/UserChangePassword';
import OwnerChangePassword from './pages/OwnerChangePassword';
import EditOwnerProfile from './pages/EditOwnerProfile';
import OwnerReservations from './pages/OwnerReservations';
import ResetPassword from './pages/ResetPassword';
import PopularDishes from './pages/PopularDishes';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

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
  const WrappedNavbar8 = withDarkMode(Navbar8);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<><WrappedNavbar /><Home /></>} />
        <Route path="/home" element={<><WrappedNavbar /><Home /></>} />
        <Route path="/restaurants" element={<><WrappedNavbar2 /><Restaurants /></>} />
        <Route path="/restaurants/:id" element={<><WrappedNavbar4 /><Restaurant /></>} />
        <Route path="/login" element={<><WrappedNavbar3 /><Login /></>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup/owner" element={<><WrappedNavbar5 /><OwnerSignup /></>} />
        <Route path="/signup/user" element={<><WrappedNavbar6 /><UserSignup /></>} />
        <Route path="/userProfile" element={<><WrappedNavbar7 /><UserProfile/></>} />
        <Route path="/edit-userProfile" element={<EditUserProfile />} />
        <Route path="/user-reservations" element={<UserReservations /> } />
        <Route path="/ownerProfile" element={<><WrappedNavbar8 /><OwnerProfile/></> } />
        <Route path="/edit-ownerProfile" element={<EditOwnerProfile /> } />
        <Route path="/user-change-password" element={<UserChangePassword />} />
        <Route path="/owner-change-password" element={<OwnerChangePassword />} />
        <Route path="/owner-reservations" element={<OwnerReservations />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/popular-dishes" element={<PopularDishes />} />
      </Routes>
    </Router>
  );
};

export default App;
