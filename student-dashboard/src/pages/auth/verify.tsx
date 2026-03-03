import Authentication from "./Authentication"
import AuthCard from "./authcard"

export default function Verify() {
  return (
    <Authentication>
      <AuthCard title="Authentication" showFlowers={false}>
        
        <div className="space-y-4 mt-10">
          <p className = "text-white/60 text-center mb-10">Enter the code sent to your email</p>
          
          <input
            className="w-full rounded-lg bg-white/80 px-4 py-2 text-[#2b2350] placeholder-[#2b2350]/50 outline-none focus:ring-2 focus:ring-orange-300/60"
            placeholder="Enter code"
          />

          <button className="w-full rounded-xl bg-orange-300 py-2.5 font-semibold text-white shadow hover:bg-orange-400 active:opacity-80 hover:cursor-pointer transition duration-300">
            Confirm
          </button>
        </div>

      </AuthCard>
    </Authentication>
  )
}