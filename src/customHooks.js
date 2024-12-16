import { useEffect, useState } from 'react';
import { db } from './firebase';
import { fetchAccountsFromDB, fetchRecentRecordsFromDB } from './firebaseUtils';

export const useAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAccounts = async () => {
            setLoading(true);
            setError(null);
            try {
                const accountsData = await fetchAccountsFromDB(db);
                setAccounts(accountsData);
            } catch (error) {
                console.error('Error fetching accounts:', error);
                setError('Failed to fetch accounts.');
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    return { accounts, loading, error };
};

export const useRecentRecords = (accountAlias) => {
    const [recentRecords, setRecentRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!accountAlias) {
            setRecentRecords([]);
            return;
        }
        const fetchRecords = async () => {
            setLoading(true);
            setError(null);
            try {
                const recordsData = await fetchRecentRecordsFromDB(db, accountAlias);
                setRecentRecords(recordsData);
            } catch (error) {
                console.error('Error fetching recent records:', error);
                setError('Failed to fetch recent records.');
            } finally {
                setLoading(false);
            }
        };
        fetchRecords();
    }, [accountAlias]);

    return { recentRecords, loading, error };
};
