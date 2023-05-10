import React from 'react';
import EventCard from './EventCard';
import {Link} from 'react-router-dom'

function UpcomingEventsList({ events }) {
  if (!events || events.length === 0) {
    return <p className='bg-c3'>No upcoming events found.</p>;
  }

  return (
    <div className="upcoming-events-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <Link key={event.id} to={`/event/${event.id}`}>
        <EventCard
          key={event.id}
          event={{
            imageUrl: event.imageUrl,
            name: event.name,
            artistName: "",
            venueName: event.venue,
            venueAddress: event.venueAddress,
            date: event.date,
            time: event.time,
            genre: event.genre,
            priceRange: event.priceRange,
          }}
        />
        </Link>
      ))}
    </div>
  );
}

export default UpcomingEventsList;