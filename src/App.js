import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './pages/Dashboard';
import AddAccount from './AddAccount';
import MonthlyAccounting from './MonthlyAccounting'; // Import MonthlyAccounting
import { auth } from './firebase';
import Withdraw from "./Withdraw";
import AddMoney from "./AddMoney";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        console.log("API Key:", process.env.REACT_APP_API_KEY);

        if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
        <Routes>
          {/* Public route: Login */}
          <Route
              path="/login"
              element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
          />

          {/* Private routes: Require user to be logged in */}
          {user && (
              <>
                  <Route path="/" element={<Dashboard user={user} setUser={setUser} />} />
                <Route path="/add-account" element={<AddAccount user={user} />} />
                <Route path="/monthly-accounting/" element={<MonthlyAccounting />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="/add-money" element={<AddMoney />} />
              </>
          )}

          {/* Fallback: Redirect unauthenticated users to login */}
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
  );
};

export default App;
