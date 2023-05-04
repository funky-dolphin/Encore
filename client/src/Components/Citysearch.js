import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import {Link} from 'react-router-dom'
import APIKEY from '../config'
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const CitySearch = ({userCity, username}) => {
  const [city, setCity] = useState('New York');
  const [events, setEvents] = useState([])
  const [page, setPage] = useState(0)

  const carouselImages = [
    'https://img.buzzfeed.com/buzzfeed-static/static/2017-01/25/11/asset/buzzfeed-prod-fastlane-03/sub-buzz-27248-1485361539-3.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto',
    'https://img.buzzfeed.com/buzzfeed-static/static/2017-01/25/14/asset/buzzfeed-prod-fastlane-02/sub-buzz-29349-1485371354-1.jpg?downsize=600:*&output-format=auto&output-quality=auto',
    'https://img.buzzfeed.com/buzzfeed-static/static/2017-01/25/14/asset/buzzfeed-prod-fastlane-02/sub-buzz-29327-1485371470-4.jpg?downsize=600:*&output-format=auto&output-quality=auto',
  ]

  useEffect(() => {
    console.log(userCity)
    fetchEvents(userCity || city)
  }, [userCity]);

  useEffect(()=> {
    fetchEvents(city, page)
  },[page]);

  const fetchEvents = (city, page = 0) => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    const size = 3;
    const start = page * size;

    
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${APIKEY}&city=${city}&classificationName=music&segmentName=Music&startDateTime=${formattedDate}T00:00:00Z&sort=date,asc&locale=*&page=${start}&size=${size}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const events = data._embedded.events;
        const basicEventData = events
          .map(event => {
            const venue = event._embedded.venues[0];
            const imageUrl = event.images.find(image => image.ratio === '16_9' && image.width > '1000').url;
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
    setPage(0);
    fetchEvents(city, 0);
  };

  const handlePrevPage = () => {
    setPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };


  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center space-y-8 bg-white text-black">
    <form onSubmit={handleSearch} className="w-full max-w-md">
    <div
      className="w-full bg-center bg-contain bg-no-repeat"
      style={{
        backgroundImage:
        `url(${process.env.PUBLIC_URL}/Rock-Concert.jpeg)`,
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        paddingTop: 'calc(90 / 150 * 50vw)', // Set the height based on the aspect ratio of the image
        maxHeight: '50px', // Set a maximum height for the image container
      }}
    />
        <div className="flex items-center border-b border-b-2 border-red-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder = "Enter City"
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
        {userCity && username && (
            <h1 className="text-2xl font-bold">Hey {username}, here are some shows in {userCity}</h1>)}
        <div className="flex items-center w-full max-w-5">
      <button
        className="bg-red-500 hover:bg-red-600 text-black font-bold py-2 px-4 rounded mr-4"
        onClick={handlePrevPage}
        disabled={page === 0}
      >
        Previous
      </button>
      <div className="flex-grow grid grid-cols-4 sm:grid-cols-0 md:grid-cols-3 gap-4">
        {events.map((event, index) => (
          <Link to={`/event/${event.id}`} key={index}>
            <EventCard event={event} />
          </Link>
        ))}
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 text-black font-bold py-2 px-4 rounded ml-4"
        onClick={handleNextPage}
      >
        Next
      </button>
    </div>
  </div>
);
};

export default CitySearch;