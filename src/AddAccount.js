import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { collection, doc, setDoc } from "firebase/firestore"; // Import necessary Firestore methods
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import BackButton from './components/BackButton';

function AddAccount() {
  const [accountNumber, setAccountNumber] = useState("");
  const [alias, setAlias] = useState("");
  const [currency, setCurrency] = useState("");
  const [balance, setBalance] = useState(0); // Initialize balance state

  const navigate = useNavigate();

  const handleAddAccount = async () => {
    console.log("Account Added:", { accountNumber, alias, currency, balance });

    try {
      // Add account details to Firestore using setDoc
      const accountRef = doc(collection(db, "Accounts"), accountNumber); // Reference to the document
      await setDoc(accountRef, {
        accountNumber,
        alias,
        currency,
        balance, // Include balance field
      });

      console.log(`Account ${alias} added successfully!`);

      // Redirect to Dashboard after adding account
      navigate("/");
    } catch (error) {
      console.error("Error adding account:", error);
    }
  };

  return (
    <div className="form-page">
      <BackButton />

      <h2>Add Account</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddAccount();
        }}
      >
        <FormInput
          label="Account Number:"
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
        />

        <FormInput
          label="Alias:"
          type="text"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          required
        />

        <FormSelect
          label="Currency:"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
          options={[
            { label: "Select Currency", value: "" },
            { label: "INR", value: "INR" },
            { label: "USD", value: "USD" },
            // Add more options here
          ]}
        />

        <FormInput
          label="Balance:"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          required
          min="0"
        />
        <button type="submit">Add Account</button>
      </form>
    </div>
  );
}

export default AddAccount;
