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
    <nav className="bg-gradient-to-b from-c1 to-c2 py-4 px-4 md:px-10 lg:px-20 flex flex-wrap justify-between items-center">
      <div className="flex items-center">
        <Link to="/venues" className="text-2xl text-c3 font-extrabold px-3 py-2 md:px-4 md:py-3 lg:px-3 lg:py-2 hover:text-c4 transition-colors duration-300 rounded-md mr-2 md:mr-4 mb-2 md:mb-0">
          Venues
        </Link>
        <Link to="/events" className="text-c3 text-2xl font-extrabold px-3 py-2 md:px-4 md:py-3 lg:px-3 lg:py-2 text-white hover:text-c4 transition-colors duration-300 rounded-md mr-2 md:mr-4 mb-2 md:mb-0">
          Concerts
        </Link>
        <Link to="/amateur" className="text-c3 text-2xl font-extrabold px-3 py-2 md:px-4 md:py-3 lg:px-3 lg:py-2 text-white hover:text-c4 transition-colors duration-300 rounded-md mb-2 md:mb-0">
          Amateur Spotlight
        </Link>
      </div>
      <div className="bg-c3 px-3 py-2 md:px-4 md:py-3 lg:px-3 lg:py-2 text-white hover:bg-c4 transition-colors duration-300 rounded-md mb-2 md:mb-0 text-5xl font-extrabold font-serif ">
  <Link to="/">ENCORE</Link>
</div>
      <div className="flex justify-between">
        <button type="button" className="text-2xl text-c3 font-extrabold px-3 py-2 md:px-4 md:py-3 lg:px-3 lg:py-2 hover:text-c4 transition-colors duration-300 rounded-md mr-2 md:mr-4 mb-2 md:mb-0" onClick={handleSignupClick}>
          Sign Up
        </button>
        {user ? (
      <button type="button" className="text-2xl text-c3 font-extrabold px-3 py-2 md:px-4 md:py-3 lg:px-3 lg:py-2 hover:text-c4 transition-colors duration-300 rounded-md mr-2 md:mr-4 mb-2 md:mb-0" onClick={handleLogoutClick}>
    Logout
    </button>
    ) : (
   <button type="button" className="text-2xl text-c3 font-extrabold px-3 py-2 md:px-4 md:py-3 lg:px-3 lg:py-2 hover:text-c4 transition-colors duration-300 rounded-md mr-2 md:mr-4 mb-2 md:mb-0" onClick={handleLoginClick}>
    Login
    </button>)}
      </div>
    </nav>
  );
}

export default Navbar;
