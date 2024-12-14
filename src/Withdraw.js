import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, runTransaction } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Withdraw = () => {
    const [accounts, setAccounts] = useState([]);
    const [withdrawFrom, setWithdrawFrom] = useState('');
    const [depositedInto, setDepositedInto] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccounts = async () => {
            const querySnapshot = await getDocs(collection(db, 'Accounts'));
            const accountList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAccounts(accountList);
        };

        fetchAccounts();
    }, []);

    const handleWithdraw = async () => {
        const withdrawFromRef = doc(db, 'Accounts', withdrawFrom);
        const withdrawIntoRef = doc(db, 'Accounts', depositedInto);
        const amountNumber = parseFloat(amount);

        if (!amountNumber || amountNumber <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        if (withdrawFrom === depositedInto) {
            alert('Cannot withdraw and deposit into the same account.');
            return;
        }

        try {
            await runTransaction(db, async (transaction) => {
                // Get current balances of both accounts
                const withdrawFromDoc = await transaction.get(withdrawFromRef);
                const withdrawIntoDoc = await transaction.get(withdrawIntoRef);

                if (!withdrawFromDoc.exists() || !withdrawIntoDoc.exists()) {
                    throw new Error('One or both accounts do not exist.');
                }

                const withdrawFromBalance = withdrawFromDoc.data().balance || 0;
                const withdrawIntoBalance = withdrawIntoDoc.data().balance || 0;

                if (withdrawFromBalance < amountNumber) {
                    throw new Error('Insufficient balance in the withdrawal account.');
                }

                // Update balances
                const newWithdrawFromBalance = withdrawFromBalance - amountNumber;
                const newWithdrawIntoBalance = withdrawIntoBalance + amountNumber;

                transaction.update(withdrawFromRef, { balance: newWithdrawFromBalance });
                transaction.update(withdrawIntoRef, { balance: newWithdrawIntoBalance });

                // Optionally log the transaction (for auditing purposes)
                const transactionRef = doc(collection(db, 'Transactions'));
                transaction.set(transactionRef, {
                    withdrawFrom,
                    withdrawInto: depositedInto,
                    amount: amountNumber,
                    date,
                    comment,
                });
            });

            alert('Transaction completed successfully!');
            navigate('/');
        } catch (error) {
            console.error('Transaction failed:', error);
            alert(`Transaction failed: ${error.message}`);
        }
    };

    return (
        <div className="form-page">
            <button onClick={() => navigate('/')} className="icon-button back">
                <FaArrowLeft size={20} /> Back to Dashboard
            </button>
            <h2>Record Withdrawal</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleWithdraw();
                }}
            >
                <div>
                    <label>Withdraw From:</label>
                    <select
                        value={withdrawFrom}
                        onChange={(e) => setWithdrawFrom(e.target.value)}
                        required
                    >
                        <option value="">Select Account</option>
                        {accounts.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.alias} (Balance: {account.balance || 0})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Withdraw Into:</label>
                    <select
                        value={depositedInto}
                        onChange={(e) => setDepositedInto(e.target.value)}
                        required
                    >
                        <option value="">Select Account</option>
                        {accounts.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.alias} (Balance: {account.balance || 0})
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
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Comment:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button type="submit" className="icon-button submit">
                    Record Withdrawal
                </button>
            </form>
        </div>
    );
};

export default Withdraw;
