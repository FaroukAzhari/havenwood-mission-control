import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { setSession } from "../session";

export function RoverLoginPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.roverLogin(login, accessCode);
      setSession(response.user);
      navigate("/rover");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <section className="form-page">
      <p className="eyebrow">Rover Login</p>
      <h1>Access Rover Board</h1>
      <form className="form-card" onSubmit={handleSubmit}>
        <label className="field"><span>Full name or nickname</span><input value={login} onChange={(event) => setLogin(event.target.value)} /></label>
        <label className="field"><span>Access code</span><input type="password" value={accessCode} onChange={(event) => setAccessCode(event.target.value)} /></label>
        {error ? <p className="error-text">{error}</p> : null}
        <button className="button" type="submit">Enter Outpost</button>
      </form>
    </section>
  );
}
