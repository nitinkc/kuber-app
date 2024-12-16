import React, {useState} from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAccounts, useRecentRecords } from './customHooks';
import BackButton from './components/BackButton';
import FormInput from './components/FormInput';

const MonthlyAccounting = () => {
    const [date, setDate] = useState('');
    const [profitLossAmount, setProfitLossAmount] = useState('');
    const [accountAlias, setAccountAlias] = useState('');

    // Use hooks for accounts and recent records
    const { accounts, loading: accountsLoading, error: accountsError } = useAccounts();
    const { recentRecords, loading: recordsLoading, error: recordsError } = useRecentRecords(accountAlias);
   
    // Define today variable to disable future dates
    const today = new Date().toISOString().split('T')[0]; // Gets today's date in YYYY-MM-DD format

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
        } catch (error) {
            console.error('Error adding profit/loss data:', error);
        }
    };

    return (
        <div className="form-page">
            <BackButton />

            <h2>Monthly Accounting for {accountAlias}</h2>
            {accountsLoading ? (
                <p>Loading accounts...</p>
            ) : accountsError ? (
                <p>{accountsError}</p>
            ) : (
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

                    <FormInput
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        max={today}
                    />

                    <FormInput
                        label="Profit/Loss Amount"
                        type="number"
                        value={profitLossAmount}
                        onChange={(e) => setProfitLossAmount(e.target.value)}
                        required
                        min="0"
                        step="0.01"
                    />

                    <button type="submit">Add Profit/Loss</button>
                </form>
            )}

            <h3>Recent Records for {accountAlias}</h3>
            {recordsLoading ? (
                <p>Loading recent records...</p>
            ) : recordsError ? (
                <p>{recordsError}</p>
            ) : recentRecords.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Profit/Loss</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentRecords.map((record, index) => (
                            <tr
                                key={index}
                                className={record.profitLossAmount < 0 ? 'loss' : ''}
                            >
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