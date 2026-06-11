const criteria = [
  ["Survival Skill", "20", "Scouting ability, pioneering, knots, navigation, first aid, camp setup, and outdoor problem-solving."],
  ["Security", "20", "Discipline, punctuality, safety, order, cleanliness, and respect for boundaries and instructions."],
  ["Resources", "20", "Wise use of tools, food, water, materials, ration cards, and equipment."],
  ["Morale", "20", "Spirit, participation, energy, positivity, and keeping the faction motivated."],
  ["Humanity", "20", "Fairness, loyalty, honesty, inclusion, helping others, and value-based choices under pressure."]
];

export function EvaluationSystemPage() {
  return (
    <section className="page-section">
      <p className="eyebrow">Evaluation System</p>
      <h1>Human Override Index</h1>
      <p className="lead">Each faction is evaluated daily out of 100 points. The strongest faction balances survival ability, order, teamwork, and humanity.</p>
      <div className="criteria-list">
        {criteria.map(([name, points, description]) => (
          <article className="score-row" key={name}>
            <strong>{name}</strong>
            <span>{points} pts</span>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <div className="content-grid">
        <article className="info-card">
          <h2>A.R.K. Score</h2>
          <p>Survival Skill, Security, and Resources measure operational readiness.</p>
        </article>
        <article className="info-card">
          <h2>Human Override Score</h2>
          <p>Morale, Humanity, recovery after mistakes, and leader notes show whether survival still has values.</p>
        </article>
      </div>
    </section>
  );
}
