import { useEffect, useState } from "react";
import css from "styled-jsx/css";
import { MdChevronLeft, MdChevronRight, MdAccessTime, MdCalendarToday, MdPlayArrow } from "react-icons/md";
import {
  WEEK, dayName, fmt12, toMin, istNow, weekOf, fmtDay, slotStatus, nextClass,
  slotsOn, slotTitle, liveFor, canJoin,
} from "@/lib/classSchedule";

const STATUS = {
  live: { label: "Going on now", cls: "live" },
  upcoming: { label: "Upcoming", cls: "upcoming" },
  done: { label: "Completed", cls: "done" },
};

const WEEK_MS = 7 * 86400000;
const daysText = (days) => WEEK.filter((w) => days.includes(w.d)).map((w) => w.long).join(", ");
const daysShort = (days) => WEEK.filter((w) => days.includes(w.d)).map((w) => w.short).join(", ");

// Join button for the teacher's live class of this slot, while it is on.
function JoinLink({ lc, status, small }) {
  if (!canJoin(lc, status)) return null;
  return (
    <a className={`csd-join ${small ? "sm" : ""}`} href={lc.streamLink} target="_blank" rel="noopener noreferrer">
      <MdPlayArrow size={small ? 15 : 17} /> Join class
    </a>
  );
}

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
  // null = automatic: today if it has classes, else the next class day.
  const [weekShift, setWeekShift] = useState(null);
  const [selectedMs, setSelected] = useState(null);

  const schedule = schedules.find((s) => s.courseId === courseId) || schedules[0];

  if (!schedule) {
    return (
      <div className="csd-empty">
        Class timing is shown here after you buy a course.
      </div>
    );
  }

  const next = nextClass(schedule, now);
  const todayMs = now.date.getTime();
  const autoMs = schedule.days.includes(now.day) ? todayMs : next ? next.date.getTime() : todayMs;
  const shift = weekShift ?? Math.round((weekOf(new Date(autoMs))[0] - weekOf(now.date)[0]) / WEEK_MS);
  // Only the days that have classes are shown in the strip.
  const classDaysOf = (s) =>
    weekOf(new Date(todayMs + s * WEEK_MS)).filter((d) => schedule.days.includes(d.getUTCDay()));
  const fullWeek = weekOf(new Date(todayMs + shift * WEEK_MS));
  const week = classDaysOf(shift);
  const selected = selectedMs ?? autoMs;
  const selDate = new Date(selected);
  const daySlots = slotsOn(schedule, selDate.getUTCDay());
  const isClassDay = daySlots.length > 0;

  const moveWeek = (by) => {
    const s = shift + by;
    const days = classDaysOf(s).map((d) => d.getTime());
    setWeekShift(s);
    // Today if it is in that week, else its first class day still ahead, else its first class day.
    setSelected(days.includes(todayMs) ? todayMs : days.find((ms) => ms > todayMs) ?? days[0]);
  };
  const pickCourse = (id) => {
    setCourseId(id);
    setWeekShift(null);
    setSelected(null);
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
              onClick={() => pickCourse(s.courseId)}
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
            Next: <b>{slotTitle(next.slot)}</b>,{" "}
            {next.date.getTime() === todayMs ? "today" : fmtDay(next.date, { weekday: "long", day: "numeric", month: "short" })}{" "}
            at {fmt12(next.slot.start)}
          </span>
        </div>
      )}

      {/* Week strip */}
      <div className="csd-week-bar">
        <button className="csd-arrow" onClick={() => moveWeek(-1)} aria-label="Previous week"><MdChevronLeft size={22} /></button>
        <div className="csd-month">
          {fmtDay(fullWeek[0], { day: "numeric", month: "short" })} – {fmtDay(fullWeek[6], { day: "numeric", month: "short", year: "numeric" })}
        </div>
        <button className="csd-arrow" onClick={() => moveWeek(1)} aria-label="Next week"><MdChevronRight size={22} /></button>
      </div>
      <div className="csd-week" style={{ gridTemplateColumns: `repeat(${week.length}, 1fr)` }}>
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
          {daySlots.map((s, i) => {
            const status = slotStatus(s, selDate, now);
            const st = STATUS[status];
            const lc = liveFor(schedule, s, selDate);
            return (
              <div key={i} className={`csd-class ${st.cls} ${s.type === "doubt" ? "doubt" : ""}`}>
                <div className="csd-time">
                  <div className="csd-time-start">{fmt12(s.start)}</div>
                  <div className="csd-time-end">{fmt12(s.end)}</div>
                </div>
                <div className="csd-class-body">
                  <div className="csd-subject">{slotTitle(s)}</div>
                  <div className="csd-meta">
                    {toMin(s.end) - toMin(s.start)} min · {s.type === "doubt" ? "Live doubt session" : schedule.batch || "Pro batch"}
                    {lc && status !== "done" && !canJoin(lc, status) && " · Link added"}
                  </div>
                </div>
                <div className="csd-side">
                  <span className={`csd-status ${st.cls}`}>{st.label}</span>
                  <JoinLink lc={lc} status={status} />
                </div>
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
            <tr><th>Time</th><th>Class</th><th>Days</th></tr>
          </thead>
          <tbody>
            {schedule.slots.map((s, i) => (
              <tr key={i}>
                <td className="csd-nowrap">{fmt12(s.start)} – {fmt12(s.end)}</td>
                <td>{slotTitle(s)}</td>
                <td className="csd-nowrap">{daysShort(s.days || schedule.days)}</td>
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
    .flatMap((s) => slotsOn(s, now.day).map((slot) => ({ slot, course: s.courseTitle, schedule: s })))
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
          {today.map(({ slot, course, schedule }, i) => {
            const status = slotStatus(slot, now.date, now);
            const st = STATUS[status];
            return (
              <div key={i} className="csd-card-row">
                <span className="csd-card-time">{fmt12(slot.start)}</span>
                <span className="csd-card-subject">
                  {slotTitle(slot)}
                  {schedules.length > 1 && <span className="csd-card-course"> · {course}</span>}
                </span>
                <span className={`csd-status ${st.cls}`}>{st.label}</span>
                <JoinLink lc={liveFor(schedule, slot, now.date)} status={status} small />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="csd-card-none">
          No class today.
          {next && (
            <> Next: <b>{slotTitle(next.slot)}</b> on {fmtDay(next.date, { weekday: "long", day: "numeric", month: "short" })} at {fmt12(next.slot.start)}.</>
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
  .csd-week { display: grid; gap: 8px; margin-top: 10px; max-width: 420px; }
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
  .csd-class.doubt { border-left-color: #b45309; }
  .csd-class.doubt.done { border-left-color: #cbd5e1; }
  .csd-side { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
  .csd-join {
    display: inline-flex; align-items: center; gap: 4px; background: #16a34a; color: #fff; border-radius: 8px;
    padding: 6px 12px; font-size: 0.8rem; font-weight: 700; text-decoration: none; white-space: nowrap;
  }
  .csd-join:hover { background: #15803d; color: #fff; }
  .csd-join.sm { padding: 4px 9px; font-size: 0.74rem; }
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
