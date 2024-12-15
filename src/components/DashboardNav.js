import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaMoneyCheckAlt } from 'react-icons/fa';

const DashboardNav = () => {
    return(
    <nav className="dashboard-nav">
    <Link to="/add-money" className="icon-link">
        <FaPlus size={30} />
        <span>Add Money</span>
    </Link>
    <Link to="/monthly-accounting" className="icon-link">
        <FaMoneyCheckAlt size={30} />
        <span>Monthly Accounting</span>
    </Link>
    <Link to="/withdraw" className="icon-link">
        <FaMoneyCheckAlt size={30} />
        <span>Withdraw</span>
    </Link>
    <Link to="/add-account" className="icon-link">
        <FaPlus size={30} />
        <span>Add Account</span>
    </Link>
    </nav>
    )
};

export default DashboardNav;