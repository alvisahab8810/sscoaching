/**
 * Shared look for the sales pages. Same palette and shapes as the Leads page
 * (crm-*), under an sl- prefix so the two never collide.
 */
export default function SalesStyles() {
  return (
    <style jsx global>{`
      .sl-bg {
        background: #f1f5f9;
      }
      .sl-head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 16px;
      }
      .sl-title {
        font-weight: 700;
        color: #0f172a;
        margin: 0;
      }
      .sl-sub {
        margin: 2px 0 0;
        color: #64748b;
        font-size: 0.86rem;
      }
      .sl-back {
        color: #5641ce;
        font-size: 0.85rem;
        font-weight: 600;
        text-decoration: none;
        display: inline-block;
        margin-bottom: 6px;
        cursor: pointer;
      }

      .sl-btn {
        background: #5641ce;
        color: #fff;
        border: none;
        border-radius: 10px;
        padding: 9px 18px;
        font-weight: 600;
        font-size: 0.88rem;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        text-decoration: none;
        white-space: nowrap;
      }
      .sl-btn:hover {
        color: #fff;
        background: #4834b5;
      }
      .sl-btn:disabled {
        opacity: 0.6;
      }
      .sl-btn.danger {
        background: #b91c1c;
      }
      .sl-btn.success {
        background: #15803d;
      }
      .sl-btn-ghost {
        background: #fff;
        color: #334155;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 9px 18px;
        font-weight: 600;
        font-size: 0.88rem;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        text-decoration: none;
        white-space: nowrap;
      }
      .sl-btn-ghost:disabled {
        opacity: 0.6;
      }
      .sl-icon-btn {
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        width: 40px;
        height: 40px;
        color: #475569;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
      }
      .sl-icon-btn.sm {
        width: 32px;
        height: 32px;
        border-radius: 8px;
      }
      .sl-icon-btn.brand {
        color: #5641ce;
        border-color: #ded7f6;
        background: #f1eefc;
      }
      .sl-icon-btn.danger {
        color: #ef4444;
        border-color: #fecaca;
        background: #fef2f2;
      }
      .sl-icon-btn.success {
        color: #15803d;
        border-color: #bbf7d0;
        background: #f0fdf4;
      }
      .sl-icon-btn:disabled {
        opacity: 0.5;
      }

      .sl-card {
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 14px;
        padding: 16px;
        margin-bottom: 14px;
      }
      .sl-card-title {
        font-size: 0.95rem;
        font-weight: 700;
        color: #0f172a;
        margin: 0 0 12px;
      }
      .sl-card-title small {
        font-weight: 500;
        color: #94a3b8;
        font-size: 0.78rem;
        margin-left: 6px;
      }

      .sl-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
        gap: 12px;
        margin-bottom: 14px;
      }
      .sl-stat {
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 14px;
        padding: 14px 16px;
      }
      .sl-stat-label {
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #94a3b8;
      }
      .sl-stat-value {
        font-size: 1.6rem;
        font-weight: 800;
        color: #0f172a;
        line-height: 1.2;
        margin-top: 4px;
      }
      .sl-stat-value.brand {
        color: #5641ce;
      }
      .sl-stat-note {
        font-size: 0.76rem;
        color: #64748b;
        margin-top: 2px;
      }

      .sl-toolbar {
        display: flex;
        gap: 10px;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 14px;
      }
      .sl-search {
        position: relative;
        flex: 1 1 280px;
      }
      .sl-search input {
        width: 100%;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 10px 14px 10px 38px;
        font-size: 0.88rem;
        background: #f8fafc;
      }
      .sl-search-icon {
        position: absolute;
        left: 13px;
        top: 0;
        bottom: 0;
        display: inline-flex;
        align-items: center;
        color: #94a3b8;
        pointer-events: none;
      }
      .sl-select,
      .sl-input {
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 9px 12px;
        font-size: 0.88rem;
        background: #fff;
        color: #334155;
      }
      .sl-input {
        width: 100%;
      }
      .sl-input:focus,
      .sl-select:focus,
      .sl-search input:focus {
        outline: none;
        border-color: #5641ce;
      }
      .sl-input.error {
        border-color: #ef4444;
      }
      .sl-label {
        display: block;
        font-size: 0.8rem;
        font-weight: 600;
        color: #334155;
        margin-bottom: 4px;
      }
      .sl-error {
        color: #ef4444;
        font-size: 0.76rem;
        margin-top: 3px;
      }
      .sl-hint {
        color: #64748b;
        font-size: 0.78rem;
        margin-top: 4px;
      }
      .sl-count {
        font-weight: 700;
        color: #0f172a;
        font-size: 0.9rem;
        margin-left: auto;
      }
      .sl-empty {
        color: #64748b;
        padding: 24px 0;
        margin: 0;
        text-align: center;
      }

      .sl-table-wrap {
        overflow-x: auto;
      }
      .sl-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.85rem;
      }
      .sl-table thead th {
        text-align: left;
        font-size: 0.7rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #94a3b8;
        font-weight: 700;
        padding: 10px 12px;
        border-bottom: 1px solid #e2e8f0;
        white-space: nowrap;
      }
      .sl-table tbody td {
        padding: 12px;
        border-bottom: 1px solid #f1f5f9;
        vertical-align: middle;
        color: #334155;
        white-space: nowrap;
      }
      .sl-table tfoot td {
        padding: 12px;
        font-weight: 700;
        color: #0f172a;
        border-top: 2px solid #e2e8f0;
        white-space: nowrap;
      }
      .sl-table .num {
        text-align: right;
      }
      .sl-strong {
        font-weight: 600;
        color: #0f172a;
      }
      .sl-faint {
        font-size: 0.74rem;
        color: #94a3b8;
      }
      .sl-id {
        background: #f1eefc;
        color: #4634ad;
        border: 1px solid #ded7f6;
        border-radius: 6px;
        padding: 3px 8px;
        font-size: 0.74rem;
        font-weight: 700;
        white-space: nowrap;
      }
      .sl-avatar {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: #5641ce;
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.85rem;
        flex-shrink: 0;
      }
      .sl-avatar.lg {
        width: 56px;
        height: 56px;
        font-size: 1.3rem;
      }
      .sl-person {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .sl-actions {
        display: flex;
        gap: 6px;
      }

      .sl-pill {
        display: inline-block;
        border-radius: 999px;
        padding: 3px 12px;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: capitalize;
      }
      .sl-pill.active {
        background: #dcfce7;
        color: #15803d;
      }
      .sl-pill.inactive {
        background: #fee2e2;
        color: #b91c1c;
      }
      .sl-tag {
        display: inline-block;
        background: #f1eefc;
        color: #5641ce;
        border-radius: 999px;
        padding: 2px 10px;
        font-size: 0.72rem;
        font-weight: 600;
        margin: 0 4px 4px 0;
      }

      .sl-chip {
        border: 1px solid #e2e8f0;
        background: #fff;
        color: #475569;
        border-radius: 999px;
        padding: 5px 16px;
        font-size: 0.82rem;
        font-weight: 600;
      }
      .sl-chip.active {
        background: #5641ce;
        border-color: #5641ce;
        color: #fff;
      }

      .sl-switch {
        position: relative;
        width: 42px;
        height: 24px;
        border-radius: 999px;
        border: none;
        background: #cbd5e1;
        transition: background 0.2s;
        flex-shrink: 0;
      }
      .sl-switch::after {
        content: "";
        position: absolute;
        top: 3px;
        left: 3px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #fff;
        transition: left 0.2s;
      }
      .sl-switch.on {
        background: #5641ce;
      }
      .sl-switch.on::after {
        left: 21px;
      }
      .sl-switch:disabled {
        opacity: 0.6;
      }

      .sl-grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
      }
      .sl-grid-side {
        display: grid;
        grid-template-columns: 340px 1fr;
        gap: 14px;
        align-items: start;
      }
      @media (max-width: 992px) {
        .sl-grid-2,
        .sl-grid-side {
          grid-template-columns: 1fr;
        }
      }

      .sl-tabs {
        display: flex;
        gap: 6px;
        border-bottom: 1px solid #e2e8f0;
        margin-bottom: 14px;
        flex-wrap: wrap;
      }
      .sl-tab {
        background: none;
        border: none;
        border-bottom: 2px solid transparent;
        padding: 8px 14px;
        font-weight: 600;
        font-size: 0.88rem;
        color: #64748b;
        margin-bottom: -1px;
      }
      .sl-tab.active {
        color: #5641ce;
        border-bottom-color: #5641ce;
      }

      .sl-kv {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        padding: 9px 0;
        border-bottom: 1px solid #f1f5f9;
        font-size: 0.86rem;
      }
      .sl-kv:last-child {
        border-bottom: none;
      }
      .sl-kv span:first-child {
        color: #64748b;
      }
      .sl-kv span:last-child {
        color: #0f172a;
        font-weight: 600;
        text-align: right;
        word-break: break-all;
      }

      .sl-perm {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        cursor: pointer;
        background: #fff;
        margin: 0;
      }
      .sl-perm.on {
        border-color: #5641ce;
        background: #faf8ff;
      }
      .sl-perm input {
        width: 15px;
        height: 15px;
        accent-color: #5641ce;
        flex-shrink: 0;
      }
      .sl-perm-name {
        font-weight: 600;
        font-size: 0.85rem;
        color: #0f172a;
      }
      .sl-perm.on .sl-perm-name {
        color: #5641ce;
      }
      .sl-perm-desc {
        font-size: 0.72rem;
        color: #94a3b8;
      }

      .sl-bar-track {
        height: 8px;
        border-radius: 999px;
        background: #f1f5f9;
        overflow: hidden;
      }
      .sl-bar-fill {
        height: 100%;
        border-radius: 999px;
        background: #5641ce;
      }

      .sl-pager {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        padding-top: 16px;
      }
      .sl-pager button {
        border: 1px solid #e2e8f0;
        background: #fff;
        border-radius: 8px;
        padding: 7px 18px;
        font-weight: 600;
        font-size: 0.85rem;
        color: #334155;
      }
      .sl-pager button:disabled {
        opacity: 0.45;
      }
      .sl-pager span {
        font-size: 0.85rem;
        color: #64748b;
      }

      .sl-modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.5);
        z-index: 1060;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      .sl-modal {
        background: #fff;
        border-radius: 16px;
        width: 440px;
        max-width: 100%;
        max-height: 88vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .sl-modal-head {
        background: #5641ce;
        color: #fff;
        padding: 18px 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
      }
      .sl-modal-head.danger {
        background: #b91c1c;
      }
      .sl-modal-head h5 {
        margin: 0;
        font-weight: 700;
      }
      .sl-modal-head p {
        margin: 4px 0 0;
        font-size: 0.8rem;
        opacity: 0.85;
      }
      .sl-modal-head button {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: #fff;
        border-radius: 8px;
        width: 32px;
        height: 32px;
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .sl-modal-body {
        padding: 18px 20px;
        overflow-y: auto;
        font-size: 0.9rem;
        color: #334155;
      }
      .sl-modal-body p {
        margin: 0 0 8px;
      }
      .sl-modal-foot {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        padding: 14px 20px;
        border-top: 1px solid #e2e8f0;
      }
    `}</style>
  );
}
