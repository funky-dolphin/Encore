import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

function AmateurEventDetails(){
    const {id}  = useParams();
    const [amEvent, setAmEvent] = useState({});

    useEffect(()=>{
        fetchAmEventDetails(id)
    },[id])

    const fetchAmEventDetails = (eventId) => {
        fetch (`/amateur_events/${eventId}`)
        .then((res)=> res.json())
        .then ((data)=>{
            const amEvent = {
                id : data.id, 
                name: data.artist.band_name, 
                city: data.city, 
                date: data.date, 
                image: data.image, 
                link: data.link, 
                price: data.price, 
                time: data.time, 
                venue: data.venue,
                address: data.address,
                genre: data.genre
                
            }
            setAmEvent(amEvent)
        })
        .catch((error) => console.log(error));
    }
console.log(amEvent)

    return(
        <div className="bg-c1 text-black w-full flex flex-col items-center justify-center py-12 mt-0">
          {amEvent && (
            <div className="max-w-2xl w-full space-y-8">
              {amEvent.image && (
                <div className="bg-c3 w-full h-96 overflow-hidden rounded-lg relative">
                  <img className="w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                    src={amEvent.image} 
                    alt={amEvent.name} 
                    style={{objectFit: 'contain'}}/>
                </div>
              )}
              <div className="bg-c3 p-8 rounded-lg shadow-md">
                <h1 className="text-4xl text-center font-bold mb-4">{amEvent.name}</h1>
                <p className="text-xl font-semibold mb-3">Date: {amEvent.date}</p>
                <p className="text-xl font-semibold mb-3">Time: {new Date(amEvent.date + "T" + amEvent.time).toLocaleTimeString([],{hour:'numeric', minute:'2-digit'})}</p>
                <p className="text-xl font-semibold mb-3">Venue: {amEvent.venue}</p>
                <p className="text-xl font-semibold mb-3">{amEvent.location}</p>
                <p className="text-xl font-semibold mb-3">Address: {amEvent.address}</p>
                <p className="text-xl font-semibold mb-3">Genre: {amEvent.genre}</p>
                <p className="text-xl font-semibold mb-3">Price: {amEvent.price}</p>
              </div>
              <div>
                <a href={amEvent.link} className="bg-c3 hover:bg-c4 text-white font-bold py-4 px-6 rounded-md">
                  Social Media
                </a>
              </div>
            </div>
          )}
        </div>
      );
}



export default AmateurEventDetails 
