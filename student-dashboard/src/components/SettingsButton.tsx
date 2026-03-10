import React from "react";
import { useNavigate } from "react-router-dom";

export function SettingsButton() {
  const navigate = useNavigate();
  return (
    <button
      className="flex items-center justify-center rounded-full bg-[#352D51] w-10 h-10 shadow-none border-none focus:outline-none"
      style={{ boxShadow: "none", border: "none" }}
      aria-label="Settings"
      onClick={() => navigate("/settings")}
    >
      {/* Replace this with your own asset if desired */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" fill="black" />
        <path
          d="M12 8V12M12 16H12.01"
          stroke="#FA706C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
