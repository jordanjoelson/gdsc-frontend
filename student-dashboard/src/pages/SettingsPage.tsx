import { useState } from "react";

// ─────────────────────────────────────────────
// FONT & COLOR TOKENS
// Change colors here to update the whole page
// ─────────────────────────────────────────────
const FONT = "var(--font-family-onest, 'Segoe UI', sans-serif)";

const C = {
  bg:         "#352D51",  // page background
  sidebar:    "#352D51",  // sidebar (matches bg)
  card:       "#2B2445",  // section card background
  cardShadow: "#5C3A56",  // drop shadow color for cards
  accent:     "#FA706C",  // buttons, borders, toggles
  accentSoft: "rgba(250,112,108,0.12)",
  text:       "#ffffff",
  textMuted:  "#c4bce0",  // row labels
  textDim:    "#9b92c0",  // row values
  rowBorder:  "rgba(250,112,108,0.2)", // divider lines inside cards
  input:      "#2a2245",  // dropdown background
  inputBorder:"#FA706C",  // dropdown border
};

// ─────────────────────────────────────────────
// SIDEBAR NAV ITEMS
// Add/remove/rename items here
// ─────────────────────────────────────────────
const navItems = ["Personal Info", "Account", "Security", "Appearance", "Notifications", "Help"];


// ─────────────────────────────────────────────
// REUSABLE ROW COMPONENTS
// These build the rows inside each section card
// ─────────────────────────────────────────────

// Plain text row (label + value)
type RowProps = {
  label: string;
  children: React.ReactNode;
  last: boolean;
};
function Row({ label, children, last }: RowProps) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      padding: "15px 0",
      borderBottom: last ? "none" : `1px solid ${C.rowBorder}`,
    }}>
      <span style={{ width: "200px", fontSize: "14px", fontWeight: "600", color: C.textMuted, flexShrink: 0, fontFamily: FONT }}>{label}</span>
      <span style={{ fontSize: "14px", color: C.textDim, fontFamily: FONT }}>{children}</span>
    </div>
  );
}

// Dropdown select row
type SelectRowProps = {
  label: string;
  value: string;
  last: boolean;
};
function SelectRow({ label, value, last }: SelectRowProps) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      padding: "15px 0",
      borderBottom: last ? "none" : `1px solid ${C.rowBorder}`,
    }}>
      <span style={{ width: "200px", fontSize: "14px", fontWeight: "600", color: C.textMuted, flexShrink: 0, fontFamily: FONT }}>{label}</span>
      <div style={{
        display: "flex", alignItems: "center", gap: "6px",
        background: C.input, border: `1px solid ${C.inputBorder}`,
        borderRadius: "8px", padding: "6px 12px", cursor: "pointer",
      }}>
        <span style={{ fontSize: "13px", color: C.textDim, fontFamily: FONT }}>{value}</span>
        <span style={{ fontSize: "10px", color: C.textDim }}>▾</span>
      </div>
    </div>
  );
}

// Toggle on/off row
type ToggleRowProps = {
  label: string;
  defaultOn?: boolean;
  last: boolean;
};
function ToggleRow({ label, defaultOn, last }: ToggleRowProps) {
  const [on, setOn] = useState(defaultOn || false);
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "15px 0",
      borderBottom: last ? "none" : `1px solid ${C.rowBorder}`,
    }}>
      <span style={{ fontSize: "14px", fontWeight: "600", color: C.textMuted, fontFamily: FONT }}>{label}</span>
      <div onClick={() => setOn(!on)} style={{
        width: "40px", height: "22px", borderRadius: "11px",
        background: on ? C.accent : "#4a4068",
        position: "relative", cursor: "pointer",
        transition: "background 0.2s ease", flexShrink: 0,
        border: `1px solid ${on ? C.accent : C.rowBorder}`,
      }}>
        <div style={{
          width: "16px", height: "16px", borderRadius: "50%", background: "#fff",
          position: "absolute", top: "2px", left: on ? "20px" : "2px",
          transition: "left 0.2s ease",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }} />
      </div>
    </div>
  );
}

