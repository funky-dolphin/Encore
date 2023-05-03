import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import APIKEY from '../config';

function ConcertDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    fetchEventDetails(id);
  }, [id]);

  const fetchEventDetails = (eventId) => {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${APIKEY}&priceRanges=true`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const eventImage = data.images
          ? data.images.find((image) => image.ratio === '16_9')?.url
          : null;
          const eventDetails = {
          id: data.id,
          name: data.name,
          date: data.dates?.start?.localDate || 'N/A',
          time: data.dates?.start?.localTime || 'N/A',
          imageUrl: eventImage || 'No image available',
          venue: data._embedded.venues[0].name,
          venueAddress: `${data._embedded.venues[0].address?.line1 || 'No address given'}`,
          genre: data.classifications[0].genre.name,
          priceRange: data.priceRanges ? `${data.priceRanges[0].min} - ${data.priceRanges[0].max} ${data.priceRanges[0].currency}` : 'N/A',
          ticketURL: data.url
        };

        setEvent(eventDetails);
      })
      .catch((error) => console.log(error));
  };

  

  return (
    <div className="bg-white text-black w-full flex flex-col items-center justify-center py-8 mt-0)">
    {event && (
      <div className="max-w-2xl w-full space-y-6">
        {event.imageUrl && (
          <div className="w-full h-80 overflow-hidden rounded-lg relative">
            <img className="w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
              src={event.imageUrl} 
              alt={event.name} 
              style={{objectFit: 'contain'}}/>
          </div>
        )}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl text-center font-bold mb-3">{event.name}</h1>
          <p className="text-lg font-semibold mb-2">Date: {event.date}</p>
          <p className="text-lg font-semibold mb-2">Time: {event.time}</p>
          <p className="text-lg font-semibold mb-2">Venue: {event.venue}</p>
          <p className="text-lg font-semibold mb-2">Address: {event.venueAddress}</p>
          <p className="text-lg font-semibold mb-2">Genre: {event.genre}</p>
          <p className="text-lg font-semibold mb-2">Price: {event.priceRange}</p>
        </div>
        <div >
        <a href = {event.ticketURL} className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
            Buy Tickets
        </a>
        </div>
      </div>
    )}
  </div>
);
}

export default ConcertDetails;
