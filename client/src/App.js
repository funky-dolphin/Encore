import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import CitySearch from './Components/Citysearch';
import Events from "./Components/Events";
import Venues from "./Components/Venues";
import VenueDetail from "./Components/VenueDetail";
import ConcertDetails from "./Components/ConcertDetails";


function App() {
  const [user, setUser] = useState(null)
  
  // const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    fetch("/check_session", {}).then((response) => {
      if (response.ok) {
        response.json().then((userData) => {
          setUser(userData);
        });
      } else {
        setUser(null); // Set user to null if not logged in
      }
    });
  }, []);

  console.log(user)



  return (
    <BrowserRouter>
    <Navbar setUser={setUser} user={user} />
    <Routes>
      <Route path="/" element={<CitySearch user = {user} setUser={setUser} />} />
      <Route path="/login" element={<Login setUser={setUser} user={user} />} />
      <Route path="/signup" element={<Signup setUser={setUser} />} />
      <Route path = "/events" element={<Events setUser={setUser} user={user} />}/>
      <Route path = '/venues' element= {<Venues user = {user} setUser = {setUser}/>} />
      <Route path='/venue/:id' element={<VenueDetail />} />
      <Route path = '/event/:id' element={<ConcertDetails/>}/>
    </Routes>
  </BrowserRouter>
);
}

export default App;
