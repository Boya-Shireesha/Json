// src/LoginPage.jsx
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Check authentication on page load
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) validateToken(token);
//   }, []);

//   // Handle Login
//   const handleLogin = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/login", {
//         username,
//         password,
//       });
//       const { token, message } = response.data;
//       setMessage(message);

//       if (token) {
//         localStorage.setItem("token", token);
//         setIsAuthenticated(true);
//       }
//     } catch (error) {
//       setMessage("Login failed");
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//     setMessage("Logged out successfully");
//   };

//   // Validate Token
//   const validateToken = async (token) => {
//     try {
//       const response = await axios.get("http://localhost:5000/protected", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage(response.data.message);
//       setIsAuthenticated(true);
//     } catch (error) {
//       setMessage("Invalid or expired token");
//       setIsAuthenticated(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="p-6 bg-white rounded-lg shadow-lg w-80">
//         <h1 className="text-2xl font-bold mb-4">Login</h1>
        
//         {!isAuthenticated ? (
//           <>
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="border p-2 mb-2 w-full"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="border p-2 mb-4 w-full"
//             />
//             <button
//               onClick={handleLogin}
//               className="bg-blue-500 text-white p-2 rounded w-full mb-2"
//             >
//               Login
//             </button>
//           </>
//         ) : (
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white p-2 rounded w-full mb-2"
//           >
//             Logout
//           </button>
//         )}
        
//         <p className="mt-2">{message}</p>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import axios from 'axios';

// export default function App() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [token, setToken] = useState('');
//   const [message, setMessage] = useState('');

//   // Login Function
//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/login', { username, password });
//       setToken(response.data.token);
//       setMessage('Login successful');
//     } catch (error) {
//       setMessage('Invalid credentials');
//     }
//   };

//   // Protected Route Access
//   const handleProtected = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/protected', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage('Access denied');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Token-Based Authentication</h1>
//       <input className="border p-2 mb-2" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input className="border p-2 mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button className="bg-blue-500 text-white p-2 rounded mb-2" onClick={handleLogin}>Login</button>
//       <button className="bg-green-500 text-white p-2 rounded" onClick={handleProtected} disabled={!token}>Access Protected Route</button>
//       {message && <p className="mt-4 text-lg font-semibold">{message}</p>}
//     </div>
//   );
// }



// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // export default function App() {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [message, setMessage] = useState('');

// //   useEffect(() => {
// //     // Check if token exists in local storage
// //     const storedToken = localStorage.getItem('token');
// //     if (storedToken) {
// //       setMessage('Token loaded from storage');
// //     }
// //   }, []);

// //   // Login Function
// //   const handleLogin = async () => {
// //     try {
// //       const response = await axios.post('http://localhost:5000/login', { username, password });
// //       localStorage.setItem('token', response.data.token);
// //       setMessage('Login successful');
// //     } catch (error) {
// //       setMessage('Invalid credentials');
// //     }
// //   };

// //   // Protected Route Access
// //   const handleProtected = async () => {
// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       setMessage('No token found. Please log in.');
// //       return;
// //     }
// //     try {
// //       const response = await axios.get('http://localhost:5000/protected', {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       setMessage(response.data.message);
// //     } catch (error) {
// //       setMessage('Access denied');
// //     }
// //   };

// //   // Logout Function
// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     setMessage('Logged out successfully');
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
// //       <h1 className="text-2xl font-bold mb-4">Token-Based Authentication</h1>
// //       <input className="border p-2 mb-2" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
// //       <input className="border p-2 mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
// //       <button className="bg-blue-500 text-white p-2 rounded mb-2" onClick={handleLogin}>Login</button>
// //       <button className="bg-green-500 text-white p-2 rounded mb-2" onClick={handleProtected}>Access Protected Route</button>
// //       <button className="bg-red-500 text-white p-2 rounded" onClick={handleLogout}>Logout</button>
// //       {message && <p className="mt-4 text-lg font-semibold">{message}</p>}
// //     </div>
// //   );
// // }


import React, { useState } from 'react';
import axios from 'axios';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  // Login handler
  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', res.data.token); // store token
      setMessage('Login successful!');
    } catch (err) {
      setMessage('Invalid credentials');
    }
  };

  // Access protected route
  const handleProtected = async () => {
    const token = localStorage.getItem('token');
    if (!token) return setMessage('No token found, please login first.');

    try {
      const res = await axios.get('http://localhost:5000/protected', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage(res.data.message);
      setUser(res.data.user);
    } catch (err) {
      setMessage('Access denied');
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setMessage('Logged out');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Login Page</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2 w-64"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 w-64"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded mb-2 w-64">
        Login
      </button>
      <button onClick={handleProtected} className="bg-green-500 text-white p-2 rounded mb-2 w-64">
        Access Protected Route
      </button>
      <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded w-64">
        Logout
      </button>
      {message && <p className="mt-4 text-lg font-medium">{message}</p>}
      {user && (
        <div className="mt-4 p-4 bg-white rounded shadow w-64 text-sm">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Password:</strong> {user.password}</p>
        </div>
      )}
    </div>
  );
}
export default LoginPage;