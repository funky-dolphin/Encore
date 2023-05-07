import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function Signup({setUser}) {

  const [signupUsername, setSignupUsername] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupCity, setSignupCity] = useState("")
  const [signupAddress, setSignupAddress] = useState("")
  const [isArtist, setIsArtist] = useState(false)
  const [signupBandName, setSignupBandName] = useState('')
  const navigate = useNavigate()

  function handleSignupSubmit(e){
    e.preventDefault();
    const new_user = {
      username : signupUsername, 
      email: signupEmail, 
      _password_hash: signupPassword, 
      city: signupCity,
      address: signupAddress,
      is_artist : isArtist,
      band_name : signupBandName,
    }
    fetch("http://127.0.0.1:5555/signup", {
      method: "POST",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify(new_user),
    })
    .then((res)=> res.json())
    .then((data)=> setUser(data))
    navigate('/login')
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-black text-white rounded-lg p-6">
        <h2 className="text-3xl mb-6 font-bold">Signup Form</h2>
        <form onSubmit = {handleSignupSubmit}> 
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="username">
              Username
            </label>
            <input onChange = {(e) => setSignupUsername(e.target.value)}
              className="appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="email">
              Email
            </label>
            <input onChange = {(e) => setSignupEmail(e.target.value)}
              className="appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="password">
              Password
            </label>
            <input onChange = {(e)=> setSignupPassword(e.target.value)}
              className="appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white mb-1 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="*************"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="city">
              City
            </label>
            <input onChange = {(e)=> setSignupCity(e.target.value)}
              className="appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              type="text"
              placeholder="City"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="address">
              Address
            </label>
            <input onChange = {(e)=> setSignupAddress(e.target.value)}
              className="appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="Address"
              type="text"
              placeholder="Address"
            />
          </div>
          <input
                  className="py-2"
                  type="checkbox"
                  id="is_artist"
                  name="is_artist"
                  onChange={(e) => {
                    setIsArtist(e.target.checked);
                    if (e.target.checked) {
                      alert("Remember, one great rock show can change the world. Promote wisely!");
                    }
                  }}
                />
            <label htmlFor="is_artist">Sign up as an artist</label>
            {isArtist && (
            <div>
              <label htmlFor="band_name">Band Name:</label>
              <input
                className="appearance-none bg-gray-800 rounded w-full py-2 px-5 text-white leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="band_name"
                placeholder="Band"
                onChange={(e) => setSignupBandName(e.target.value)}
              />
            </div>
          )}
          <div className="flex items-center justify-between">
          <button
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
