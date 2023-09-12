import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./Login.module.css";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIncorrect, setEmailIncorrect] = useState(false);
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);

  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // Reset error states
    setEmailIncorrect(false);
    setPasswordIncorrect(false);

    if (email === "djole@gmail.com" && password === "djole95") {
      login(email, password);
    } else {
      if (email !== "djole@gmail.com") {
        setEmailIncorrect(true);
      }
      if (password !== "djole95") {
        setPasswordIncorrect(true);
      }
    }
  }

  function handlePasswordChange(e) {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!newPassword) {
      setPasswordIncorrect(false);
    }
  }

  function handleEmailChange(e) {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!newEmail) {
      setEmailIncorrect(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={handleEmailChange}
            value={email}
          />
          {emailIncorrect && (
            <p className={styles.validation}>Email is incorrect</p>
          )}
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={handlePasswordChange}
            value={password}
          />
          {passwordIncorrect && (
            <p className={styles.validation}>Password is incorrect</p>
          )}
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
