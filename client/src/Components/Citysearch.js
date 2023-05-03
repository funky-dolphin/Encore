import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import {Link} from 'react-router-dom'
import APIKEY from '../config'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const CitySearch = ({userZipcode, username}) => {
  const [city, setCity] = useState('New York');
  const [events, setEvents] = useState([])

  const carouselImages = [
    'https://img.buzzfeed.com/buzzfeed-static/static/2017-01/25/11/asset/buzzfeed-prod-fastlane-03/sub-buzz-27248-1485361539-3.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto',
    'https://img.buzzfeed.com/buzzfeed-static/static/2017-01/25/14/asset/buzzfeed-prod-fastlane-02/sub-buzz-29349-1485371354-1.jpg?downsize=600:*&output-format=auto&output-quality=auto',
    'https://img.buzzfeed.com/buzzfeed-static/static/2017-01/25/14/asset/buzzfeed-prod-fastlane-02/sub-buzz-29327-1485371470-4.jpg?downsize=600:*&output-format=auto&output-quality=auto',
  ]

  useEffect(() => {
    console.log(userZipcode)
    if (userZipcode){
    fetchEventsByZipCode(userZipcode)
    } else{
    fetchEvents(city)
    };
  }, [userZipcode]);

  const fetchEventsByZipCode = (zipcode) => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${APIKEY}&postalCode=${zipcode}&classificationName=music&segmentName=Music&startDateTime=${formattedDate}T00:00:00Z&sort=date,asc&locale=*`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const events = data._embedded.events
        const basicEventData = events
          .map(event => {
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
                venueAddress: `${venue.address.line1}, ${venue.city.name}, ${venue.state.stateCode} ${venue.postalCode}`,
                priceRange: event.priceRanges ? `${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}` : 'N/A',
                imageUrl: imageUrl
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

  const fetchEvents = (city) => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${APIKEY}&city=${city}&classificationName=music&segmentName=Music&startDateTime=${formattedDate}T00:00:00Z&sort=date,asc&locale=*`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const events = data._embedded.events;
        const basicEventData = events
          .map(event => {
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
                venueAddress: `${venue.address.line1}, ${venue.city.name}, ${venue.state.stateCode} ${venue.postalCode}`,
                priceRange: event.priceRanges ? `${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}` : 'N/A',
                imageUrl: imageUrl,
                genre: event.classifications[0].genre.name,
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
    fetchEvents(city);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center space-y-8 bg-white text-black">
       <div className="w-full flex items-center justify-center" style={{height: 'auto'}}>
      <div className="w-full max-w-6xl h-full overflow-hidden relative">
        <Carousel>
          {carouselImages.map((image, index) => (
            <div key={index} className="w-full h-full flex items-center justify-center">
              <div className="relative">
                <img className="object-contain w-full h-full max-h-[20vh]" src={image} alt={`Carousel Image ${index + 1}`} />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
    <form onSubmit={handleSearch} className="w-full max-w-md">
        <div className="flex items-center border-b border-b-2 border-red-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 text-sm border-4 text-black py-1 px-2 rounded"
            type="submit"
          >
            Search
          </button>
        </div>
        </form>
        {userZipcode && username && (
            <h2 classname = "text-2xl font-bold">Here are the events occuring in {username} {userZipcode}</h2>)}
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

export default CitySearch;