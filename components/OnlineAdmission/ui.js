// Small UI pieces shared by the student app and the consultant desk.
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { FiCopy } from "react-icons/fi";
import { tone } from "./client";
import a from "./App.module.css";

export const cx = (...c) => c.filter(Boolean).join(" ");

export function Field({ label, optional, help, err, children, className }) {
  return (
    <label className={cx(a.field, err && a.hasErr, className)}>
      <span className={a.lbl}>
        {label}
        {optional && <span className={a.muted} style={{ fontWeight: 400 }}> (optional)</span>}
      </span>
      {children}
      {help && <div className={a.help}>{help}</div>}
      {err && <div className={a.err}>{err}</div>}
    </label>
  );
}

export function Spinner() {
  return <div className={a.loading}><div className={a.spinner} /></div>;
}

export function Pill({ status, tone: t, children, style }) {
  const k = t ?? tone(status);
  return <span className={cx(a.pill, k && a["pill_" + k])} style={style}>{children}</span>;
}

export function CopyBtn({ text, label }) {
  const copy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(String(text));
      toast.success("Copied: " + text);
    } catch {
      toast.error("Copy failed");
    }
  };
  return (
    <button type="button" className={a.copy} title="Copy" aria-label={"Copy " + (label || text)} onClick={copy}>
      <FiCopy size={15} />
    </button>
  );
}

/** Six single-digit boxes for a pincode. Paste fills them all; Backspace on an empty box goes back. */
export function PinBoxes({ value = "", onChange, onDone, autoFocus }) {
  const refs = useRef([]);
  const digits = (value || "").padEnd(6, " ").slice(0, 6).split("");

  useEffect(() => {
    if (autoFocus) refs.current[Math.min((value || "").length, 5)]?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus]);

  const emit = (v) => {
    onChange?.(v);
    if (v.length === 6) onDone?.(v);
  };

  const onInput = (i, raw) => {
    let d = raw.replace(/\D/g, "");
    const old = (value || "")[i];
    if (d.length === 2 && old && d.includes(old)) d = d.replace(old, ""); // typed into a filled box
    const cur = (value || "").slice(0, i);
    if (d.length > 1) {
      const all = (cur + d).slice(0, 6);
      emit(all);
      refs.current[Math.min(all.length, 5)]?.focus();
      return;
    }
    const arr = (value || "").split("");
    arr[i] = d;
    const next = arr.join("").slice(0, 6);
    // Typing into a box past the current end still keeps digits contiguous.
    const v = d ? (cur.length < i ? cur + d : next) : (value || "").slice(0, i);
    emit(v);
    if (d && i < 5) refs.current[Math.min(v.length, 5)]?.focus();
  };

  const onKey = (i, e) => {
    if (e.key === "Backspace" && !(value || "")[i] && i > 0) {
      e.preventDefault();
      emit((value || "").slice(0, i - 1));
      refs.current[i - 1]?.focus();
    }
  };

  return (
    <div className={a.pinboxes} role="group" aria-label="6-digit pincode">
      {digits.map((ch, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          inputMode="numeric"
          maxLength={6}
          aria-label={`Pincode digit ${i + 1}`}
          autoComplete={i === 0 ? "postal-code" : "off"}
          value={ch.trim()}
          onChange={(e) => onInput(i, e.target.value)}
          onKeyDown={(e) => onKey(i, e)}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
  );
}

/** A native <dialog> that opens while `open` is true. */
export function Dialog({ open, onClose, children, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} className={a.dialog} style={style} onClose={onClose} onCancel={onClose}>
      {open && children}
    </dialog>
  );
}
