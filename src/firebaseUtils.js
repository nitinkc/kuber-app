import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

export const fetchAccountsFromDB = async (db) => {
    const querySnapshot = await getDocs(collection(db, 'Accounts'));
    return querySnapshot.docs.map((doc) => doc.data());
};

export const fetchRecentRecordsFromDB = async (db, accountAlias) => {
    if (!accountAlias) return [];
    const recordsRef = collection(db, 'MonthlyAccounting');
    const q = query(
        recordsRef,
        where('accountAlias', '==', accountAlias),
        orderBy('date', 'desc'),
        limit(10)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
};
