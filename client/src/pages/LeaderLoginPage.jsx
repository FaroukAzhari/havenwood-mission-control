import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { setSession } from "../session";

export function LeaderLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.leaderLogin(username, password);
      setSession(response.user);
      navigate("/leader");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <section className="form-page">
      <p className="eyebrow">Leader Login</p>
      <h1>Outpost Command</h1>
      <form className="form-card" onSubmit={handleSubmit}>
        <label className="field"><span>Username</span><input value={username} onChange={(event) => setUsername(event.target.value)} /></label>
        <label className="field"><span>Password</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
        {error ? <p className="error-text">{error}</p> : null}
        <button className="button warning" type="submit">Open Command Board</button>
      </form>
    </section>
  );
}