// Slider row
type SliderRowProps = {
  label: string;
  last: boolean;
};
function SliderRow({ label, last }: SliderRowProps) {
  const [val, setVal] = useState<number>(50);
  return (
    <div style={{
      display: "flex", alignItems: "center",
      padding: "15px 0",
      borderBottom: last ? "none" : `1px solid ${C.rowBorder}`,
    }}>
      <span style={{ width: "200px", fontSize: "14px", fontWeight: "600", color: C.textMuted, flexShrink: 0, fontFamily: FONT }}>{label}</span>
      <input type="range" min={0} max={100} value={val}
        onChange={e => setVal(Number(e.target.value))}
        style={{ accentColor: C.accent, width: "140px", cursor: "pointer" }} />
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION CARD WRAPPER
// Wraps each settings group (Personal Info, Account, etc.)
// No border — only drop shadow
// ─────────────────────────────────────────────
type SectionCardProps = {
  title: string;
  id: string;
  children: React.ReactNode;
};
function SectionCard({ title, id, children }: SectionCardProps) {
  return (
    <div id={id} style={{ marginBottom: "36px", width: "100%" }}>
      <h2 style={{
        fontSize: "22px", fontWeight: "600", color: C.text,
        marginBottom: "14px", fontFamily: FONT,
      }}>{title}</h2>
      <div style={{
        background: C.card,
        border: "none",                         // ← no border
        borderRadius: "16px",
        padding: "0 24px",
        boxShadow: `8px 8px 0px ${C.cardShadow}`, // ← drop shadow only
        width: "100%",
      }}>
        {children}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// APPEARANCE SECTION
// Has its own state for theme + accent color picker
// ─────────────────────────────────────────────
const accentColors = ["#FA706C", "#F5A623", "#71D277", "#4DB3DD", "#a78bfa"];

function AppearanceSection() {
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [theme, setTheme] = useState<string>("Dark");

  return (
    <SectionCard title="Appearance" id="Appearance">
      {/* Theme toggle buttons */}
      <div style={{ display: "flex", alignItems: "center", padding: "15px 0", borderBottom: `1px solid ${C.rowBorder}` }}>
        <span style={{ width: "200px", fontSize: "14px", fontWeight: "600", color: C.textMuted, flexShrink: 0, fontFamily: FONT }}>Theme</span>
        <div style={{ display: "flex", gap: "8px" }}>
          {["Light", "Dark", "System"].map(t => (
            <button key={t} onClick={() => setTheme(t)} style={{
              padding: "6px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px",
              border: `1px solid ${theme === t ? C.accent : C.rowBorder}`,
              background: theme === t ? C.accent : "transparent",
              color: theme === t ? "#fff" : C.textDim,
              fontFamily: FONT, transition: "all 0.15s ease",
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Accent color dots */}
      <div style={{ display: "flex", alignItems: "center", padding: "15px 0", borderBottom: `1px solid ${C.rowBorder}` }}>
        <span style={{ width: "200px", fontSize: "14px", fontWeight: "600", color: C.textMuted, flexShrink: 0, fontFamily: FONT }}>Accent color</span>
        <div style={{ display: "flex", gap: "10px" }}>
          {accentColors.map((c, i) => (
            <div key={i} onClick={() => setSelectedColor(i)} style={{
              width: "24px", height: "24px", borderRadius: "50%", background: c, cursor: "pointer",
              border: selectedColor === i ? "2px solid #fff" : "2px solid transparent",
              boxShadow: selectedColor === i ? `0 0 0 2px ${c}` : "none",
              transition: "all 0.15s ease",
            }} />
          ))}
        </div>
      </div>

      <SliderRow label="Font Size" last={false} />
      <SliderRow label="UI Density" last={true} />
    </SectionCard>
  );
}


// ─────────────────────────────────────────────
// MAIN SETTINGS PAGE
// ─────────────────────────────────────────────
export default function SettingsPage() {
  const [activeNav, setActiveNav] = useState("Personal Info");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveNav(id);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: FONT, color: C.text }}>

      {/* ─────────────────────────────────────
          SIDEBAR
          Sticky left nav, same color as bg
      ───────────────────────────────────── */}
      <div style={{
        width: "220px", background: C.sidebar,
        padding: "36px 0", position: "sticky", top: 0,
        height: "100vh", flexShrink: 0,
        borderRight: `1px solid ${C.rowBorder}`,
      }}>
        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          style={{
            marginLeft: "24px",
            marginBottom: "18px",
            padding: "6px 16px",
            borderRadius: "8px",
            border: `1px solid ${C.accent}`,
            background: "transparent",
            color: C.text,
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            fontFamily: FONT,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "18px", lineHeight: 1 }}>←</span> Back
        </button>
        <div style={{ padding: "0 24px 8px", fontSize: "26px", fontWeight: "700", color: C.text, fontFamily: FONT }}>
          Settings
        </div>
        {/* Divider under title */}
        <div style={{ height: "1px", background: C.rowBorder, margin: "12px 24px 20px" }} />

        {/* Nav items — bold when active */}

        {navItems.map(item => (
          <div
            key={item}
            onClick={() => scrollTo(item)}
            style={{
              padding: "11px 24px",
              fontSize: "14px",
              cursor: "pointer",
              color: activeNav === item ? C.text : C.textMuted,
              fontWeight: activeNav === item ? "700" : "400",
              fontFamily: FONT,
              transition: "all 0.15s ease",
            }}
          >
            {item}
          </div>
        ))}
      </div>
      {/* ─────────────────────────────────────
          MAIN CONTENT AREA
      ───────────────────────────────────── */}
      <div style={{ flex: 1, padding: "40px 48px", overflowY: "auto" }}>

        {/* ── PROFILE HEADER ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px", marginBottom: "44px" }}>

          {/* Avatar circle — replace SVG with your PNG:
              <img src={yourPng} style={{width:"100%",height:"100%",objectFit:"cover"}} /> */}
          <div style={{
            width: "90px", height: "90px", borderRadius: "50%",
            border: `3px solid ${C.accent}`,
            background: C.card,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            boxShadow: `3px 3px 0px ${C.cardShadow}`,
            overflow: "hidden",
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill={C.textDim}>
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </div>

          {/* Name, email, upload/remove buttons */}
          <div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: C.text, fontFamily: FONT }}>FirstName LastName</div>
            <div style={{ fontSize: "13px", color: C.textMuted, marginBottom: "14px", fontFamily: FONT }}>something@email.com</div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button style={{
                padding: "8px 22px", borderRadius: "10px",
                border: `1px solid ${C.accent}`,
                background: "transparent", color: C.text,
                fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: FONT,
              }}>Upload</button>
              <button style={{
                padding: "8px 22px", borderRadius: "10px",
                border: `1px solid ${C.accent}`,
                background: "transparent", color: C.text,
                fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: FONT,
              }}>Remove</button>
            </div>
          </div>
        </div>

        
        {/* There are  */}
        {/* ── PERSONAL INFORMATION ── */}
        <SectionCard title="Personal Information" id="Personal Info">
          <Row label="First Name" last={false}>Firstname</Row>
          <Row label="Last Name" last={false}>Lastname</Row>
          <Row label="Email" last={false}>Email</Row>
          <SelectRow label="Pronouns" value="He/Him" last={false} />
          <SelectRow label="Date of Birth" value="DD-00-2xxx" last />
        </SectionCard>


        {/* ── ACCOUNT ── */}
        <SectionCard title="Account" id="Account">
          <SelectRow label="Language" value="English" last={false} />
          <SelectRow label="Region" value="Selected Region" last={false} />
          <SelectRow label="Connected Accounts" value="Dropdown Box" last={false} />
          <div style={{ padding: "15px 0", textAlign: "center" }}>
            <span style={{ fontSize: "14px", color: C.accent, cursor: "pointer", fontFamily: FONT }}>Sign out</span>
          </div>
        </SectionCard>


        {/* ── SECURITY ── */}
        <SectionCard title="Security" id="Security">
          <Row label="Change Password" last={false}>
            <span style={{ letterSpacing: "4px" }}>••••••••</span>
          </Row>
          <ToggleRow label="Two-Factor Authentication" last={false} />
          <ToggleRow label="Log-in Alerts" defaultOn last={false} />
          <div style={{ padding: "15px 0", textAlign: "center" }}>
            <span style={{ fontSize: "14px", color: C.accent, cursor: "pointer", fontFamily: FONT }}>Delete Account</span>
          </div>
        </SectionCard>


        {/* ── APPEARANCE ── */}
        <AppearanceSection />


        {/* ── NOTIFICATIONS ── */}
        <SectionCard title="Notifications" id="Notifications">
          <ToggleRow label="Master Notifications" last={false} />
          <ToggleRow label="Push Notifications" last={false} />
          <ToggleRow label="Email Notifications" last={false} />
          <ToggleRow label="Sound Alerts" last={false} />
          <ToggleRow label="Vibration Haptics" last={false} />
          <Row label="Quiet Hours" last>00:00 – 00:00</Row>
        </SectionCard>


        {/* ── HELP ── */}
        <SectionCard title="Help" id="Help">
          {["FAQ Link", "Contact Support", "App Version", "Terms of Service"].map((item, i, arr) => (
            <div key={item} style={{
              padding: "15px 0", textAlign: "center",
              borderBottom: i < arr.length - 1 ? `1px solid ${C.rowBorder}` : "none",
            }}>
              <span style={{ fontSize: "14px", color: C.textMuted, cursor: "pointer", fontFamily: FONT }}>{item}</span>
            </div>
          ))}
        </SectionCard>

      </div>
    </div>
  )
}
