import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "./firebase";
import { collection, doc, setDoc } from 'firebase/firestore'; // Import necessary Firestore methods
import { FaArrowLeft } from 'react-icons/fa';

function AddAccount() {
  const [accountNumber, setAccountNumber] = useState('');
  const [alias, setAlias] = useState('');
  const [currency, setCurrency] = useState('');
  const [balance, setBalance] = useState(0);  // Initialize balance state

  const navigate = useNavigate();

  const handleAddAccount = async () => {
    console.log('Account Added:', { accountNumber, alias, currency, balance });

    try {
      // Add account details to Firestore using setDoc
      const accountRef = doc(collection(db, 'Accounts'), accountNumber);  // Reference to the document
      await setDoc(accountRef, {
        accountNumber,
        alias,
        currency,
        balance,  // Include balance field
      });

      console.log(`Account ${alias} added successfully!`);

      // Redirect to Dashboard after adding account
      navigate('/');
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };

  return (
    <div className="form-page">
      <button onClick={() => navigate('/')} className="icon-button back">
        <FaArrowLeft size={20}/> Back to Dashboard
      </button>
    <h2>Add Account</h2>
    <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddAccount();
        }}
    >
      <div>
        <label>Account Number:</label>
            <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
            />
          </div>
          <div>
            <label>Alias:</label>
            <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                required
            />
          </div>
          <div>
            <label>Currency:</label>
            <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                required
            >
              <option value="">Select Currency</option>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              {/*<option value="EUR">EUR</option>*/}
              {/*<option value="GBP">GBP</option>*/}
              {/*<option value="AUD">AUD</option>*/}
              {/* You can add more currencies as needed */}
            </select>
          </div>
          <div>
            <label>Balance:</label>
            <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                required
                min="0"
            />
          </div>
          <button type="submit">Add Account</button>
        </form>
      </div>
  );
}

export default AddAccount;
