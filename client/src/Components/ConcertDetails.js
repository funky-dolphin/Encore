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
      `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${process.env.APIKEY}&priceRanges=true`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const eventImage = data.images
            ? data.images.find(image => image.ratio === '16_9' && image.width > '1000').url
            : null;
        const venue = data._embedded.venues[0];
        const city = venue.city ? venue.city.name : 'N/A';
        const state = venue.state ? venue.state.stateCode : 'N/A';
        const zip = venue.postalCode ? venue.postalCode : 'N/A';
        const venueAddress = `${city}, ${state}  ${zip}`;
        const instagram = data._embedded?.attractions?.[0]?.externalLinks?.instagram?.[0]?.url || null;
        const spotify = data._embedded?.attractions?.[0]?.externalLinks?.spotify?.[0]?.url || null;
          const eventDetails = {
          id: data.id,
          name: data.name,
          date: data.dates?.start?.localDate || 'N/A',
          time: data.dates?.start?.localTime || 'N/A',
          imageUrl: eventImage || 'No image available',
          venue: data._embedded.venues[0].name,
          location: venueAddress,
          address: `${data._embedded.venues[0].address?.line1 || 'No address given'}`,
          genre: data.classifications[0].genre.name,
          priceRange: data.priceRanges ? `${data.priceRanges[0].min} - ${data.priceRanges[0].max} ${data.priceRanges[0].currency}` : 'N/A',
          ticketURL: data.url,
          insta: instagram || null, 
          spotify_link: spotify || null
        };

        setEvent(eventDetails);
      })
      .catch((error) => console.log(error));
  };
       console.log(event)


    return (
        <div className="bg-c1 text-black flex flex-col items-center justify-center py-12 mt-0 w-full min-h-screen ">
          {event && (
            <div className="max-w-2xl w-full space-y-8 ">
              {event.imageUrl && (
                <div className="w-full h-96 overflow-hidden rounded-lg relative bg-c1">
                  <img className="w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                    src={event.imageUrl} 
                    alt={event.name} 
                  />
                </div>
              )}
           <div className=" p-8 rounded-lg shadow-md bg-c5 text-center">
  <h1 className="text-5xl text-center font-extrabold mb-4 text-c6">{event.name}</h1>
  <div className="space-y-3">
    <p className="text-lg font-medium mb-3">Date: <span className="text-c1 text-2xl font-semibold">{event.date}</span></p>
    <p className="text-lg font-medium mb-3">Time: <span className="text-c1 text-2xl font-semibold">{new Date(event.date + "T" + event.time).toLocaleTimeString([],{hour:'numeric', minute:'2-digit'})}</span></p>
    <p className="text-lg font-medium mb-3">Venue: <span className="text-c1 text-2xl font-semibold">{event.venue}</span></p>
    <p className="text-lg font-medium mb-3">Location: <span className ="text-c1 text-2xl font-semibold">{event.location}</span></p>
    <p className="text-lg font-medium mb-3">Address: <span className="text-c1 text-2xl font-semibold">{event.address}</span></p>
    <p className="text-lg font-medium mb-3">Genre: <span className="text-c1 text-2xl font-semibold">{event.genre}</span></p>
    <p className="text-lg font-medium mb-3">Price: <span className="text-c1 text-2xl font-semibold">{event.priceRange}</span></p>
  </div>
</div>
              <div className='flex justify-center'>
                <a href={event.ticketURL} target = "_blank" rel="noopener noreferrence" className="bg-c3 hover:bg-c4 text-xl font-bold py-4 px-6 ml-2 rounded">
                  Buy Tickets
                </a>
                {event && event.insta ?
                <a href={event.insta} target = "_blank" rel="noopener noreferrence" className="bg-c3 hover:bg-c4 text-xl font-bold py-4 px-6 ml-2  rounded">
                  Instagram
                </a> : null}
                {event && event.spotify_link ?
                <a href={event.spotify_link} target = "_blank" rel="noopener noreferrence" className="bg-c3 hover:bg-c4 text-xl font-bold py-4 px-6 ml-2  rounded">
                  Spotify
                </a> : null}
              </div>
            </div>
          )}
        </div>
      );
}

export default ConcertDetails;
