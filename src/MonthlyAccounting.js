import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { FaArrowLeft } from 'react-icons/fa';
import { fetchAccountsFromDB, fetchRecentRecordsFromDB } from './firebaseUtils';
import { useAccounts, useRecentRecords } from './customHooks';

const MonthlyAccounting = () => {
    const [date, setDate] = useState('');
    const [profitLossAmount, setProfitLossAmount] = useState('');
    const [setAccounts] = useState([]);
    const [accountAlias, setAccountAlias] = useState('');
    const [setRecentRecords] = useState([]);
    const accounts = useAccounts();
    const recentRecords = useRecentRecords(accountAlias);
    const navigate = useNavigate();

    // Fetch accounts for the dropdown
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Accounts'));
                const accountsData = querySnapshot.docs.map((doc) => doc.data());
                setAccounts(accountsData);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };

        fetchAccounts();
    }, []);

    // Fetch the top 10 recent records when accountAlias changes
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const accountsData = await fetchAccountsFromDB(db);
                setAccounts(accountsData);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };

        fetchAccounts();
    }, []);

    useEffect(() => {
        const fetchRecentRecords = async () => {
            try {
                const recordsData = await fetchRecentRecordsFromDB(db, accountAlias);
                setRecentRecords(recordsData);
            } catch (error) {
                console.error('Error fetching recent records:', error);
            }
        };

        fetchRecentRecords();
    }, [accountAlias]);

    // Handle form submission
    const handleAddAccounting = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'MonthlyAccounting'), {
                accountAlias,
                date,
                profitLossAmount: parseFloat(profitLossAmount),
            });

            console.log('Profit/Loss data added successfully!');
            setDate('');
            setProfitLossAmount('');
            fetchRecentRecordsFromDB(); // Refresh recent records after adding
        } catch (error) {
            console.error('Error adding profit/loss data:', error);
        }
    };

    return (
        <div className="form-page">
            <button onClick={() => navigate('/')} className="icon-button back">
                <FaArrowLeft size={20} /> Back to Dashboard
            </button>

            <h2>Monthly Accounting for {accountAlias}</h2>
            <form onSubmit={handleAddAccounting}>
                <div>
                    <label>Account Alias:</label>
                    <select
                        value={accountAlias}
                        onChange={(e) => setAccountAlias(e.target.value)}
                        required
                    >
                        <option value="">Select Account</option>
                        {accounts.map((account, index) => (
                            <option key={index} value={account.alias}>
                                {account.alias}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Profit/Loss Amount:</label>
                    <input
                        type="number"
                        value={profitLossAmount}
                        onChange={(e) => setProfitLossAmount(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Add Profit/Loss</button>
            </form>

            <h3>Recent Records for {accountAlias}</h3>
            {recentRecords.length ? (
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Profit/Loss</th>
                    </tr>
                    </thead>
                    <tbody>
                    {recentRecords.map((record, index) => (
                        <tr key={index}
                            className={record.profitLossAmount < 0 ? 'loss' : ''}>
                            <td>{record.date}</td>
                            <td>{record.profitLossAmount}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            ) : (
                <p>No recent records found for this account.</p>
            )}
        </div>
    );
};

export default MonthlyAccounting;
