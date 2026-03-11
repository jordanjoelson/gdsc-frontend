import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Authentication from "./auth"
import AuthCard from "../../components/authCard"

export default function Verify() {

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()

  const handleConfirm = () => {
    if (password === confirmPassword && password !== "") {
      navigate("/")
    } else {
      alert("Passwords do not match")
    }
  }

  return (
    <Authentication>
      <AuthCard title="Reset Password" showBack>

        <div className="space-y-4 mt-10">
          <p className="text-white/60 text-center mb-10">
            Enter your new password
          </p>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-white/80 px-4 py-2 text-[#2b2350] placeholder-[#2b2350]/50 outline-none focus:ring-2 focus:ring-orange-300/60"
            placeholder="Enter new password"
            type="password"
          />

          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg bg-white/80 px-4 py-2 text-[#2b2350] placeholder-[#2b2350]/50 outline-none focus:ring-2 focus:ring-orange-300/60"
            placeholder="Confirm new password"
            type="password"
          />

          <button
            onClick={handleConfirm}
            className="w-full rounded-xl bg-orange-300 py-2.5 font-semibold text-white shadow hover:bg-orange-400 active:opacity-80 hover:cursor-pointer transition duration-300"
          >
            Confirm
          </button>

        </div>

      </AuthCard>
    </Authentication>
  )
}