import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import APIKEY from '../config';
import UpcomingEventsList from './UpcomingEventsList';

function VenueDetail() {
    const { id } = useParams();
    const [venue, setVenue] = useState({});
    const [showUpcomingEvents, setShowUpcomingEvents] = useState(false);
    const [upcomingEvents, setupcomingEvents] = useState([])

    const fetchVenueDetails = (venueId) => {
      fetch(
        `https://app.ticketmaster.com/discovery/v2/venues/${venueId}.json?apikey=${APIKEY}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          const venueImage = data.images
            ? data.images.find((image) => image.ratio === '16_9')?.url
            : null;
  
          const venueDetails = {
            id: data.id,
            name: data.name,
            state: data.state?.stateCode || 'N/A',
            city: data.city?.name || 'N/A',
            address: data.address?.line1 || 'N/A',
            imageUrl: venueImage || 'No image available',
          };
  
          setVenue(venueDetails);
        })
        .catch((error) => console.log(error))
    }
  
    useEffect(() => {
      fetchVenueDetails(id);
    }, [id]);

    useEffect(() => {
        if (showUpcomingEvents) {
          fetchUpcomingEvents(id);
        }
      }, [showUpcomingEvents, id]);

    const fetchUpcomingEvents = async (venueId) => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?venueId=${venueId}&apikey=${APIKEY}&sort=date,asc`)
          .then((response) => response.json())
          .then((data) => {
            if (data._embedded && data._embedded.events) {
              const eventsList = data._embedded.events.map((event) => {
                const eventImage = event.images
                  ? event.images.find(image => image.ratio === '16_9' && image.width > '1000').url
                  : null;
                return {
                  id: event.id,
                  name: event.name,
                  date: event.dates?.start?.localDate || 'N/A',
                  time: event.dates?.start?.localTime || 'N/A',
                  imageUrl: eventImage || 'No image available',
                  venue: event._embedded.venues[0].name,
                  venueAddress: `${event._embedded.venues[0].address?.line1 || 'No address given'}`,
                  genre: event.classifications[0].genre.name,
                  priceRange: event.priceRanges ? `${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}` : 'N/A',
                };
              });
              setupcomingEvents(eventsList);
            } else {
              setupcomingEvents([]);
            }
          })
          .catch((error) => console.log(error));
      };


    const toggleUpcomingEvents = () => {
        setShowUpcomingEvents(!showUpcomingEvents);
      };
  

  
    return (
        <div className="bg-white text-black w-full flex flex-col items-center justify-center py-8 mt-0">
          {venue && (
            <div className="max-w-2xl w-full space-y-6">
              {venue.imageUrl && (
                <div className="w-full h-64 overflow-hidden rounded-lg relative">
                  <img
                    className="w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    src={venue.imageUrl}
                    alt={venue.name}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              )}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-3">{venue.name}</h1>
                <p className="text-lg font-semibold mb-2">State: {venue.state}</p>
                <p className="text-lg font-semibold mb-2">City: {venue.city}</p>
                <p className="text-lg font-semibold">Address: {venue.address}</p>
              </div>
            </div>
          )}
          <div
            className="cursor-pointer mt-4 text-xl font-bold bg-gray-100 shadow-md p-5 rounded-lg"
            onClick={toggleUpcomingEvents}
          >
            Upcoming Events
          </div>
          {showUpcomingEvents && <UpcomingEventsList events={upcomingEvents} />}
        </div>
      );
          }


export default VenueDetail;

