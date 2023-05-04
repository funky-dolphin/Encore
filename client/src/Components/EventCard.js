import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded shadow-md p-4">
   <div className="w-full aspect-w-16 aspect-h-9 rounded mb-4 overflow-hidden">
  <img src={event.imageUrl} alt={event.name} className="w-full h-full object-contain" style={{maxWidth: '100%'}} />
</div>
      <h2 className="text-xl font-bold mb-2">{event.name}</h2>
      <p className="font-semibold mb-2">{event.artistName}</p>
      <p className="text-sm mb-2">{event.venueName}</p>
      <p className="text-sm mb-2">{event.venueAddress}</p>
      <p className="text-sm mb-2">Date: {event.date}</p>
      <p className="text-sm mb-2">Time: {event.time}</p>
      <p className="text-sm mb-2">Genre: {event.genre}</p>
      <p className="text-sm">Price: {event.priceRange}</p>
    </div>
  );
};

export default EventCard;