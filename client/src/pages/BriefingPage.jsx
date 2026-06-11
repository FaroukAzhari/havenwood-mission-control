export function BriefingPage() {
  return (
    <section className="page-section">
      <p className="eyebrow">A.R.K. Briefing</p>
      <h1>The World in 2200</h1>
      <div className="content-grid">
        <article className="info-card">
          <h2>Collapse</h2>
          <p>Old systems failed after environmental damage, overdependence on technology, and a global infection that turned pressure, fear, and chaos into everyday threats.</p>
        </article>
        <article className="info-card">
          <h2>A.R.K.</h2>
          <p>The Autonomous Recovery Kernel controls rankings, resources, and safe zones. It measures who survives, but it cannot measure why humanity should rebuild.</p>
        </article>
        <article className="info-card">
          <h2>The Last Outpost</h2>
          <p>The Rovers maintain a human-led base where discipline, scouting skill, responsibility, and values matter as much as efficiency.</p>
        </article>
        <article className="info-card">
          <h2>Purpose</h2>
          <p>The camp tests whether humans can rebuild through teamwork and character, not only through winning tasks or collecting points.</p>
        </article>
      </div>
    </section>
  );
}
