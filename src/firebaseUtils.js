import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

// Fetch accounts from the Firestore database
export const fetchAccountsFromDB = async (db) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'Accounts'));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id, // Include the document ID for potential use
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching accounts from Firestore:', error);
        throw new Error('Failed to fetch accounts from the database.');
    }
};

// Fetch recent records for a specific account alias from Firestore
export const fetchRecentRecordsFromDB = async (db, accountAlias) => {
    if (!accountAlias) return [];

    try {
        const recordsRef = collection(db, 'MonthlyAccounting');
        const q = query(
            recordsRef,
            where('accountAlias', '==', accountAlias),
            orderBy('date', 'desc'),
            limit(10)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id, // Include the document ID for potential use
            ...doc.data(),
        }));
    } catch (error) {
        console.error(`Error fetching recent records for account alias "${accountAlias}":`, error);
        throw new Error(`Failed to fetch recent records for ${accountAlias}.`);
    }
};
