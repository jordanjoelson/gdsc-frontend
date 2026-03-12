import { useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react";

// ─────────────────────────────────────────────
// TOKENS
// ─────────────────────────────────────────────
const FONT = "var(--font-family-onest, 'Segoe UI', sans-serif)";
const C = {
  bg:         "#352D51",  // page background
  box:        "#140D2A",  // both panel boxes
  shadow:     "#1F1C3D",  // the "second rectangle" behind each box
  accent:     "#FA706C",  // buttons, active tab underline
  line:       "#FFBA84",  // decorative corner lines
  text:       "#ffffff",
  textMuted:  "#c4bce0",
  textDim:    "#5a5278",
  border:     "rgba(255,255,255,0.05)",
  today:      "rgba(250,112,108,0.08)",
  accentSoft: "rgba(250,112,108,0.12)",
};

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const HOURS = Array.from({ length: 17 }, (_, i) => i + 7); // 7am–11pm
const DAYS  = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const ROW_H = 52;

export function getWeekDates(offset = 0) {
  const now = new Date();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - now.getDay() + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return d;
  });
}

function fmt12(hour: number) {
  if (hour === 12) return "12 PM";
  if (hour < 12)  return `${hour} AM`;
  return `${hour - 12} PM`;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth()    === b.getMonth()    &&
         a.getDate()     === b.getDate();
}

