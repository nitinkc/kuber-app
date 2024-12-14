import React from "react";
import { auth, signOut } from "./firebase";
import { FaPlus, FaMoneyCheckAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Dashboard = ({ user, setUser }) => {
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null); // Set user state to null (logged out)
  };

  return (
      <div className="dashboard">
          <h1>Welcome, {user.displayName}</h1>

          <button onClick={handleLogout} className="icon-button logout">
              <FaSignOutAlt size={20}/> Logout
          </button>

          <nav className="dashboard-nav">
              <Link to="/add-money" className="icon-link">
                  <FaPlus size={30}/>
                  <span>Add Money</span>
              </Link>
              <Link to="/monthly-accounting" className="icon-link">
                  <FaMoneyCheckAlt size={30}/>
                  <span>Monthly Accounting</span>
              </Link>
              <Link to="/withdraw" className="icon-link">
                  <FaMoneyCheckAlt size={30}/>
                  <span>Withdraw</span>
              </Link>
              <Link to="/add-account" className="icon-link">
                  <FaPlus size={30}/>
                  <span>Add Account</span>
              </Link>
          </nav>
      </div>
  );
};

export default Dashboard;
