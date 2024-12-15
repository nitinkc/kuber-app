import React from "react";
import { Link } from "react-router-dom";
import {
  FaPlusCircle,
  FaRegCalendarAlt,
  FaMoneyBillWave,
  FaUserPlus,
} from "react-icons/fa";

const DashboardNav = () => {
  return (
    <nav className="dashboard-nav">
      <Link to="/add-money" className="icon-link">
        <FaPlusCircle size={30} style={{ color: "#28a745" }} />
        <span>Add Money</span>
      </Link>

      <Link to="/monthly-accounting" className="icon-link">
        <FaRegCalendarAlt size={30} style={{ color: "#007bff" }} />
        <span>Monthly Accounting</span>
      </Link>

      <Link to="/withdraw" className="icon-link">
        <FaMoneyBillWave size={30} style={{ color: "#dc3545" }} />
        <span>Withdraw</span>
      </Link>

      <Link to="/add-account" className="icon-link">
        <FaUserPlus size={30} style={{ color: "#007bff" }} />
        <span>Add Account</span>
      </Link>
    </nav>
  );
};

export default DashboardNav;