// ─────────────────────────────────────────────
// PANEL BOX — the "double rectangle" wrapper
// ─────────────────────────────────────────────
export function PanelBox({ children, style = {} }: { children: ReactNode; style?: React.CSSProperties }) {
  // Allow height to be controlled via style prop
  const outerStyle: React.CSSProperties = { position: "relative", ...style };
  const innerStyle: React.CSSProperties = {
    position: "relative",
    background: C.box,
    borderRadius: "14px",
    overflow: "hidden",
    height: style.height || "100%",
    display: "flex",
    flexDirection: "column",
  };
  return (
    <div style={outerStyle}>
      {/* Shadow rectangle (offset behind) */}
      <div style={{
        position: "absolute",
        top: "-8px", left: "-8px",
        right: "8px", bottom: "8px",
        background: C.shadow,
        borderRadius: "14px",
      }} />
      {/* Main box */}
      <div style={innerStyle}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TASK PANEL
// ─────────────────────────────────────────────
type Task = { id: number; text: string; done: boolean };

const INITIAL_TASKS: Record<string, Task[]> = {
  "This week":   [],
  "This month":  [],
  "Unscheduled": [],
  "Personal":    [],
};

function TaskPanel({ tasks, setTasks }: { tasks: Record<string, Task[]>; setTasks: (value: Record<string, Task[]> | ((prev: Record<string, Task[]>) => Record<string, Task[]>)) => void }) {
  const [expanded, setExpanded] = useState({ "This week": true, "This month": false, "Unscheduled": false, "Personal": false });
  const [adding, setAdding]     = useState<string | null>(null);
  const [draft, setDraft]       = useState("");

  const toggle = (key: keyof typeof expanded) => setExpanded(e => ({ ...e, [key]: !e[key] }));

  const addTask = (section: string | number) => {
    if (!draft.trim()) { setAdding(null); return; }
    setTasks((prev) => ({ ...prev, [section]: [...prev[section as keyof typeof prev], { id: Date.now(), text: draft.trim(), done: false }] }));
    setDraft(""); setAdding(null);
  };

  const toggleDone = (section: string, id: any) => {
    setTasks((prev) => ({
      ...prev,
      [section]: prev[section as keyof typeof prev].map((t) => t.id === id ? { ...t, done: !t.done } : t),
    }));
  };

  return (
    <div style={{ padding: "18px 14px", overflowY: "auto", flex: 1 }}>
      {/* Today header */}
      <div style={{ fontSize: "20px", fontWeight: "700", color: C.text, fontFamily: FONT, marginBottom: "16px", paddingLeft: "4px" }}>
        Today
      </div>

      {Object.keys(tasks).map(section => {
        const sectionKey = section as keyof typeof expanded;
        return (
        <div key={section} style={{ marginBottom: "4px" }}>
          {/* Section header */}
          <div onClick={() => toggle(sectionKey)} style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "7px 4px", cursor: "pointer",
            color: C.textMuted, fontSize: "15px", fontFamily: FONT, userSelect: "none",
          }}>
              <span style={{
                display: "inline-block", fontSize: "9px",
                transform: expanded[sectionKey] ? "rotate(0deg)" : "rotate(-90deg)",
                transition: "transform 0.2s ease",
              }}>▾</span>
              {section}
            </div>

            {/* Task list */}
            {expanded[sectionKey] && (
            <div>
              {tasks[sectionKey].map((task: { id: Key | null | undefined; done: any; text: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                <div key={task.id} onClick={() => toggleDone(section, task.id)} style={{
                  padding: "5px 4px 5px 20px",
                  fontSize: "12px", fontFamily: FONT,
                  color: task.done ? C.textDim : C.textMuted,
                  textDecoration: task.done ? "line-through" : "none",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
                }}>
                  <div style={{
                    width: "11px", height: "11px", borderRadius: "3px", flexShrink: 0,
                    border: `1.5px solid ${task.done ? C.accent : C.textDim}`,
                    background: task.done ? C.accent : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {task.done && <span style={{ fontSize: "7px", color: "#fff" }}>✓</span>}
                  </div>
                  {task.text}
                </div>
              ))}
              {adding === section ? (
                <div style={{ padding: "4px 4px 4px 20px" }}>
                  <input autoFocus value={draft}
                    onChange={e => setDraft(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") addTask(section); if (e.key === "Escape") { setAdding(null); setDraft(""); } }}
                    onBlur={() => addTask(section)}
                    placeholder="Task name..."
                    style={{
                      background: "transparent", border: "none",
                      borderBottom: `1px solid ${C.accent}`,
                      color: C.text, fontSize: "12px", fontFamily: FONT,
                      outline: "none", width: "100%", padding: "2px 0",
                    }}
                  />
                </div>
              ) : (
                <div onClick={() => { setAdding(section); setDraft(""); }} style={{
                  padding: "4px 4px 4px 20px", fontSize: "11px",
                  color: C.textDim, cursor: "pointer", fontFamily: FONT, opacity: 0.7,
                }}>+ add task</div>
              )}
            </div>
          )}
        </div>
      );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// ADD EVENT MODAL
// ─────────────────────────────────────────────
function AddEventModal({ onClose, onAdd }: { onClose: () => void; onAdd: (event: any) => void }) {
  const [title, setTitle]   = useState("");
  const [date, setDate]     = useState(new Date().toISOString().slice(0, 10));
  const [startH, setStartH] = useState("09");
  const [endH, setEndH]     = useState("10");
  const [color, setColor]   = useState(C.accent);
  const colors = ["#FA706C", "#71D277", "#4DB3DD", "#F5C542", "#a78bfa", "#F5A623"];

  const submit = () => {
    if (!title.trim()) return;
    onAdd({ id: Date.now(), title: title.trim(), date, startH: parseInt(startH), endH: parseInt(endH), color });
    onClose();
  };

  const inputStyle: React.CSSProperties = {
    display: "block", width: "100%", marginTop: "6px",
    background: "#1a1530", border: `1px solid rgba(250,112,108,0.25)`,
    borderRadius: "10px", padding: "10px 12px",
    color: C.text, fontSize: "14px", fontFamily: FONT,
    outline: "none", boxSizing: "border-box", colorScheme: "dark",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: C.box, borderRadius: "20px",
        padding: "32px", width: "360px",
        boxShadow: `8px 8px 0px ${C.shadow}`,
        display: "flex", flexDirection: "column", gap: "18px",
        animation: "fadeUp 0.2s ease",
      }}>
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }`}</style>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: C.text, fontFamily: FONT }}>New Event</h2>
          <span onClick={onClose} style={{ color: C.textDim, cursor: "pointer", fontSize: "22px", lineHeight: 1 }}>×</span>
        </div>

        <div>
          <label style={{ fontSize: "10px", color: C.textDim, fontFamily: FONT, letterSpacing: "1px", textTransform: "uppercase" }}>Title</label>
          <input autoFocus value={title} onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === "Enter" && submit()}
            placeholder="Event name..." style={inputStyle} />
        </div>

        <div>
          <label style={{ fontSize: "10px", color: C.textDim, fontFamily: FONT, letterSpacing: "1px", textTransform: "uppercase" }}>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {([ ["Start", startH, setStartH], ["End", endH, setEndH] ] as const).map(([lbl, val, set], idx) => (
            <div key={idx} style={{ flex: 1 }}>
              <label style={{ fontSize: "10px", color: C.textDim, fontFamily: FONT, letterSpacing: "1px", textTransform: "uppercase" }}>{lbl}</label>
              <select value={val as string} onChange={e => set(e.target.value)} style={inputStyle}>
                {HOURS.map(h => <option key={h} value={String(h).padStart(2,"0")}>{fmt12(h)}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div>
          <label style={{ fontSize: "10px", color: C.textDim, fontFamily: FONT, letterSpacing: "1px", textTransform: "uppercase" }}>Color</label>
          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            {colors.map(c => (
              <div key={c} onClick={() => setColor(c)} style={{
                width: "24px", height: "24px", borderRadius: "50%", background: c, cursor: "pointer",
                border: color === c ? "2px solid #fff" : "2px solid transparent",
                boxShadow: color === c ? `0 0 0 2px ${c}` : "none",
                transition: "all 0.15s ease",
              }} />
            ))}
          </div>
        </div>

        <button onClick={submit} style={{
          background: C.accent, border: "none", borderRadius: "12px",
          padding: "12px", color: "#fff", fontSize: "14px", fontWeight: "700",
          fontFamily: FONT, cursor: "pointer",
        }}>Add Event</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CALENDAR GRID
// ─────────────────────────────────────────────
export function CalendarGrid({ weekDates, events, onPrev, onNext, monthLabel }: { weekDates: Date[]; events: any[]; onPrev: () => void; onNext: () => void; monthLabel: string }) {
  const now = new Date();
  const nowTop = ((now.getHours() * 60 + now.getMinutes() - 7 * 60) / 60) * ROW_H;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>

      {/* Month label centered above the day columns */}
      <div style={{ display: "flex", alignItems: "center", paddingLeft: "52px", paddingTop: "12px", paddingBottom: "4px" }}>
        <button onClick={onPrev} style={headerNavBtn}>◀</button>
        <div style={{ flex: 1, textAlign: "center", fontSize: "13px", fontWeight: "600", color: C.textMuted, fontFamily: FONT, letterSpacing: "0.5px" }}>
          {monthLabel}
        </div>
        <button onClick={onNext} style={headerNavBtn}>▶</button>
      </div>

      {/* Day header row*/}
      <div style={{ display: "flex", flexShrink: 0, paddingLeft: "52px", paddingBottom: "10px" }}>
        {weekDates.map((d: Date, i: Key | null | undefined) => {
          const isToday = isSameDay(d, now);
          return (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              {/* Tick mark */}
              <div style={{ width: "1px", height: "8px", background: C.textDim, margin: "0 auto 6px" }} />
              <div style={{ fontSize: "10px", color: C.textDim, fontFamily: FONT, letterSpacing: "1px", textTransform: "uppercase" }}>{DAYS[d.getDay()]}</div>
              <div style={{
                fontSize: "16px", fontWeight: "700", fontFamily: FONT,
                color: isToday ? C.accent : C.textMuted,
                width: "30px", height: "30px", borderRadius: "50%",
                background: isToday ? C.accentSoft : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "3px auto 0",
              }}>
                {d.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Time grid — scrollable*/}
      <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
        <div style={{ display: "flex", position: "relative" }}>

          {/* Time labels */}
          <div style={{ width: "52px", flexShrink: 0 }}>
            {HOURS.map(h => (
              <div key={h} style={{
                height: `${ROW_H}px`,
                display: "flex", alignItems: "flex-start",
                justifyContent: "flex-end",
                paddingRight: "10px", paddingTop: "4px",
                fontSize: "9px", color: C.textDim, fontFamily: FONT, letterSpacing: "0.5px",
              }}>
                {fmt12(h)}
              </div>
            ))}
          </div>

          {/* Day columns*/}
          {weekDates.map((d: any, colIdx: Key | null | undefined) => {
            const isToday = isSameDay(d, now);
            const dayEvents = events.filter((e: { date: string; }) => isSameDay(new Date(e.date + "T00:00:00"), d));

            return (
              <div key={colIdx} style={{
                flex: 1, position: "relative",
                background: isToday ? C.today : "transparent",
              }}>
                {/* Invisible height spacers — no visible borders */}
                {HOURS.map(h => (
                  <div key={h} style={{ height: `${ROW_H}px` }} />
                ))}

                {/* Events */}
                {dayEvents.map((ev: { startH: number; endH: number; id: Key | null | undefined; color: string; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => {
                  const top    = (ev.startH - 7) * ROW_H;
                  const height = Math.max((ev.endH - ev.startH) * ROW_H - 4, 22);
                  return (
                    <div key={ev.id} style={{
                      position: "absolute", top: `${top + 2}px`, left: "3px", right: "3px",
                      height: `${height}px`, borderRadius: "8px",
                      background: ev.color + "28",
                      borderLeft: `3px solid ${ev.color}`,
                      padding: "4px 8px", overflow: "hidden", cursor: "pointer",
                    }}>
                      <div style={{ fontSize: "11px", fontWeight: "700", color: ev.color, fontFamily: FONT }}>{ev.title}</div>
                      <div style={{ fontSize: "9px", color: C.textDim, fontFamily: FONT, marginTop: "1px" }}>{fmt12(ev.startH)} – {fmt12(ev.endH)}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Current time indicator */}
        {nowTop > 0 && nowTop < HOURS.length * ROW_H && (
          <div style={{
            position: "absolute", top: `${nowTop}px`,
            left: "52px", right: 0, height: "2px",
            background: C.accent, pointerEvents: "none", zIndex: 10,
          }}>
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: C.accent, position: "absolute", left: "-4px", top: "-3px",
            }} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function CalendarPage() {

  const [weekOffset, setWeekOffset] = useState(0);
  const [showModal,  setShowModal]  = useState(false);
  const [events,     setEvents]     = useState<any[]>([]);
  const [tasks,      setTasks]      = useState(INITIAL_TASKS);

  const weekDates  = getWeekDates(weekOffset);
  const monthLabel = weekDates[0].toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div style={{
      position: "relative",
      display: "flex", flexDirection: "column",
      fontFamily: FONT, color: C.text,
      overflow: "hidden",
    }}>



      {/* ── TOP NAV ── */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", alignItems: "center",
        padding: "18px 28px 0",
        flexShrink: 0,
      }}>
        {/* Title */}
        <div style={{ fontSize: "24px", fontWeight: "700", color: C.text, fontFamily: FONT }}>
          Calendar
        </div>

        <div style={{ flex: 1 }} />

        {/* + button */}
        <button onClick={() => setShowModal(true)} style={{
          width: "32px", height: "32px", borderRadius: "9px",
          background: "transparent", border: `1.5px solid ${C.accent}`,
          color: C.accent, fontSize: "20px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: "300", lineHeight: 1, transition: "all 0.15s ease",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.accent; }}
        >+</button>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", flex: 1, gap: "20px",
        padding: "16px 28px 28px",
        minHeight: 0,
      }}>

        {/* LEFT — task panel with pills on top + left */}
        <div style={{ position: "relative", width: "185px", minWidth: "185px", flexShrink: 0, paddingTop: "18px", paddingLeft: "18px" }}>
          {/* Horizontal pill — top of task box, spaced above */}
          <div style={{
            position: "absolute", top: 0, left: "24px",
            width: "80px", height: "5px",
            background: C.line, borderRadius: "999px",
          }} />
          {/* Vertical pill — left of task box, spaced left */}
          <div style={{
            position: "absolute", top: "24px", left: 0,
            width: "5px", height: "80px",
            background: C.line, borderRadius: "999px",
          }} />
          <PanelBox style={{ height: "100%" }}>
            <TaskPanel tasks={tasks} setTasks={setTasks} />
          </PanelBox>
        </div>

        {/* RIGHT — calendar with pills on bottom-right corner */}
        <div style={{ position: "relative", flex: 1, minWidth: 0, paddingRight: "10px", paddingBottom: "10px", paddingTop: "18px"}}>
          <PanelBox style={{ height: "100%" }}>
            <CalendarGrid
              weekDates={weekDates}
              events={events}
              onPrev={() => setWeekOffset(w => w - 1)}
              onNext={() => setWeekOffset(w => w + 1)}
              monthLabel={monthLabel}
            />
          </PanelBox>
        </div>
        {/* Vertical pill — right side, near bottom corner */}
        <div style={{
          position: "absolute", bottom: "50px", right: "25px",
          width: "5px", height: "80px",
          background: C.line, borderRadius: "999px",
          marginTop: "50px",
        }} />
        {/* Horizontal pill — bottom, near right corner, outside calendar box */}
        <div style={{
          position: "absolute",
          bottom: "25px",
          right: "calc(28px + 24px)",
          width: "80px",
          height: "5px",
          background: C.line,
          borderRadius: "999px",
          zIndex: 2,
        }} />
      </div>

      {/* ── MODAL ── */}
      {showModal && (
        <AddEventModal
          onClose={() => setShowModal(false)}
          onAdd={(ev: any) => setEvents(prev => [...prev, ev])}
        />
      )}
    </div>
  );
}

const headerNavBtn = {
  background: "transparent",
  border: "none",
  color: C.textDim,
  fontSize: "13px", padding: "2px 8px",
  cursor: "pointer", fontFamily: FONT,
  flexShrink: 0,
};
