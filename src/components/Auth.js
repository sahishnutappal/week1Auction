import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Safely parse user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setLoggedInUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedInUser(null);
  };

  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav>
          {loggedInUser ? (
            <>
              <h2>Hi, {loggedInUser.name} 👋</h2>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
            </>
          )}
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
