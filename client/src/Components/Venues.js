import React, {useState, useEffect} from 'react';
import VenueCard from './VenueCard';
import {Link} from 'react-router-dom'
import APIKEY from '../config';

function Venues({user}){
    const [venues, setVenues] = useState([])
    
    const [keyword, setKeyword] = useState('');

    console.log(user)

    const fetchVenues = (isUserSignedIn) => {
      const apiURL = isUserSignedIn
        ? `https://app.ticketmaster.com/discovery/v2/venues.json?apikey=${APIKEY}&keyword=${user.city}`
        : `https://app.ticketmaster.com/discovery/v2/venues.json?apikey=${APIKEY}&keyword=${keyword}`;
    
      fetch(apiURL)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const venues = data._embedded.venues;
          const venueDetails = venues.map(venue => {
            console.log(venue);
            const venueImage = venue.images ? venue.images.find(image => image.ratio === '16_9')?.url : null;
    
            return {
              id: venue.id,
              name: venue.name,
              state: venue.state?.stateCode || 'N/A',
              city: venue.city?.name || 'N/A',
              address: venue.address?.line1 || 'N/A',
              imageUrl: venueImage || 'No image available'
            };
          });
    
          setVenues(venueDetails);
        })
        .catch(error => {
          console.error('Error fetching venues:', error);
        });
    };

const isUserSignedIn = !!user
// useEffect(()=>{
//     fetchVenues();
// }, [])

useEffect(() => {
    fetchVenues(isUserSignedIn);
}, []);

const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchVenues();
  };
  return (
    <div>
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Search venues by keyword..."
          className="border-2 border-gray-300 rounded p-2 w-full mb-2"
        />
        <button type="submit" className="bg-red-600 text-black rounded p-2 w-full">
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {venues.map((venue, index) => (
          <Link to={`/venue/${venue.id}`} key={index}>
            <VenueCard venue={venue} />
          </Link>
        ))}
      </div>
    </div>
  );
}


export default Venues