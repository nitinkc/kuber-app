import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import {
    collection,
    doc,
    addDoc,
    getDocs,
    getDoc,
    query,
    where,
    orderBy,
    limit,
    updateDoc,
} from 'firebase/firestore';
import BackButton from './components/BackButton';

const AddMoney = () => {
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [accountAlias, setAccountAlias] = useState('');
    const [currentBalance, setCurrentBalance] = useState(null);
    const [recentDeposits, setRecentDeposits] = useState([]);

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

    // Fetch current balance and recent deposits when accountAlias changes
    useEffect(() => {
        const fetchAccountDetails = async () => {
            if (!accountAlias) return;

            try {
                // Fetch current balance
                const accountDoc = await getDoc(doc(db, 'Accounts', accountAlias));
                if (accountDoc.exists()) {
                    setCurrentBalance(accountDoc.data().balance || 0);
                }

                // Fetch recent deposits
                const depositsRef = collection(db, 'Deposits');
                const q = query(
                    depositsRef,
                    where('accountAlias', '==', accountAlias),
                    orderBy('date', 'desc'),
                    limit(10)
                );
                const querySnapshot = await getDocs(q);
                const depositsData = querySnapshot.docs.map((doc) => doc.data());
                setRecentDeposits(depositsData);
            } catch (error) {
                console.error('Error fetching account details:', error);
            }
        };

        fetchAccountDetails();
    }, [accountAlias]);

    // Handle form submission
    const handleAddFunds = async (e) => {
        e.preventDefault();

        try {
            // Add deposit to the Deposits collection
            await addDoc(collection(db, 'Deposits'), {
                accountAlias,
                amount: parseFloat(amount),
                comment,
                date: new Date().toISOString(),
            });

            // Update the account balance
            const accountRef = doc(db, 'Accounts', accountAlias);
            await updateDoc(accountRef, {
                balance: (currentBalance || 0) + parseFloat(amount),
            });

            console.log('Funds added successfully!');
            setAmount('');
            setComment('');
            setCurrentBalance((currentBalance || 0) + parseFloat(amount));
            setRecentDeposits((prev) => [
                {
                    accountAlias,
                    amount: parseFloat(amount),
                    comment,
                    date: new Date().toISOString(),
                },
                ...prev,
            ]);
        } catch (error) {
            console.error('Error adding funds:', error);
        }
    };

    return (
        <div className="form-page">
            <BackButton />

            <h2>Add Money to {accountAlias}</h2>
            <form onSubmit={handleAddFunds}>
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
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="1"
                    />
                </div>

                <div>
                    <label>Comment:</label>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                <button type="submit">Add Funds</button>
            </form>

            {currentBalance !== null && (
                <h3>Current Balance: ${currentBalance.toFixed(2)}</h3>
            )}

            <h3>Recent Deposits for {accountAlias}</h3>
            {recentDeposits.length ? (
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Comment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {recentDeposits.map((deposit, index) => (
                        <tr key={index}>
                            <td>{new Date(deposit.date).toLocaleDateString()}</td>
                            <td>{deposit.amount}</td>
                            <td>{deposit.comment}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No recent deposits found for this account.</p>
            )}
        </div>
    );
};

export default AddMoney;