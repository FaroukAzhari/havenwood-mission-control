import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export function MissionsPage() {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    api.getMissions().then(setMissions);
  }, []);

  const groups = missions.reduce((acc, mission) => {
    acc[mission.day] = [...(acc[mission.day] || []), mission];
    return acc;
  }, {});

  return (
    <section className="page-section">
      <p className="eyebrow">Daily Missions</p>
      <h1>Survival Data and Recovery Codes</h1>
      {Object.entries(groups).map(([day, dayMissions]) => (
        <article className="mission-group" key={day}>
          <h2>{day}</h2>
          <div className="content-grid">
            {dayMissions.map((mission) => (
              <Link className="info-card mission-link" to={`/missions/${mission.id}`} key={mission.id}>
                <span>{mission.points} pts</span>
                <h3>{mission.title}</h3>
                <p>{mission.storyIntro}</p>
              </Link>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
