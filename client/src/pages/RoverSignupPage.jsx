import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { setSession } from "../session";

export function RoverSignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", nickname: "", phone: "", emergencyNote: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.roverSignup(form);
      setSession(response.user);
      navigate("/rover");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <section className="form-page">
      <p className="eyebrow">Rover Sign Up</p>
      <h1>Join the Outpost</h1>
      <form className="form-card" onSubmit={handleSubmit}>
        <label className="field"><span>Full name</span><input value={form.fullName} onChange={(event) => update("fullName", event.target.value)} /></label>
        <label className="field"><span>Nickname optional</span><input value={form.nickname} onChange={(event) => update("nickname", event.target.value)} /></label>
        <label className="field"><span>Phone optional</span><input value={form.phone} onChange={(event) => update("phone", event.target.value)} /></label>
        <label className="field"><span>Emergency note optional</span><textarea rows="3" value={form.emergencyNote} onChange={(event) => update("emergencyNote", event.target.value)} /></label>
        <label className="field"><span>Access code</span><input type="password" value={form.password} onChange={(event) => update("password", event.target.value)} /></label>
        <label className="field"><span>Confirm access code</span><input type="password" value={form.confirmPassword} onChange={(event) => update("confirmPassword", event.target.value)} /></label>
        {error ? <p className="error-text">{error}</p> : null}
        <button className="button" type="submit">Create Rover Profile</button>
      </form>
    </section>
  );
}
