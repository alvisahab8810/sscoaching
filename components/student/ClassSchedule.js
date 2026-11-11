import { useEffect, useMemo, useState } from "react";
import css from "styled-jsx/css";
import { MdChevronLeft, MdChevronRight, MdAccessTime, MdCalendarToday } from "react-icons/md";
import {
  WEEK, dayName, fmt12, toMin, istNow, weekOf, fmtDay, slotStatus, nextClass,
} from "@/lib/classSchedule";

const STATUS = {
  live: { label: "Going on now", cls: "live" },
  upcoming: { label: "Upcoming", cls: "upcoming" },
  done: { label: "Completed", cls: "done" },
};

const daysText = (days) => WEEK.filter((w) => days.includes(w.d)).map((w) => w.long).join(", ");

// IST "now", refreshed every minute so a class flips to "Going on now" on time.
function useIstNow() {
  const [now, setNow] = useState(() => istNow());
  useEffect(() => {
    const t = setInterval(() => setNow(istNow()), 60000);
    return () => clearInterval(t);
  }, []);
  return now;
}

/**
 * Weekly timetable of the Pro batches the student has bought
 * (from /api/class-schedule). Shown under "Class Schedule" in the dashboard.
 */
export default function ClassSchedule({ schedules = [] }) {
  const now = useIstNow();
  const [courseId, setCourseId] = useState(schedules[0]?.courseId || "");
  const [weekShift, setWeekShift] = useState(0);
  const [selected, setSelected] = useState(() => now.date.getTime());

  const schedule = schedules.find((s) => s.courseId === courseId) || schedules[0];
  const week = useMemo(
    () => weekOf(new Date(now.date.getTime() + weekShift * 7 * 86400000)),
    [now.date.getTime(), weekShift]
  );

  if (!schedule) {
    return (
      <div className="csd-empty">
        Class timing is shown here after you buy a Pro batch.
      </div>
    );
  }

  const selDate = new Date(selected);
  const isClassDay = schedule.days.includes(selDate.getUTCDay());
  const next = nextClass(schedule, now);
  const todayMs = now.date.getTime();

  const moveWeek = (by) => {
    const shift = weekShift + by;
    setWeekShift(shift);
    // Land on today when back on this week, else on that week's Monday.
    const target = weekOf(new Date(todayMs + shift * 7 * 86400000));
    setSelected(shift === 0 ? todayMs : target[0].getTime());
  };

  return (
    <div className="csd">
      <div className="csd-head">
        <div>
          <h2 className="csd-title">Class Schedule</h2>
          <p className="csd-sub">{daysText(schedule.days)} · all timings in IST</p>
        </div>
      </div>

      {schedules.length > 1 && (
        <div className="csd-chips">
          {schedules.map((s) => (
            <button
              key={s.courseId}
              className={`csd-chip ${s.courseId === schedule.courseId ? "on" : ""}`}
              onClick={() => setCourseId(s.courseId)}
            >
              {s.courseTitle}
            </button>
          ))}
        </div>
      )}
      {schedules.length === 1 && <div className="csd-course">{schedule.courseTitle}</div>}

      {next && (
        <div className="csd-next">
          <MdAccessTime size={18} />
          <span>
            Next class: <b>{next.slot.subject}</b>,{" "}
            {next.date.getTime() === todayMs ? "today" : fmtDay(next.date, { weekday: "long", day: "numeric", month: "short" })}{" "}
            at {fmt12(next.slot.start)}
          </span>
        </div>
      )}

      {/* Week strip */}
      <div className="csd-week-bar">
        <button className="csd-arrow" onClick={() => moveWeek(-1)} aria-label="Previous week"><MdChevronLeft size={22} /></button>
        <div className="csd-month">
          {fmtDay(week[0], { day: "numeric", month: "short" })} – {fmtDay(week[6], { day: "numeric", month: "short", year: "numeric" })}
        </div>
        <button className="csd-arrow" onClick={() => moveWeek(1)} aria-label="Next week"><MdChevronRight size={22} /></button>
      </div>
      <div className="csd-week">
        {week.map((d) => {
          const ms = d.getTime();
          const hasClass = schedule.days.includes(d.getUTCDay());
          return (
            <button
              key={ms}
              className={`csd-day ${ms === selected ? "sel" : ""} ${ms === todayMs ? "today" : ""} ${hasClass ? "has" : ""}`}
              onClick={() => setSelected(ms)}
            >
              <span className="csd-day-name">{fmtDay(d, { weekday: "short" })}</span>
              <span className="csd-day-num">{d.getUTCDate()}</span>
              <span className="csd-dot" />
            </button>
          );
        })}
      </div>

      {/* Classes of the selected day */}
      <div className="csd-day-head">
        {selected === todayMs ? "Today" : fmtDay(selDate, { weekday: "long" })},{" "}
        {fmtDay(selDate, { day: "numeric", month: "long" })}
      </div>
      {isClassDay ? (
        <div className="csd-list">
          {schedule.slots.map((s, i) => {
            const st = STATUS[slotStatus(s, selDate, now)];
            return (
              <div key={i} className={`csd-class ${st.cls}`}>
                <div className="csd-time">
                  <div className="csd-time-start">{fmt12(s.start)}</div>
                  <div className="csd-time-end">{fmt12(s.end)}</div>
                </div>
                <div className="csd-class-body">
                  <div className="csd-subject">{s.subject}</div>
                  <div className="csd-meta">{toMin(s.end) - toMin(s.start)} min · {schedule.batch || "Pro batch"}</div>
                </div>
                <span className={`csd-status ${st.cls}`}>{st.label}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="csd-off">
          <MdCalendarToday size={22} />
          <div>
            <div className="csd-off-title">No class on {dayName(selDate.getUTCDay())}</div>
            <div className="csd-off-sub">Classes are held on {daysText(schedule.days)}.</div>
          </div>
        </div>
      )}

      {/* Full weekly timetable */}
      <h3 className="csd-h3">Weekly timetable</h3>
      <div className="csd-table-wrap">
        <table className="csd-table">
          <thead>
            <tr><th>Time</th><th>Subject</th></tr>
          </thead>
          <tbody>
            {schedule.slots.map((s, i) => (
              <tr key={i}>
                <td className="csd-nowrap">{fmt12(s.start)} – {fmt12(s.end)}</td>
                <td>{s.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="csd-table-foot">Every {daysText(schedule.days)}</div>
      </div>
      {schedule.note && <p className="csd-note">{schedule.note}</p>}

      <style jsx>{STYLES}</style>
    </div>
  );
}

/**
 * Small card for the dashboard home: today's classes, or the next class.
 */
export function TodayClassesCard({ schedules = [], onOpen }) {
  const now = useIstNow();
  if (!schedules.length) return null;

  const today = schedules
    .filter((s) => s.days.includes(now.day))
    .flatMap((s) => s.slots.map((slot) => ({ slot, course: s.courseTitle })))
    .sort((a, b) => a.slot.start.localeCompare(b.slot.start));
  const next = schedules
    .map((s) => ({ ...nextClass(s, now), course: s.courseTitle }))
    .filter((x) => x.slot)
    .sort((a, b) => a.date - b.date || a.slot.start.localeCompare(b.slot.start))[0];

  return (
    <div className="csd-card">
      <div className="csd-card-head">
        <h2 className="csd-card-title">Today's classes</h2>
        <button className="csd-link" onClick={onOpen}>Full schedule</button>
      </div>
      {today.length ? (
        <div className="csd-card-list">
          {today.map(({ slot, course }, i) => {
            const st = STATUS[slotStatus(slot, now.date, now)];
            return (
              <div key={i} className="csd-card-row">
                <span className="csd-card-time">{fmt12(slot.start)}</span>
                <span className="csd-card-subject">
                  {slot.subject}
                  {schedules.length > 1 && <span className="csd-card-course"> · {course}</span>}
                </span>
                <span className={`csd-status ${st.cls}`}>{st.label}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="csd-card-none">
          No class today.
          {next && (
            <> Next: <b>{next.slot.subject}</b> on {fmtDay(next.date, { weekday: "long", day: "numeric", month: "short" })} at {fmt12(next.slot.start)}.</>
          )}
        </div>
      )}
      <style jsx>{STYLES}</style>
    </div>
  );
}

const STYLES = css`
  .csd { max-width: 860px; }
  .csd-empty { background: #fff; border: 1px solid #ece8f7; border-radius: 14px; padding: 28px; text-align: center; color: #64748b; }
  .csd-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 12px; }
  .csd-title { font-size: 1.35rem; font-weight: 700; color: #1e1b2e; margin: 0; }
  .csd-sub { font-size: 0.86rem; color: #64748b; margin: 4px 0 0; }
  .csd-course { margin-top: 12px; font-size: 0.9rem; font-weight: 600; color: #4c3a9e; }
  .csd-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }
  .csd-chip { border: 1px solid #ddd6f3; background: #fff; color: #4c3a9e; border-radius: 999px; padding: 7px 14px; font-size: 0.84rem; font-weight: 600; }
  .csd-chip.on { background: #6c47d4; border-color: #6c47d4; color: #fff; }
  .csd-next {
    display: flex; align-items: center; gap: 8px; margin-top: 14px; background: #f5f2fd; color: #3f2f8a;
    border: 1px solid #e6dff8; border-radius: 12px; padding: 11px 14px; font-size: 0.9rem;
  }
  .csd-week-bar { display: flex; align-items: center; justify-content: space-between; margin-top: 18px; }
  .csd-month { font-weight: 600; color: #1e1b2e; font-size: 0.92rem; }
  .csd-arrow { background: #fff; border: 1px solid #ece8f7; border-radius: 10px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: #4c3a9e; }
  .csd-week { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; margin-top: 10px; }
  .csd-day {
    background: #fff; border: 1px solid #ece8f7; border-radius: 12px; padding: 9px 0 7px; display: flex; flex-direction: column;
    align-items: center; gap: 2px; color: #94a3b8; min-width: 0;
  }
  .csd-day.has { color: #1e1b2e; }
  .csd-day.today { border-color: #6c47d4; }
  .csd-day.sel { background: #6c47d4; border-color: #6c47d4; color: #fff; }
  .csd-day-name { font-size: 0.72rem; font-weight: 600; text-transform: uppercase; }
  .csd-day-num { font-size: 1.05rem; font-weight: 700; }
  .csd-dot { width: 5px; height: 5px; border-radius: 50%; background: transparent; }
  .csd-day.has .csd-dot { background: #6c47d4; }
  .csd-day.sel .csd-dot { background: #fff; }
  .csd-day-head { margin: 18px 0 10px; font-weight: 700; color: #1e1b2e; }
  .csd-list { display: flex; flex-direction: column; gap: 10px; }
  .csd-class { display: flex; align-items: center; gap: 14px; background: #fff; border: 1px solid #ece8f7; border-left: 4px solid #6c47d4; border-radius: 12px; padding: 12px 14px; }
  .csd-class.live { border-left-color: #16a34a; background: #f6fdf8; }
  .csd-class.done { border-left-color: #cbd5e1; }
  .csd-class.done .csd-subject, .csd-class.done .csd-time-start { color: #94a3b8; }
  .csd-time { width: 76px; flex-shrink: 0; }
  .csd-time-start { font-weight: 700; color: #1e1b2e; font-size: 0.92rem; }
  .csd-time-end { font-size: 0.76rem; color: #94a3b8; }
  .csd-class-body { flex: 1; min-width: 0; }
  .csd-subject { font-weight: 700; color: #1e1b2e; }
  .csd-meta { font-size: 0.78rem; color: #64748b; margin-top: 2px; }
  .csd-status { font-size: 0.72rem; font-weight: 700; padding: 4px 9px; border-radius: 999px; white-space: nowrap; }
  .csd-status.live { background: #dcfce7; color: #166534; }
  .csd-status.upcoming { background: #f1eefc; color: #4c3a9e; }
  .csd-status.done { background: #f1f5f9; color: #64748b; }
  .csd-off { display: flex; align-items: center; gap: 12px; background: #fff; border: 1px dashed #ddd6f3; border-radius: 12px; padding: 16px; color: #6c47d4; }
  .csd-off-title { font-weight: 700; color: #1e1b2e; }
  .csd-off-sub { font-size: 0.84rem; color: #64748b; }
  .csd-h3 { font-size: 1rem; font-weight: 700; color: #1e1b2e; margin: 24px 0 10px; }
  .csd-table-wrap { background: #fff; border: 1px solid #ece8f7; border-radius: 12px; overflow: hidden; }
  .csd-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  .csd-table th { text-align: left; background: #f8f6fe; color: #4c3a9e; font-size: 0.76rem; text-transform: uppercase; letter-spacing: 0.04em; padding: 10px 14px; }
  .csd-table td { padding: 10px 14px; border-top: 1px solid #f1eef9; color: #334155; }
  .csd-nowrap { white-space: nowrap; }
  .csd-table-foot { padding: 9px 14px; border-top: 1px solid #f1eef9; font-size: 0.8rem; color: #64748b; background: #fcfbff; }
  .csd-note { font-size: 0.84rem; color: #475569; margin: 12px 0 0; line-height: 1.6; }

  .csd-card { background: #fff; border: 1px solid #ece8f7; border-radius: 14px; padding: 16px 18px; margin: 20px 0; }
  .csd-card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .csd-card-title { font-size: 1.05rem; font-weight: 700; color: #1e1b2e; margin: 0; }
  .csd-link { background: none; border: none; color: #6c47d4; font-weight: 600; font-size: 0.86rem; padding: 0; }
  .csd-card-list { display: flex; flex-direction: column; }
  .csd-card-row { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-top: 1px solid #f1eef9; }
  .csd-card-row:first-child { border-top: none; }
  .csd-card-time { width: 72px; flex-shrink: 0; font-weight: 700; color: #1e1b2e; font-size: 0.88rem; }
  .csd-card-subject { flex: 1; min-width: 0; color: #334155; font-size: 0.9rem; }
  .csd-card-course { color: #94a3b8; font-size: 0.8rem; }
  .csd-card-none { color: #475569; font-size: 0.9rem; }

  @media (max-width: 576px) {
    .csd-week { gap: 4px; }
    .csd-day-num { font-size: 0.95rem; }
    .csd-time { width: 66px; }
    .csd-class { gap: 10px; padding: 11px 12px; }
  }
`;
