import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import {Link} from 'react-router-dom'
import APIKEY from '../config'


const Concerts = ({user, setUser}) => {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0)
  const [searchedCity, setSearchedCity] = useState('')

const isUserSignedIn = !!user

const getCity = () => {
  if (searchedCity) {
    return searchedCity;
  }
  if (isUserSignedIn && user && user.city) {
    return user.city;
  }
  return '';
};

useEffect(() => {
  fetchEvents(getCity(), currentPage);
}, [currentPage, isUserSignedIn, searchedCity]);



  const fetchEvents = (searchedCity, page=0) => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    const apiURL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${APIKEY}&classificationName=music&segmentName=Music&startDateTime=${formattedDate}T00:00:00Z&sort=date,asc&locale=*&size=50&page=${page}&city=${searchedCity}&countryCode=US&keyword=${keyword}`


    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        const events = data._embedded.events;
        const basicEventData = events.map(event => {    
            const venue = event._embedded.venues[0];
            const imageUrl = event.images.find(image => image.ratio === '16_9' && image.width > '1000').url;
            const city = venue.city ? venue.city.name : 'N/A';
            const state = venue.state ? venue.state.stateCode : 'N/A';
            const zip = venue.postalCode ? venue.postalCode : 'N/A';
            const venueAddress = `${city}, ${state}  ${zip}`;
          let artistName = 'Unknown';
          if (event.lineup && event.lineup.length > 0) {
            artistName = event.lineup.join(', ');
          } else if (event._embedded.attractions && event._embedded.attractions.length > 0) {
            artistName = event._embedded.attractions[0].name;
          } else if (event._embedded.attractions && !Array.isArray(event._embedded.attractions) && event._embedded.attractions.name) {
            artistName = event._embedded.attractions.name;
          }
          const genre = event.classifications && event.classifications[0].genre ? event.classifications[0].genre.name : 'Unknown'
          return {
            id: event.id,
            name: event.name,
            date: event.dates.start.localDate,
            // time: event.dates.start.localTime,
            artistName: artistName,
            venueName: venue.name,
            address: venueAddress,
            street: `${venue.address?.line1 || 'No address given'}`,
            priceRange: event.priceRanges ? `${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}` : 'N/A',
            imageUrl: imageUrl,
            genre: genre
          };
        });
  
        setEvents(basicEventData);
      })
      .catch(error => console.log(error));
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = ()=>{
    setCurrentPage(currentPage - 1);
  }

  const handleKeywordChange = (e) => {
    const inputkeyWord = (e.target.value);
    if (inputkeyWord){
      setKeyword(inputkeyWord)
    } else{
      setKeyword('')
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const inputCity = e.target.elements[0].value;
    if (inputCity) {
      setSearchedCity(inputCity);
    } else {
      setSearchedCity("");
    }
    fetchEvents(getCity(), currentPage, keyword);
  };


  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   fetchEvents();
  // };


  return (
    <div className = "flex flex-col h-screen">
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Search events by keyword..."
          className="border-2 border-gray-300 rounded p-2 w-full mb-2"
        />
        <button type="submit" className="bg-red-600 text-black rounded p-2 w-full">
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {events.map((event, index) => (
                <Link to ={`/event/${event.id}`} key = {index}>
                <EventCard event ={event} />
                </Link>
                
            ))}
      </div>

      <div className="w-full flex justify-between items-center mt-4">
  <button
    className="bg-red-600 hover:bg-red-800 text-white font-bold py-3 px-5 rounded"
    onClick={handlePreviousPage}
    disabled={currentPage === 0}
  >
    Previous
  </button>

  <button
    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-5 rounded"
    onClick={handleNextPage}
  >
    Next
  </button>
</div>
    </div>
  );
};

export default Concerts;
