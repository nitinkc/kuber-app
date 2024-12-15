import React from "react";
import { FaSignOutAlt } from 'react-icons/fa';
import DashboardNav from '../components/DashboardNav';
import {logoutUser} from "../services/authService";


const Dashboard = ({ user, setUser }) => {
  const handleLogout = async () => {
    await logoutUser();
    setUser(null); // Set user state to null (logged out)
  };

  return (
      <div className="dashboard">
          <h1>Welcome, {user.displayName}</h1>

          <button onClick={handleLogout} className="icon-button logout">
              <FaSignOutAlt size={20}/> Logout
          </button>

          <DashboardNav />
      </div>
  );
};

export default Dashboard;
