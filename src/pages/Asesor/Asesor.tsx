import { useState } from "react";
import AsesorLoginForm from "../../components/forms/AsesorLoginForm";
import AsesorDashboard from "../../components/AsesorDashboard";
import styles from "./Asesor.module.css";

export default function Asesor() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <AsesorLoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className={styles.asesorContainer}>
      <AsesorDashboard onLogout={() => setIsLoggedIn(false)} />
    </div>
  );
}
