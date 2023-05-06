import React from 'react';

const VenueCard = ({venue})=>{
    // console.log(venue)
    return(
<div className="bg-red-100 rounded shadow-bold p-4 hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1 hover:scale-100 hover:rotate-1 hover:perspective(1000)">
        <img src={venue.imageUrl} alt={venue.name} className="w-full h-48 rounded mb-4"
        style={{objectFit: 'contain'}} />
        <h2 className="text-xl font-bold mb-2">{venue.name}</h2>
        <p className="font-semibold mb-2">{venue.state}</p>
        <p className="text-sm mb-2">{venue.city}</p>
        <p className="text-sm mb-2">{venue.address}</p>
      </div>
    )
}

export default VenueCard
