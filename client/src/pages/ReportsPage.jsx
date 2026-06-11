import { useEffect, useState } from "react";
import { api } from "../api";

export function ReportsPage() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    api.getReports().then(setReport);
  }, []);

  if (!report) {
    return <div className="notice">Compiling final report...</div>;
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "last-outpost-report.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="page-section print-surface">
      <p className="eyebrow">Final Awards</p>
      <h1>Outpost Report</h1>
      <div className="button-row">
        <button className="button" type="button" onClick={exportJson}>Export JSON</button>
        <button className="button quiet" type="button" onClick={() => window.print()}>Print</button>
      </div>
      <div className="content-grid">
        <article className="info-card">
          <h2>Leading Faction</h2>
          <p>{report.bestFaction?.name || "No scores yet"}</p>
        </article>
        {report.standings.map((faction) => (
          <article className="info-card" key={faction.id}>
            <h2>{faction.name}</h2>
            <p>{faction.cumulativeTotal} cumulative points</p>
          </article>
        ))}
      </div>
    </section>
  );
}
