import { MdClose } from "react-icons/md";

/**
 * The "are you sure" box, in the same design as the Leads page's delete
 * confirmation. Needs <SalesStyles /> on the page.
 */
export default function ConfirmModal({
  title,
  subtitle,
  danger = false,
  confirmLabel = "Confirm",
  busyLabel = "Please wait…",
  busy = false,
  onCancel,
  onConfirm,
  children,
}) {
  return (
    <div className="sl-modal-backdrop" onClick={() => !busy && onCancel()}>
      <div className="sl-modal" onClick={(e) => e.stopPropagation()}>
        <div className={`sl-modal-head ${danger ? "danger" : ""}`}>
          <div>
            <h5>{title}</h5>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button onClick={onCancel} disabled={busy} aria-label="Close">
            <MdClose size={18} />
          </button>
        </div>

        <div className="sl-modal-body">{children}</div>

        <div className="sl-modal-foot">
          <button className="sl-btn-ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button className={`sl-btn ${danger ? "danger" : ""}`} onClick={onConfirm} disabled={busy}>
            {busy ? busyLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
