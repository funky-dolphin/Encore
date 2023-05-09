import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import AmateurEventCard from './AmateurEventCard'

function Amateur({user}){
    const [amEvents, setAmEvents] = useState([])


    useEffect(()=> {
        fetchAmateurEvents()
    }, [])

    function fetchAmateurEvents(){
        fetch('/concerts')
        .then (res => res.json())
        .then(events => setAmEvents(mapData(events)))
    }

    function mapData(events){
        return events.map(event => {
            const mappedEvent = {
                id: event.id,
                image: event.image, 
                address : event.address, 
                name : event.artist.band_name,
                time: event.time,
                city: event.city,
                link : event.link, 
                price: event.price, 
                venue: event.venue,
                genre:event.genre, 
                date: event.date
            }
            console.log(mappedEvent)
            return mappedEvent
        })
    
    }
    console.log(amEvents)


    return(
    <div className = "flex flex-col h-screen">
    
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {amEvents.map((event, index) => (
                <Link to = {`/amateur_events/${event.id}`}>
                <AmateurEventCard event = {event}/>
                </Link>
            ))}

        </div>

        <Link to="/addevent">
            <button className="bg-c3 hover:bg-c4 text-white font-bold py-3 px-6 m-2 rounded-md">Add Event</button>
        </Link>
        
    </div>
    )
}

export default Amateur

