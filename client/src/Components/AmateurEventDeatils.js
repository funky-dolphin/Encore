import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AmateurEventDetails({user}){
    const {id}  = useParams();
    const [amEvent, setAmEvent] = useState({});
    const navigate = useNavigate()

    useEffect(()=>{
        fetchAmEventDetails(id)
    },[id])

    const fetchAmEventDetails = (eventId) => {
        fetch (`https://encore-concerts.onrender.com/amateur_events/${eventId}`)
        .then((res)=> res.json())
        .then ((data)=>{
          console.log(data)
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
console.log(user)
    function handleDelete(){
      fetch(`https://encore-concerts.onrender.com/amateur_events/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((data)=>{
        navigate('/amateur')
        alert("Event Deleted")
      })
      

    }

    function handleEditClick(){
      navigate(`/amateur_events/edit/${id}`)
    }


    return(
        <div className="bg-c1 text-black w-full flex flex-col items-center justify-center py-12 mt-0">
          {amEvent && (
            <div className="max-w-2xl w-full space-y-8">
              {amEvent.image && (
                <div className="bg-c1 w-full h-96 overflow-hidden rounded-lg relative">
                  <img className="w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                    src={amEvent.image} 
                    alt={amEvent.name} 
                   />
                </div>
              )}
              <div className="bg-c5 p-8 rounded-lg shadow-md text-center">
                <h1 className="text-5xl text-center font-bold mb-4">{amEvent.name}</h1>
                <p className="text-lg font-semibold mb-3">Date: <span className="text-c1 text-2xl font-semibold">{amEvent.date}</span></p>
                <p className="text-lg font-semibold mb-3">Time: <span className="text-c1 text-2xl font-semibold">{new Date(amEvent.date + "T" + amEvent.time).toLocaleTimeString([],{hour:'numeric', minute:'2-digit'})}</span></p>
                <p className="text-lg font-semibold mb-3">Venue:<span className="text-c1 text-2xl font-semibold">{amEvent.venue}</span> </p>
                {/* <p className="text-lg font-semibold mb-3">Location:<span className="text-c1 text-2xl font-semibold">{amEvent.location}</span></p> */}
                <p className="text-lg font-semibold mb-3">Address:<span className="text-c1 text-2xl font-semibold"> {amEvent.address}</span></p>
                <p className="text-lg font-semibold mb-3">Genre:<span className = "text-c1 text-2xl font-semibold"> {amEvent.genre}</span></p>
                <p className="text-lg font-semibold mb-3">Price: <span className="text-c1 text-2xl font-semibold"> ${amEvent.price}</span></p>
              </div>
              <div className='flex justify-center'>
                <a href={amEvent.link} target = "_blank" rel="noopener noreferrence" className="bg-c3 hover:bg-c4 text-xl font-bold py-4 px-6 rounded-md">
                  Social Media
                </a>
                {user && user.artist && user.artist[0] && user.artist[0].band_name == amEvent.name ?
                <button onClick = {handleDelete} className = "bg-c3 hover:bg-c4 text-xl font-bold py-4 px-6 ml-2 rounded-md">Delete</button> :
                <> </>
                }
                 {user && user.artist && user.artist[0] && user.artist[0].band_name == amEvent.name ?
                <button onClick = {handleEditClick} className = "bg-c3 hover:bg-c4 text-xl font-bold py-4 px-6 ml-2 rounded-md">Edit Event</button> :
                <> </>
                }
              </div>
            </div>
          )}
        </div>
      );
}



export default AmateurEventDetails 
