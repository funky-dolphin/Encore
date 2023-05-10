import React, {useState, useEffect} from 'react';

function AddEventCard({user}){
    const [addVenueName, setVenueName] = useState('')
    const [addTime, setTime] = useState('')
    const [addCity, setCity] = useState('')
    const [addImage, setImage] = useState('')
    const [addAddress, setAddress] = useState('')
    const [addGenre, setGenre] = useState('')
    const [addPrice, setPrice] = useState('')
    const [addLink, setLink] = useState('')
    const[successMessage, setSuccessmessage] = useState('')
    const [addDate, setDate] = useState('')
    const [error, setError] = useState('')


    async function handleSubmit(e){
      e.preventDefault()
    
      try {
        const new_event = {
          artist: user.artist[0],
          venue: addVenueName, 
          time: addTime, 
          city: addCity, 
          image: addImage, 
          address: addAddress,
          genre: addGenre,
          price: addPrice,
          link: addLink,
          date: addDate,
        }
        console.log(new_event)
        const res = await fetch('/concerts',{
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(new_event),
        })
        if(res.ok){
          alert("success")

        }else{
          const data = await res.json()
          alert(`Error: ${data.error}`)
        }
       
      } catch (error) {
        console.log(error)
      }
    }
    

    return(
        <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md bg-c2 text-white rounded-lg p-6">
            <h3>{successMessage}</h3>
          <h2 className="text-3xl mb-6 font-bold">Add Concert</h2>
          <form onSubmit = {handleSubmit}> 
          {error && (
        <div className="bg-c4 text-c3 font-bold mb-4 p-4 rounded">
          {error}
        </div>
      )}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="venue">
                Venue
              </label>
              <input onChange = {(e) => setVenueName(e.target.value)}
                className="appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="venue"
                type="venue"
                placeholder="Venue"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="time">
                Time
              </label>
              <input onChange = {(e)=> setTime(e.target.value)}
                className="appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white mb-1 leading-tight focus:outline-none focus:shadow-outline"
                id="time"
                type="time"
                placeholder='Time'
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="date">
                Date
              </label>
              <input onChange = {(e)=> setDate(e.target.value)}
                className="appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="date"
                placeholder="date"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="city">
                City
              </label>
              <input onChange = {(e)=> setCity(e.target.value)}
                className="appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                type="text"
                placeholder="City"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="image">
                Image
              </label>
              <input onChange = {(e)=> setImage(e.target.value)}
                className="appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                type="text"
                placeholder="Image URL"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="image">
                Address
              </label>
              <input onChange = {(e)=> setAddress(e.target.value)}
                className="appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Address"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="image">
                Genre
              </label>
              <input onChange = {(e)=> setGenre(e.target.value)}
                className="appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="genre"
                type="text"
                placeholder="Genre"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="price">
                Ticket Price
              </label>
              <input onChange = {(e)=> setPrice(e.target.value)}
                className="appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="text"
                placeholder="Ticket Price"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="price">
                Social Links
              </label>
              <input onChange = {(e)=> setLink(e.target.value)}
                className="appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="links"
                type="text"
                placeholder="Social Links"
              />
            </div>
            <div className="flex items-center justify-between">
            <button
            className="bg-red-600 hover:bg-red-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default AddEventCard