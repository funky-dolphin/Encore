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
    <nav className="bg-black text-white py-4 px-6 flex justify-between items-center font-punk">
      <div className="flex items-center">
      <Link
        to = "/venues"
          className="px-4 py-2 hover:text-gray-400 transition-colors duration-300"
        >
          Venues
        </Link>
        <Link
        to = "/events"
          className="px-4 py-2 hover:text-gray-400 transition-colors duration-300"
        >
          Concerts
        </Link>
      </div>
      <div className="text-2xl font-bold flex-grow text-center">
        <Link to="/">ENCORE</Link>
      </div>
      <div className="flex justify-between">
          <button
            type="button"
            className="px-5 py-2 bg-red-700 text-white hover:bg-red-800 transition-colors duration-300 mr-4"
            onClick={handleSignupClick}
          >
            Sign Up
          </button>
          <button 
            type="button"
            className="px-6 py-3 bg-red-700 text-white hover:bg-red-800 transition-colors duration-300 mr-4"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button 
            type="button"
            className="px-6 py-3 bg-red-700 text-white hover:bg-red-800 transition-colors duration-300"
            onClick={handleLogoutClick}          
          >
            Logout
          </button>
      </div>

    </nav>
  );
}

export default Navbar;
