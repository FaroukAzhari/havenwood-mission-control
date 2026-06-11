import { useEffect, useState } from "react";
import { api } from "../api";

export function ManageRoversPage() {
  const [rovers, setRovers] = useState([]);
  const [factions, setFactions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function refresh() {
    Promise.all([api.getRovers(), api.getFactions(), api.getRoles()]).then(([nextRovers, nextFactions, nextRoles]) => {
      setRovers(nextRovers);
      setFactions(nextFactions);
      setRoles(nextRoles);
    });
  }

  useEffect(() => {
    refresh();
  }, []);

  async function assign(rover, patch) {
    setMessage("");
    setError("");

    try {
      const response = await api.updateRoverAssignment(rover.id, {
        factionId: patch.factionId ?? rover.factionId,
        assignedRole: patch.assignedRole ?? rover.assignedRole
      });
      setMessage(response.warning || "Assignment updated.");
      refresh();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  function isRoleTaken(rover, roleId) {
    return rovers.some((otherRover) => (
      otherRover.id !== rover.id &&
      otherRover.factionId === rover.factionId &&
      otherRover.assignedRole === roleId
    ));
  }

  return (
    <section className="page-section">
      <p className="eyebrow">Manage Rovers</p>
      <h1>Faction and Role Assignment</h1>
      <p className="lead">Roles rotate daily during the real camp. Rovers cannot edit their own faction or role.</p>
      {message ? <p className="success-text">{message}</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
      <div className="content-grid">
        {factions.map((faction) => (
          <article className="info-card" key={faction.id}>
            <h2>{faction.name} <span className={faction.memberCount > 5 ? "warning-text" : ""}>{faction.memberCount}/5</span></h2>
            <p>{faction.motto}</p>
            {faction.roles.map((role) => (
              <div className="assignment-row" key={role.id}>
                <strong>{role.name}</strong>
                <span>{role.assignedRover?.displayName || "Unassigned"}</span>
              </div>
            ))}
          </article>
        ))}
      </div>
      <div className="rover-table">
        {rovers.map((rover) => (
          <article className="rover-row" key={rover.id}>
            <div>
              <strong>{rover.displayName}</strong>
              <span>{rover.status}</span>
            </div>
            <select value={rover.factionId || ""} onChange={(event) => assign(rover, { factionId: event.target.value || null, assignedRole: null })}>
              <option value="">Unassigned</option>
              {factions.map((faction) => <option key={faction.id} value={faction.id}>{faction.name}</option>)}
            </select>
            <select value={rover.assignedRole || ""} onChange={(event) => assign(rover, { assignedRole: event.target.value || null })} disabled={!rover.factionId}>
              <option value="">No role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id} disabled={isRoleTaken(rover, role.id)}>
                  {role.name}{isRoleTaken(rover, role.id) ? " - taken" : ""}
                </option>
              ))}
            </select>
          </article>
        ))}
      </div>
    </section>
  );
}
