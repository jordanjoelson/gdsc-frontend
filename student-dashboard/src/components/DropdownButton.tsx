export function DropdownButton() {
  return (
    <button
      className="flex items-center justify-center rounded-full bg-[#352D51] w-10 h-10 shadow-none border-none focus:outline-none"
      style={{ boxShadow: "none", border: "none" }}
      aria-label="Dropdown"
    >
      <span className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" fill="black" />
          <path
            d="M16 10L12 14L8 10"
            stroke="#352D51"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
