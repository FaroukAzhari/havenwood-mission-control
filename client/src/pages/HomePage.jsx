import { Link } from "react-router-dom";
import { Shield, LogIn, ClipboardList, UserPlus, Activity } from "lucide-react";

export function HomePage({ settings }) {
  return (
    <section className="home-page">
      <div className="hero">
        <p className="eyebrow">{settings.systemName}</p>
        <h1>{settings.campTitle}</h1>
        <p className="subtitle">{settings.subtitle}</p>
        <p className="hero-text">
          In the year 2200, A.R.K. controls survival through numbers, rankings, and calculated decisions.
          The Last Outpost still believes humanity is more than efficiency. Rovers will be tested through
          discipline, scouting skill, teamwork, and values to prove that survival alone is not enough.
        </p>
        <div className="button-row">
          <Link className="button" to="/signup"><UserPlus size={18} /> Rover Sign Up</Link>
          <Link className="button secondary" to="/rover-login"><LogIn size={18} /> Rover Login</Link>
          <Link className="button warning" to="/leader-login"><Shield size={18} /> Leader Login</Link>
          <Link className="button quiet" to="/rules"><ClipboardList size={18} /> Survival Laws</Link>
          <Link className="button quiet" to="/evaluation-system"><Activity size={18} /> Human Override Index</Link>
        </div>
      </div>

      <section className="content-grid">
        <article className="info-card">
          <p className="eyebrow">A.R.K. Briefing</p>
          <h2>Autonomous Recovery Kernel</h2>
          <p>
            A.R.K. ranks safety, resources, discipline, and recovery. It can calculate survival, but it cannot
            decide what survival is for.
          </p>
        </article>
        <article className="info-card">
          <p className="eyebrow">Outpost Status</p>
          <h2>{settings.outpostStatus}</h2>
          <p>The Outpost is human-led. A.R.K. observes, records, and challenges each faction to rebuild with values.</p>
        </article>
      </section>
    </section>
  );
}
