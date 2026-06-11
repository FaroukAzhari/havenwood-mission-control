import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

export function MissionDetailPage() {
  const { missionId } = useParams();
  const [mission, setMission] = useState(null);

  useEffect(() => {
    api.getMission(missionId).then(setMission);
  }, [missionId]);

  if (!mission) {
    return <div className="notice">Loading mission file...</div>;
  }

  return (
    <section className="page-section">
      <p className="eyebrow">{mission.day}</p>
      <h1>{mission.title}</h1>
      <div className="content-grid">
        <article className="info-card"><h2>Brief</h2><p>{mission.storyIntro}</p></article>
        <article className="info-card"><h2>Objective</h2><p>{mission.objective}</p></article>
        <article className="info-card"><h2>Recovery Code</h2><p>{mission.clueText}</p></article>
        <article className="info-card"><h2>Materials</h2><p>{mission.materials.join(", ")}</p></article>
      </div>
    </section>
  );
}
