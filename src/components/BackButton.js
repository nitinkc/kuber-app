import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate('/')} className="icon-button back">
            <FaArrowLeft size={20} /> Back to Dashboard
        </button>
    );
};

export default BackButton;
