import React, {useState, useEffect} from 'react';
import VenueCard from './VenueCard';
import {Link} from 'react-router-dom'
import APIKEY from '../config';

function Venues({ user }) {
  const [venues, setVenues] = useState([]);
  const [keyword, setKeyword] = useState("");

  const isUserSignedIn = !!user;

  const defaultStateCode = 'CA';

  const getStateCode = () => {
    if (isUserSignedIn && user && user.state) {
      return user.state;
    }
    return defaultStateCode;
  };

  useEffect(() => {
    if (!keyword) {
      fetchVenues(getStateCode(), "");
    }
  }, [isUserSignedIn]);

  const fetchVenues = (stateCode, keyword) => {
    const stateCodeParam = stateCode ? `&stateCode=${stateCode}` : "";
    const keywordParam = keyword ? `&keyword=${keyword}` : "";

    const apiURL = `https://app.ticketmaster.com/discovery/v2/venues.json?apikey=${APIKEY}${stateCodeParam}${keywordParam}`;
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        const venues = data._embedded.venues;
        const venueDetails = venues.map((venue) => {
          const venueImage = venue.images
            ? venue.images.find((image) => image.ratio === "16_9")?.url
            : null;

          return {
            id: venue.id,
            name: venue.name,
            state: venue.state?.stateCode || "N/A",
            city: venue.city?.name || "N/A",
            address: venue.address?.line1 || "N/A",
            imageUrl: venueImage || "No image available",
          };
        });

        setVenues(venueDetails);
      })
      .catch((error) => console.log(error));
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword) {
      fetchVenues("", keyword);
    } else {
      fetchVenues(getStateCode(), "");
    }
  };

  return (
    <div className = "flex flex-col h-screen">
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









// function Venues({user}){
  //     const [venues, setVenues] = useState([])
  //     const [keyword, setKeyword] = useState('');
  //     const [fetchTrigger, setFetchTrigger] = useState(false)
  
  //   const isUserSignedIn = !!user
    
  //   const getStateCode = () => {
  //     if (keyword) {
  //       return keyword;
  //     }
  //     if (isUserSignedIn && user && user.state) {
  //       return null;
  //     }
  //     return "";
  //   }
  
  //   useEffect(()=> {
  //     fetchVenues(getStateCode())
  //   },[isUserSignedIn, fetchTrigger])
  
  //   const fetchVenues = (keyword) => {
  //     const stateCodeParam = getStateCode ? `&stateCode=${user.state}` : '';
   
      
  //     const apiURL = `https://app.ticketmaster.com/discovery/v2/venues.json?apikey=${APIKEY}${stateCodeParam}`;   
  //     fetch(apiURL)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
    
  //       const venues = data._embedded.venues;
  //       const venueDetails = venues.map(venue => {
  //         console.log(venue)
  //         const venueImage = venue.images ? venue.images.find(image => image.ratio === '16_9')?.url : null;
          
  //         return {
  //             id: venue.id,
  //             name: venue.name,
  //             state: venue.state?.stateCode || 'N/A',
  //             city: venue.city?.name || 'N/A',
  //             address: venue.address?.line1 || 'N/A',
  //             imageUrl: venueImage || 'No image available'
  //         };
  //       });
    
  //       setVenues(venueDetails);
       
  //     })
  //     .catch(error => console.log(error));
  // }
  
  
  // const handleKeywordChange = (e) => {
  //     setKeyword(e.target.value);
  //   };
  
  // const handleSearchSubmit = (e) => {
  //     e.preventDefault();
  //     const keyword = e.target.value;
  //     fetch(`https://app.ticketmaster.com/discovery/v2/venues.json?apikey=${APIKEY}&keyword=${keyword}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data._embedded && data._embedded.venues) {
  //           const venues = data._embedded.venues;
  //           const venueDetails = venues.map((venue) => {
  //             const venueImage = venue.images
  //               ? venue.images.find((image) => image.ratio === "16_9")?.url
  //               : null;
    
  //             return {
  //               id: venue.id,
  //               name: venue.name,
  //               state: venue.state?.stateCode || "N/A",
  //               city: venue.city?.name || "N/A",
  //               address: venue.address?.line1 || "N/A",
  //               imageUrl: venueImage || "No image available",
  //             };
  //           });
  //           console.log(venueDetails);
  //         } else {
  //           console.log("No venues found");
  //         }
  //       });