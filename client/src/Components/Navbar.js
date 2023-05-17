import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';


function Navbar({setUser, user}) {

  const navigate = useNavigate();

  function handleSignupClick() {
    navigate('/signup');
  }
  function handleLoginClick(){
    navigate('/login');
  }

  //Logout 
  async function handleLogoutClick() {
    try {
      const response = await fetch("/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Logout failed with status: ${response.status}`);
      }

      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <nav className="bg-gradient-to-b from-c1 to-c2 py-5 justify-center">
    <div className="flex items-center">
      <div className="flex-auto">
        <Link to="/venues" className="text-lg text-c3 font-extrabold  hover:text-c4 transition-colors duration-300 rounded-md mx-4 ">
          Venues
        </Link>
        <Link to="/events" className="text-c3 text-lg font-extrabold text-white hover:text-c4 transition-colors duration-300 rounded-md mx-4">
          Concerts
        </Link>
        <Link to="/amateur" className="text-c3 text-lg font-extrabold hover:text-c4 transition-colors duration-300 rounded-md mx-4">
          Amateur Spotlight
        </Link>
      </div>
      <div className="flex-auto">
        <Link to="/" className="bg-c3 px-3 lg:py-2 text-white hover:bg-c4 transition-colors duration-300 rounded-md text-4xl font-extrabold font-serif">
          ENCORE
        </Link>
      </div>
      <div className="flex-auto">
        <button type="button" className="text-lg text-c3 font-extrabold hover:text-c4 transition-colors duration-300 rounded-md mx-4" onClick={handleSignupClick}>
          Sign Up
        </button>
        {user ? (
          <button type="button" className="text-lg text-c3 font-extrabold hover:text-c4 transition-colors duration-300 rounded-md mx-4" onClick={handleLogoutClick}>
            Logout
          </button>
        ) : (
          <button type="button" className="text-lg text-c3 font-extrabold  hover:text-c4 transition-colors duration-300 rounded-md mx-4 " onClick={handleLoginClick}>
            Login
          </button>
        )}
      </div>
    </div>
  </nav>
  
  )  
}

export default Navbar;
