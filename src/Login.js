import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

const Login = ({ setUser }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // Set user state after login
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
      <div className="form-page">
        <h2>Login to Kuber App</h2>
        <button onClick={handleLogin}>Login with Google</button>
      </div>
  );
};

export default Login;
