import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import {Link} from 'react-router-dom'
import APIKEY from '../config'


const Concerts = () => {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState('');

  const fetchEvents = () => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10)
  
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${APIKEY}&classificationName=music&segmentName=Music&startDateTime=${formattedDate}T00:00:00Z&sort=date,asc&locale=*&size=50&keyword=${keyword}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const events = data._embedded.events;
        const basicEventData = events.map(event => {
          const venue = event._embedded.venues[0];
          const imageUrl = event.images.find(image => image.ratio === '16_9').url;
          let artistName = 'Unknown';
          if (event.lineup && event.lineup.length > 0) {
            artistName = event.lineup.join(', ');
          } else if (event._embedded.attractions && event._embedded.attractions.length > 0) {
            artistName = event._embedded.attractions[0].name;
          } else if (event._embedded.attractions && !Array.isArray(event._embedded.attractions) && event._embedded.attractions.name) {
            artistName = event._embedded.attractions.name;
          }
          return {
            id: event.id,
            name: event.name,
            date: event.dates.start.localDate,
            time: event.dates.start.localTime,
            artistName: artistName,
            venueName: venue.name,
            venueAddress: `${venue.address?.line1 || 'No address given'}`,
            priceRange: event.priceRanges ? `${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}` : 'N/A',
            imageUrl: imageUrl,
            genre:events[0].classifications[0].genre.name
          };
        });
  
        setEvents(basicEventData);
      })
      .catch(error => console.log(error));
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  useEffect(() => {
    fetchEvents(); // Fetch events on initial render
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default Concerts;
