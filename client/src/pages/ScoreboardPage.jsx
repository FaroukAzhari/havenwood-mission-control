import { useEffect, useState } from "react";
import { api } from "../api";

const fields = [
  ["survivalSkill", "Survival"],
  ["security", "Security"],
  ["resources", "Resources"],
  ["morale", "Morale"],
  ["humanity", "Humanity"]
];

export function ScoreboardPage() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.getEvaluations().then(setSummary);
  }, []);

  if (!summary) {
    return <div className="notice">Loading Faction Board...</div>;
  }

  return (
    <section className="page-section">
      <p className="eyebrow">Faction Board</p>
      <h1>Human Override Index</h1>
      <div className="scoreboard-grid">
        {summary.cumulative.map((entry) => (
          <article className="score-card" key={entry.faction.id}>
            <h2>{entry.faction.name}</h2>
            <p>{entry.faction.motto}</p>
            <strong>{entry.total} cumulative points</strong>
            {entry.days.map((evaluation, index) => (
              <div className="day-score" key={`${entry.faction.id}-${index}`}>
                <span>Day {index + 1}</span>
                <strong>{evaluation?.total ?? 0}/100</strong>
                {evaluation ? (
                  <div className="mini-score-grid">
                    {fields.map(([field, label]) => <span key={field}>{label}: {evaluation[field]}</span>)}
                  </div>
                ) : <p>No score entered.</p>}
                {evaluation?.breachAlerts?.length ? <p>Breach Alerts: {evaluation.breachAlerts.join(", ")}</p> : null}
                {evaluation?.repairMissions?.length ? <p>Repair Missions: {evaluation.repairMissions.join(", ")}</p> : null}
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
