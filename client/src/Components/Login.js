import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({setUser}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate()

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const loginUser = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    };
    fetch('/login', loginUser)
    .then(response => {
      if (!response.ok){
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      return response.json();
    })
    .then(data => {
      setUser(data);
      navigate("/");
    })
    .catch(error => {
      console.error("error during fetch:", error)
    });
}

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-c2 w-full max-w-md bg-black text-white rounded-lg p-6">
        <h2 className="text-3xl mb-6 font-bold">Login Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="username">
              Username
            </label>
            <input
              onChange={handleUsernameChange}
              value={username}
              className="appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-400" htmlFor="password">
              Password
            </label>
            <input
              onChange={handlePasswordChange}
              value={password}
              className="appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-c3 hover:bg-c4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
