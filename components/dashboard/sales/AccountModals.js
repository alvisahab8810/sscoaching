import { useState } from "react";
import { toast } from "sonner";
import { MdRefresh, MdContentCopy, MdCheck } from "react-icons/md";
import ConfirmModal from "./ConfirmModal";
import { generatePassword } from "./shared";

/**
 * The three account actions an admin takes on a sales person, shared by the
 * team list and the profile page. Each calls onDone() after a success.
 */

async function patch(id, body) {
  const res = await fetch(`/api/admin/sales/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Something went wrong");
  return data;
}

export function StatusModal({ person, onClose, onDone }) {
  const [busy, setBusy] = useState(false);
  const deactivating = person.status === "active";

  const confirm = async () => {
    setBusy(true);
    try {
      const data = await patch(person._id, { action: "status", status: deactivating ? "inactive" : "active" });
      const what = deactivating ? "deactivated" : "activated";
      if (data.emailSent) toast.success(`${person.name} ${what}. Email sent.`);
      else toast.success(`${person.name} ${what}. (Email could not be sent.)`);
      onDone(data.data);
    } catch (err) {
      toast.error(err.message);
    }
    setBusy(false);
  };

  return (
    <ConfirmModal
      title={deactivating ? "Deactivate sales person" : "Activate sales person"}
      subtitle={person.name}
      danger={deactivating}
      confirmLabel={deactivating ? "Deactivate" : "Activate"}
      busyLabel={deactivating ? "Deactivating…" : "Activating…"}
      busy={busy}
      onCancel={onClose}
      onConfirm={confirm}
    >
      {deactivating ? (
        <>
          <p>
            Are you sure you want to deactivate <strong>{person.name}</strong>?
          </p>
          <p className="sl-faint" style={{ fontSize: "0.84rem" }}>
            They will be emailed, signed out within 30 seconds and blocked from logging in. New leads will skip
            them. Leads already assigned stay with them.
          </p>
        </>
      ) : (
        <>
          <p>
            Activate <strong>{person.name}</strong> again?
          </p>
          <p className="sl-faint" style={{ fontSize: "0.84rem" }}>
            They will be emailed, can log in with their existing password, and rejoin the lead rotation.
          </p>
        </>
      )}
    </ConfirmModal>
  );
}

export function PasswordModal({ person, onClose, onDone }) {
  const [password, setPassword] = useState(() => generatePassword());
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const tooShort = password.trim().length < 6;

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confirm = async () => {
    if (tooShort) return toast.error("Password must be at least 6 characters");
    setBusy(true);
    try {
      const data = await patch(person._id, { action: "password", password });
      if (data.emailSent) toast.success("Password reset. New password emailed.");
      else toast.success("Password reset. (Email could not be sent — share it manually.)");
      onDone(data.data);
    } catch (err) {
      toast.error(err.message);
    }
    setBusy(false);
  };

  return (
    <ConfirmModal
      title="Reset password"
      subtitle={person.name}
      confirmLabel="Reset & Email"
      busyLabel="Resetting…"
      busy={busy}
      onCancel={onClose}
      onConfirm={confirm}
    >
      <label className="sl-label">New password</label>
      <div style={{ display: "flex", gap: 6 }}>
        <input
          className={`sl-input ${tooShort ? "error" : ""}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ fontFamily: "monospace", letterSpacing: "0.04em" }}
        />
        <button type="button" className="sl-icon-btn" onClick={() => setPassword(generatePassword())} title="Generate">
          <MdRefresh size={18} />
        </button>
        <button type="button" className={`sl-icon-btn ${copied ? "success" : ""}`} onClick={copy} title="Copy">
          {copied ? <MdCheck size={18} /> : <MdContentCopy size={16} />}
        </button>
      </div>
      {tooShort && <div className="sl-error">At least 6 characters</div>}
      <p className="sl-hint" style={{ marginTop: 10 }}>
        The old password stops working right away. The new one is emailed to <strong>{person.email}</strong>.
      </p>
    </ConfirmModal>
  );
}

export function DeleteModal({ person, team = [], onClose, onDone }) {
  const [moveTo, setMoveTo] = useState("");
  const [busy, setBusy] = useState(false);
  const others = team.filter((p) => String(p._id) !== String(person._id));
  const leadCount = person.stats?.assigned ?? 0;

  const confirm = async () => {
    setBusy(true);
    try {
      const qs = moveTo ? `?moveTo=${moveTo}` : "";
      const res = await fetch(`/api/admin/sales/${person._id}${qs}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Could not delete");
      toast.success(
        data.movedTo
          ? `${person.name} deleted. ${data.leadsMoved} leads moved to ${data.movedTo}.`
          : `${person.name} deleted. ${data.leadsMoved} leads are now unassigned.`
      );
      onDone();
    } catch (err) {
      toast.error(err.message);
    }
    setBusy(false);
  };

  return (
    <ConfirmModal
      title="Delete sales person"
      subtitle="This cannot be undone"
      danger
      confirmLabel="Delete Permanently"
      busyLabel="Deleting…"
      busy={busy}
      onCancel={onClose}
      onConfirm={confirm}
    >
      <p>
        Are you sure you want to permanently delete <strong>{person.name}</strong> ({person.email})?
      </p>
      <p className="sl-faint" style={{ fontSize: "0.84rem" }}>
        Their login and activity log will be removed. Their leads are kept.
      </p>

      <label className="sl-label" style={{ marginTop: 12 }}>
        Their {leadCount} lead{leadCount === 1 ? "" : "s"} should go to
      </label>
      <select className="sl-select" style={{ width: "100%" }} value={moveTo} onChange={(e) => setMoveTo(e.target.value)}>
        <option value="">Leave unassigned (admin only)</option>
        {others.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
            {p.status !== "active" ? " (inactive)" : ""}
          </option>
        ))}
      </select>
    </ConfirmModal>
  );
}
