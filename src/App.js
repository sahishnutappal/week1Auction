import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Features from './components/Features';
import Items from './components/Items';
import List from './components/List';
import About from './components/About';
import Subscribe from './components/Subscribe';
import Layout from './components/Layout';
import Registration from './components/Registration';
import AddItem from './components/AddItem';
import Messages from './components/Messages';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/check-session', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Failed to fetch session data');

        const data = await response.json();
        if (data.user) setLoggedInUser(data.user);
      } catch (err) {
        console.error('Session check error:', err);
      }
    };

    checkSession();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Wrapper */}
        <Route element={<Layout loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />}>
          <Route path='/' element={<><Home /><Features /><List /><Subscribe /></>} />
          <Route path='/about' element={<About />} />
          <Route path='/bid' element={<><Items /><AddItem loggedInUser={loggedInUser} /></>} />
          <Route path='/messages' element={<Messages />} />
        </Route>

        {/* Login Route - Redirect if already logged in */}
        <Route 
          path='/login' 
          element={loggedInUser ? <Navigate to="/" /> : <Registration loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
