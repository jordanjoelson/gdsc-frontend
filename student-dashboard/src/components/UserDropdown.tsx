import { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Settings", route: "/settings" },
  { label: "Help Center" },
  { label: "Sign Out" },
];

export function UserDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 bg-transparent border-none p-0 focus:outline-none transition-colors duration-150 hover:bg-[#FDA057] rounded-full"
        onClick={() => setOpen((v) => !v)}
        aria-label="User menu"
      >
        <span className="flex items-center justify-center rounded-full bg-black w-10 h-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="9" r="4" fill="white" />
            <ellipse cx="12" cy="17" rx="6" ry="3" fill="white" />
          </svg>
        </span>
        <span className="flex items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
          >
            <path
              d="M16 10L12 14L8 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#352D51] shadow-lg z-50 p-2 border border-transparent" style={{ border: "none" }}>
          {menuItems.map((item, idx) => (
            <button
              key={item.label}
              className={`w-full text-left px-4 py-3 rounded-lg text-white font-medium bg-transparent hover:bg-[#FA706C] hover:text-black transition-colors duration-150 ${idx === 2 ? "border-t border-[#4A4063] mt-2 pt-2" : ""}`}
              onClick={() => {
                if (item.label === "Sign Out") {
                  // Add sign out logic here
                  // Example: clear localStorage and redirect to login
                  localStorage.clear();
                  navigate("/login");
                } else if (item.route) {
                  navigate(item.route);
                }
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
