import { useState, useEffect, useRef, type JSX } from "react";
import '../style.css';

const SIZE = 220;
const STROKE = 18;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const CYCLE = [
  { label: "Focus", duration: 25 * 60, type: "focus" },
  { label: "Short Break", duration: 5 * 60, type: "break" },
  { label: "Focus", duration: 25 * 60, type: "focus" },
  { label: "Short Break", duration: 5 * 60, type: "break" },
  { label: "Focus", duration: 25 * 60, type: "focus" },
  { label: "Long Break", duration: 10 * 60, type: "longbreak" },
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function getRingColor(type: string, status: string, isUrgent: boolean): string {
  if (status === "idle") return "#2a2a2a";
  if (isUrgent) return "#E85454";
  if (type === "focus") return "#71D277";
  if (type === "break") return "#5bc8f5";
  if (type === "longbreak") return "#a78bfa";
  return "#71D277";
}

interface BtnProps {
  color: string;
  onClick: () => void;
  children: React.ReactNode;
  small?: boolean;
}

function Btn({ color, onClick, children, small, borderRadius }: BtnProps & { borderRadius?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "60px",
        height: "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        borderRadius: borderRadius ?? "12px",
        fontSize: small ? "13px" : "15px",
        fontWeight: "600",
        color: "#fff",
        cursor: "pointer",
        background: color,
        transform: hovered ? "scale(1.07)" : "scale(1)",
        transition: "transform 0.15s ease",
        fontFamily: "var(--font-family-onest)",
        letterSpacing: "0.3px",
      }}
    >
      {children}
    </button>
  );
}

export default function PomodoroTimer(): JSX.Element {
  const [cycleIndex, setCycleIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(CYCLE[0].duration);
  const [status, setStatus] = useState("idle");
  const intervalRef = useRef<number | null>(null);

  const currentStep = CYCLE[cycleIndex];
  const progress = timeLeft / currentStep.duration;
  const isUrgent = timeLeft < 60 && status !== "idle";
  const ringColor = getRingColor(currentStep.type, status, isUrgent);

  const accentColor =
    currentStep.type === "focus" ? "#71D277" :
    currentStep.type === "longbreak" ? "#a78bfa" : "#5bc8f5";

  const advanceStep = (index: number, autoStart = false) => {
    const next = (index + 1) % CYCLE.length;
    setCycleIndex(next);
    setTimeLeft(CYCLE[next].duration);
    setStatus(autoStart ? "running" : "idle");
  };

  useEffect(() => {
    if (status === "running") {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            if (intervalRef.current !== null) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            advanceStep(cycleIndex);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status, cycleIndex]);

  const handleStart = () => setStatus("running");
  const handlePause = () => setStatus("paused");
  const handleSkip = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    advanceStep(cycleIndex, true);
  };
  const handleRestart = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCycleIndex(0);
    setTimeLeft(CYCLE[0].duration);
    setStatus("idle");
  };

  return (
    <div style={{
      background: "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-family-onest)",
    } as React.CSSProperties}>
      <div style={{
        background: "transparent",
        borderRadius: "28px",
        // padding: "40px 8px",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: "24px",
        boxShadow: "none",
        border: "none",
        // minWidth: "320px",
      } as React.CSSProperties}>

        {/* Session label */}
        <div style={{
          fontSize: "12px",
          fontWeight: "700",
          letterSpacing: "3px",
          color: accentColor,
          textTransform: "uppercase",
          transition: "color 0.4s ease",
        }}>
        </div>

        {/* Ring */}
        <div style={{ position: "relative" as const, width: SIZE, height: SIZE, display: "flex", alignItems: "center", justifyContent: "center" } as React.CSSProperties}>
          <svg width={SIZE} height={SIZE} style={{ transform: "rotate(-90deg)", position: "absolute" as const } as React.CSSProperties}>
            <circle cx={SIZE/2} cy={SIZE/2} r={RADIUS} fill="none" stroke="#1a1a1a" strokeWidth={STROKE} />
            <circle
              cx={SIZE/2} cy={SIZE/2} r={RADIUS}
              fill="none"
              stroke={ringColor}
              strokeWidth={STROKE}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - (status === "idle" ? 0 : progress))}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1), stroke 0.4s ease",
                
              }}
            />
          </svg>
          <div style={{ position: "absolute" as const, display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "6px" } as React.CSSProperties}>
            <span style={{
              fontSize: "48px",
              fontWeight: "300",
              letterSpacing: "2px",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
              color: status === "idle" ? "#fff" : isUrgent ? "#E85454" : "#fff",
              transition: "color 0.3s ease",
            }}>
              {formatTime(timeLeft)}
            </span>
            <span style={{ fontSize: "10px", color: "#fff", letterSpacing: "3px", textTransform: "uppercase" }}>
              {status === "idle" ? "ready" : status === "running" ? (currentStep.type === "focus" ? "focus" : "relax") : "paused"}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "0px", alignItems: "center" } as React.CSSProperties}>
          {status === "idle" && (
            <Btn color="#71D277" onClick={handleStart}>▶ Start</Btn>
          )}
          
          {status === "running" && (
            <>
                <Btn color="#F5C542" onClick={handlePause} borderRadius="12px 0 0 12px">⏸</Btn>
                <Btn color="#E85454" onClick={handleRestart} borderRadius="0">⏹</Btn>
                <Btn color="#4DB3DD" onClick={handleSkip} borderRadius="0 12px 12px 0">⏭</Btn>
            </>
          )}
          {status === "paused" && (
            <>
                <Btn color="#71D277" onClick={handleStart}>▶ Resume</Btn>

            </>
          )}
        </div>

      </div>
    </div>
  );
}
