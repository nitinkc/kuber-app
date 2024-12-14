import { useEffect, useState } from 'react';
import { db } from './firebase';
import { fetchAccountsFromDB, fetchRecentRecordsFromDB } from './firebaseUtils';

export const useAccounts = () => {
    const [accounts, setAccounts] = useState([]);

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

    return accounts;
};

export const useRecentRecords = (accountAlias) => {
    const [recentRecords, setRecentRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const recordsData = await fetchRecentRecordsFromDB(db, accountAlias);
                setRecentRecords(recordsData);
            } catch (error) {
                console.error('Error fetching recent records:', error);
            }
        };

        if (accountAlias) fetchRecords();
    }, [accountAlias]);

    return recentRecords;
};
