import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import {Link} from 'react-router-dom'
import APIKEY from '../config'


  const CitySearch = ({ setUser, user }) => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchedCity, setSearchedCity] = useState('')
  
    const isUserSignedIn = !!user;
  
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
    const apiURL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${APIKEY}&classificationName=music&segmentName=Music&startDateTime=${formattedDate}T00:00:00Z&sort=date,asc&locale=*&size=50&page=${page}&city=${searchedCity}&countryCode=US`


    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        const events= data._embedded.events;
        const basicEventData = events
          .map(event => {
            const venue = event._embedded.venues[0]
            const imageUrl = event.images.find(image => image.ratio === '16_9' && image.width > '1000').url;
            let artistName = 'Unknown';
            if (event.lineup && event.lineup.length > 0) {
              artistName = event.lineup.join(', ');
            } else if (event._embedded.attractions && event._embedded.attractions.length > 0) {
              artistName = event._embedded.attractions[0].name;
            } else if (event._embedded.attractions && !Array.isArray(event._embedded.attractions) && event._embedded.attractions.name) {
              artistName = event._embedded.attractions.name;
            }
            const city = venue.city ? venue.city.name : 'N/A';
            const state = venue.state ? venue.state.stateCode : 'N/A';
            const zip = venue.postalCode ? venue.postalCode : 'N/A';
            const venueAddress = `${city}, ${state}  ${zip}`;
            return {
                id: event.id,
                name: event.name,
                date: event.dates.start.localDate,
                time: event.dates.start.localTime,
                artistName: artistName,
                venueName: venue.name,
                address: venueAddress,
                street: `${venue.address?.line1}`,
                priceRange: event.priceRanges ? `${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}` : 'N/A',
                imageUrl: imageUrl,
                genre: event.classifications[0].genre?.name,
            };
          })
          .sort((a, b) => {
            if (a.priceRange === 'N/A') return 1;
          if (b.priceRange === 'N/A') return -1;
          return parseFloat(b.priceRange.split(' ')[0]) - parseFloat(a.priceRange.split(' ')[0]);
          })
          .slice(0, 3);
        console.log(basicEventData);
        setEvents(basicEventData)
      })
      .catch(error => console.log(error));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const inputCity = e.target.elements[0].value;
    if(inputCity){
    setSearchedCity(inputCity);
  } else{
  setSearchedCity('')}
  };
  

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };


  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white text-black">
      <div
        className="w-full bg-center bg-cover"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/Rock-Concert1.jpeg)`,
          backgroundPosition: ' center 50% ',
          height: '50vh',
          paddingTop: '10%',
        }}
      />
      <div className="pt-16 w-full px-4 justify-center">
        <form onSubmit={handleSearch} className="w-full">
          <div className="flex items-center border-b-2 py-2 justify-center">
          <input
        className="appearance-none bg-transparent border-none w-64 text-black mr-3 py-2 px-2 leading-tight focus:outline-none rounded-md"
        type="text"
        placeholder="Enter City"
      />
            <button
              className="flex-shrink-0 bg-c3 hover:bg-c4 border-c3 hover:border-c4 text-md border-4 text-black py-1 px-2 rounded"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
        <div className="flex flex-wrap items-center justify-center w-full">
          <button
            className="bg-c3 hover:bg-c4 text-black font-bold py-2 px-4 rounded mr-4 mt-4"
            onClick={handlePrevPage}
          >
            Previous
          </button>
          {events.map((event, index) => (
            <Link to={`/event/${event.id}`} key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <EventCard event={event} />
            </Link>
          ))}
          <button
            className="bg-c3 hover:bg-c4 text-black font-bold py-2 px-4 rounded ml-4 mt-4"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );}
  
  export default CitySearch;