import React from 'react';

const EventCard = ({ event }) => {
    // console.log(event)
  return (
<div className="bg-c5 rounded shadow-bold p-4 hover:bg-c3 transition-all duration-300 transform hover:-translate-y-1 hover:scale-100 hover:rotate-1 hover:perspective(1000)">
   <div className="w-full aspect-w-16 aspect-h-9 rounded mb-4 overflow-hidden">
  <img src={event.imageUrl} alt={event.name} className="w-full h-full object-contain" style={{maxWidth: '100%'}} />
</div>
      <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
      <h5 className=" font-xl font-extrabold text-red-950 mb-2">{event.artistName}</h5>
      <p className="text-base mb-2">{event.venueName}</p>
      {/* <p className="text-sm mb-2">{event.venueAddress}</p> */}
      <p className="text-xs mb-2">Date: {event.date}</p>
      {/* <p className="text-sm mb-2">Time: {event.time}</p> */}
      <p className="text-xs mb-2">Genre: {event.genre}</p>
      {/* <p className="text-sm">Price: {event.priceRange}</p> */}
    </div>
  );
};

export default EventCard;