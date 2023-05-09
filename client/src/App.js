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
import Amateur from "./Components/Amateur_spotlight";
import AddEventCard from "./Components/AddEvent";
import AmateurEventDetails from "./Components/AmateurEventDeatils";


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

const isUserSignedin  = !!user

  return (
    <BrowserRouter>
    <div className="min-h-screen bg-c1">
    <Navbar setUser={setUser} user={user} />
    <Routes>
      <Route path="/" element={<CitySearch key={isUserSignedin} user = {user} setUser={setUser} />} />
      <Route path="/login" element={<Login setUser={setUser} user={user} />} />
      <Route path="/signup" element={<Signup setUser={setUser} />} />
      <Route path = "/events" element={<Events setUser={setUser} user={user} />}/>
      <Route path = '/venues' element= {<Venues user = {user} setUser = {setUser}/>} />
      <Route path='/venue/:id' element={<VenueDetail />} />
      <Route path = '/event/:id' element={<ConcertDetails/>}/>
      <Route path = '/amateur' element = {<Amateur/>}/>
      <Route path = '/addevent' element={<AddEventCard user = {user}/>}/>
      <Route path = '/amateur_events/:id' element={<AmateurEventDetails/>}/>
    </Routes>
    </div>
  </BrowserRouter>
);
}

export default App;
