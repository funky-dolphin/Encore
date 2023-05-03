import React from 'react';

const VenueCard = ({venue})=>{
    console.log(venue)
    return(
        <div className="bg-white rounded shadow-md p-4">
        <img src={venue.imageUrl} alt={venue.name} className="w-full h-48 object-cover rounded mb-4"
        style={{objectFit: 'contain'}} />
        <h2 className="text-xl font-bold mb-2">{venue.name}</h2>
        <p className="font-semibold mb-2">{venue.state}</p>
        <p className="text-sm mb-2">{venue.city}</p>
        <p className="text-sm mb-2">{venue.address}</p>
      </div>
    )
}

export default VenueCard
