/**
 * Tick one or more courses to link a live class to. Students of any ticked
 * course may join the class; with none ticked, access goes by subject and
 * class as before. Used by the admin and the teacher class forms.
 */
export default function CourseLinkPicker({ courses, value = [], onChange }) {
  const picked = new Set(value.map(String));
  const toggle = (id) =>
    onChange(picked.has(id) ? value.filter((v) => String(v) !== id) : [...value, id]);

  const groups = [
    { title: "Pro batches", list: courses.filter((c) => c.courseType === "bundle") },
    { title: "Single courses", list: courses.filter((c) => c.courseType !== "bundle") },
  ].filter((g) => g.list.length);

  const price = (c) => (c.isFree ? "Free" : c.price ? `₹${c.price}` : "");

  return (
    <div className="clp">
      <div className="clp-head">
        <span>{picked.size ? `${picked.size} course${picked.size > 1 ? "s" : ""} linked` : "No course linked"}</span>
        {picked.size > 0 && (
          <button type="button" className="clp-clear" onClick={() => onChange([])}>Clear</button>
        )}
      </div>

      <div className="clp-list">
        {!groups.length && <div className="clp-empty">No courses match the selected class and subject.</div>}
        {groups.map((g) => (
          <div key={g.title}>
            <div className="clp-group">{g.title}</div>
            {g.list.map((c) => {
              const id = String(c._id);
              return (
                <label key={id} className={`clp-row ${picked.has(id) ? "on" : ""}`}>
                  <input type="checkbox" checked={picked.has(id)} onChange={() => toggle(id)} />
                  <span className="clp-title">{c.title}</span>
                  <span className="clp-meta">
                    {[c.courseType === "bundle" ? "" : c.subject, c.batch, price(c)].filter(Boolean).join(" · ")}
                  </span>
                </label>
              );
            })}
          </div>
        ))}
      </div>

      <style jsx>{`
        .clp { border: 1px solid #e2e8f0; border-radius: 10px; background: #fff; }
        .clp-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 9px 12px; border-bottom: 1px solid #e2e8f0;
          font-size: 0.85rem; font-weight: 600; color: #334155;
        }
        .clp-clear { background: none; border: none; color: #5641ce; font-weight: 600; font-size: 0.82rem; padding: 0; }
        .clp-list { max-height: 280px; overflow-y: auto; padding: 4px 0; }
        .clp-group {
          padding: 8px 12px 4px; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.04em; text-transform: uppercase; color: #94a3b8;
        }
        .clp-row {
          display: flex; align-items: center; gap: 10px; margin: 0;
          padding: 7px 12px; cursor: pointer; font-size: 0.88rem; color: #1e293b;
        }
        .clp-row:hover { background: #f8fafc; }
        .clp-row.on { background: #f1eefc; }
        .clp-row input { width: 16px; height: 16px; flex-shrink: 0; accent-color: #5641ce; }
        .clp-title { flex: 1; min-width: 0; }
        .clp-meta { color: #64748b; font-size: 0.8rem; white-space: nowrap; }
        .clp-empty { padding: 12px; color: #64748b; font-size: 0.85rem; }
        @media (max-width: 576px) {
          .clp-row { flex-wrap: wrap; }
          .clp-meta { width: 100%; padding-left: 26px; white-space: normal; }
        }
      `}</style>
    </div>
  );
}
