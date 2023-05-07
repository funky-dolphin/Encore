import Reat, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import EventCard from './EventCard'

function Amateur({user}){


    useEffect(()=> {
        fetchAmateurEvents()
    }, [])

    function fetchAmateurEvents(){
        fetch('/events')
        .then (res => res.json())
        .then(data => console.log(data))
    }


    return(
    <div>
        <Link to="/addevent">
            <button>Add Event</button>
        </Link>
    </div>
    )
}

export default Amateur

