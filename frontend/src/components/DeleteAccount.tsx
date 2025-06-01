import React from "react";
import { auth } from "../firebase";
import { deleteUser } from "firebase/auth";

const DeleteAccount: React.FC = () => {
  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.error("No user is signed in.");
      return;
    }

    try {
      await deleteUser(user);
      console.log("User account deleted.");
      // Optionally redirect or update state
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        alert("Please sign in before deleting your account.");
      } else {
        console.error("Error deleting user:", error);
      }
    }
  };

  return <button onClick={handleDeleteAccount}>Delete Account</button>;
};

export default DeleteAccount;
