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
  const [signupState, setSignupState] = useState('')
  const navigate = useNavigate()

 async function handleSignupSubmit(e){
    e.preventDefault();
    const new_user = {
      username : signupUsername, 
      email: signupEmail, 
      _password_hash: signupPassword, 
      city: signupCity,
      address: signupAddress,
      state: signupState,
      is_artist : isArtist,
      band_name : signupBandName,
    }
    const resp=await fetch("/signup", {
      method: "POST",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify(new_user),
    })
    try{
      if(resp.ok){
        const data= await resp.json()
        navigate('/login')
        console.log(data)
      }else{
          const data=await resp.json()
          alert(data.error)
      }}
    catch(error){
      console.log(error)
    }
  }

    

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-c2 w-full max-w-md bg-black text-white rounded-lg p-6">
        <h2 className="text-3xl mb-6 font-bold">Signup Form</h2>
        <form onSubmit = {handleSignupSubmit}> 
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-black" htmlFor="username">
              Username
            </label>
            <input onChange = {(e) => setSignupUsername(e.target.value)}
              className="appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
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
              className="appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
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
              className="appearance-none rounded w-full py-2 px-3 text-white mb-1 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="*************"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="city">
              State Code
            </label>
            <input onChange = {(e)=> setSignupState(e.target.value)}
              className="appearance-none  rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="state"
              type="text"
              placeholder="ie: NY, CA, MA"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="city">
              City
            </label>
            <input onChange = {(e)=> setSignupCity(e.target.value)}
              className="appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
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
              className="appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
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
                className="appearance-none bg-white rounded w-full py-2 px-5 text-white leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="band_name"
                placeholder="Band"
                onChange={(e) => setSignupBandName(e.target.value)}
              />
            </div>
          )}
          <div className="flex items-center justify-between">
          <button
          className="bg-c3 hover:bg-c4 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
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
