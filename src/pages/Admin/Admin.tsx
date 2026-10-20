import { useState } from "react";
import AdminLoginForm from "../../components/forms/AdminLoginForm";
import AdminDashboard from "../../components/AdminDashboard";
import styles from "./Admin.module.css";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const handleLogin = (user: string) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <AdminLoginForm onLogin={handleLogin} />;
  }

  return (
    <div className={styles.adminContainer}>
      <AdminDashboard onLogout={() => {
        setIsLoggedIn(false);
        setCurrentUser("");
      }} />
    </div>
  );
}
