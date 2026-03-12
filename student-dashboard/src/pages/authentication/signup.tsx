import { useState } from "react"
import Authentication from "./auth"
import AuthCard from "../../components/authCard"
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agreed, setAgreed] = useState(false)

  const navigate = useNavigate()

  const allFieldsFilled = name.trim() !== "" && email.trim() !== "" && password.trim() !== ""

  const handleSignup = () => {
    if (allFieldsFilled && agreed) {
      navigate("/dashboard")
    }
  }

  return (
    <Authentication>
      <AuthCard title="Sign Up" showBack>

        {/* Inputs */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg bg-white/80 px-4 py-2 text-[#2b2350] placeholder-[#2b2350]/50 outline-none focus:ring-2 focus:ring-orange-300/60 mt-10"
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-white/80 px-4 py-2 text-[#2b2350] placeholder-[#2b2350]/50 outline-none focus:ring-2 focus:ring-orange-300/60"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-white/80 px-4 py-2 text-[#2b2350] placeholder-[#2b2350]/50 outline-none focus:ring-2 focus:ring-orange-300/60"
          />
        </div>

        <label className="mt-4 flex items-center gap-2 text-sm text-white/70 select-none">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="h-4 w-4 accent-orange-300"
          />
          <span>I agree to the Terms and Conditions</span>
        </label>

        <button
          type="button"
          onClick={handleSignup}
          disabled={!allFieldsFilled || !agreed}
          className={`mt-5 w-full rounded-xl py-2.5 font-semibold text-white shadow active:opacity-80
            ${
              allFieldsFilled && agreed
                ? "bg-orange-300 hover:bg-orange-400 hover:cursor-pointer"
                : "bg-orange-300/40 cursor-not-allowed"
            }`}
        >
          Sign Up
        </button>

        <div className="mt-4 text-center text-xs text-white/50">
          ------ Or register with ------
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="h-10 rounded-xl bg-[#1F1C3D] hover:cursor-pointer"
          />
          <button
            type="button"
            className="h-10 rounded-xl bg-[#1F1C3D] hover:cursor-pointer"
          />
        </div>

      </AuthCard>
    </Authentication>
  )
}