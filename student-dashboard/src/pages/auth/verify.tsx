import Authentication from "./Authentication"

export default function Verify() {
  return (
    <Authentication>
      <div className="text-white text-center">
        <h1 className="text-2xl font-semibold mb-4">Authentication</h1>
        <input
          className="w-full rounded-lg bg-white/80 px-4 py-2 text-[#2b2350] placeholder-[#2b2350]/50 outline-none"
          placeholder="Enter code"
        />
        <button className="mt-5 w-full rounded-xl bg-orange-400 py-2.5 font-semibold text-white">
          Confirm
        </button>
      </div>
    </Authentication>
  )
}