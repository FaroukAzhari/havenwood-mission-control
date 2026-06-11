import { useEffect, useState } from "react";
import { api } from "../api";

const days = ["Day 1", "Day 2", "Day 3", "Day 4"];
const breachReasons = [
  "Lateness",
  "Unsafe behavior",
  "Disrespect",
  "Cheating",
  "Selfish behavior",
  "Poor cleanliness",
  "Wasting resources",
  "Leaving a member behind",
  "Ignoring leader instructions",
  "Breaking night mission boundaries"
];
const repairExamples = [
  "Clean a shared area",
  "Help the opposing faction",
  "Organize tools",
  "Repeat a failed task properly",
  "Prepare water for all factions",
  "Lead the next formation",
  "Resolve a conflict responsibly",
  "Help with kitchen cleanup"
];
const scoreFields = [
  ["survivalSkill", "Survival Skill"],
  ["security", "Security"],
  ["resources", "Resources"],
  ["morale", "Morale"],
  ["humanity", "Humanity"]
];

const initialForm = {
  day: "Day 1",
  factionId: "wardens",
  survivalSkill: 0,
  security: 0,
  resources: 0,
  morale: 0,
  humanity: 0,
  notes: "",
  breachAlerts: [],
  repairMissionsText: ""
};

export function LeaderEvaluationPage() {
  const [factions, setFactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  function refresh() {
    Promise.all([api.getFactions(), api.getEvaluations()]).then(([nextFactions, nextSummary]) => {
      setFactions(nextFactions);
      setSummary(nextSummary);
    });
  }

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (!summary) {
      return;
    }

    const existing = summary.rows.find((row) => row.day === form.day && row.factionId === form.factionId);
    if (existing) {
      setForm((current) => ({
        ...current,
        ...Object.fromEntries(scoreFields.map(([field]) => [field, existing[field]])),
        notes: existing.notes || "",
        breachAlerts: existing.breachAlerts || [],
        repairMissionsText: (existing.repairMissions || []).join("\n")
      }));
    }
  }, [form.day, form.factionId, summary]);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleBreach(reason) {
    setForm((current) => ({
      ...current,
      breachAlerts: current.breachAlerts.includes(reason)
        ? current.breachAlerts.filter((item) => item !== reason)
        : [...current.breachAlerts, reason]
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      ...form,
      repairMissions: form.repairMissionsText.split("\n").map((item) => item.trim()).filter(Boolean)
    };
    await api.saveEvaluation(payload);
    setMessage("Evaluation saved.");
    refresh();
  }

  const total = scoreFields.reduce((sum, [field]) => sum + Number(form[field] || 0), 0);

  return (
    <section className="page-section">
      <p className="eyebrow">Evaluation Board Management</p>
      <h1>Daily Human Override Index</h1>
      <form className="form-card wide" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="field"><span>Day</span><select value={form.day} onChange={(event) => update("day", event.target.value)}>{days.map((day) => <option key={day}>{day}</option>)}</select></label>
          <label className="field"><span>Faction</span><select value={form.factionId} onChange={(event) => update("factionId", event.target.value)}>{factions.map((faction) => <option key={faction.id} value={faction.id}>{faction.name}</option>)}</select></label>
        </div>
        <div className="form-grid">
          {scoreFields.map(([field, label]) => (
            <label className="field" key={field}>
              <span>{label} /20</span>
              <input min="0" max="20" type="number" value={form[field]} onChange={(event) => update(field, event.target.value)} />
            </label>
          ))}
        </div>
        <strong className="total-line">Daily total: {total}/100</strong>
        <label className="field"><span>Leader notes</span><textarea rows="3" value={form.notes} onChange={(event) => update("notes", event.target.value)} /></label>
        <div>
          <span className="field-label">Breach Alerts</span>
          <div className="checkbox-grid">
            {breachReasons.map((reason) => (
              <label key={reason} className="check-row"><input type="checkbox" checked={form.breachAlerts.includes(reason)} onChange={() => toggleBreach(reason)} /> {reason}</label>
            ))}
          </div>
        </div>
        <label className="field">
          <span>Repair Missions</span>
          <textarea rows="4" placeholder={repairExamples.join("\n")} value={form.repairMissionsText} onChange={(event) => update("repairMissionsText", event.target.value)} />
        </label>
        {message ? <p className="success-text">{message}</p> : null}
        <button className="button warning" type="submit">Save Evaluation</button>
      </form>
    </section>
  );
}
