import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Authentication from "./auth"
import AuthCard from "../../components/authCard"

export default function Verify() {

  const navigate = useNavigate()
  const [code, setCode] = useState("")

  const codeFilled = code.trim() !== ""

  const handleConfirm = () => {
    if (codeFilled) {
      navigate("/reset-password")
    }
  }

  return (
    <Authentication>
      <AuthCard title="Authentication" showBack>

        <div className="space-y-4 mt-10">
          <p className="text-white/60 text-center mb-10">
            Enter the code sent to your email
          </p>

          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full rounded-lg bg-white/80 px-4 py-2 text-[#2b2350] placeholder-[#2b2350]/50 outline-none focus:ring-2 focus:ring-orange-300/60"
            placeholder="Enter code"
          />

          <button
            onClick={handleConfirm}
            disabled={!codeFilled}
            className={`w-full rounded-xl py-2.5 font-semibold text-white shadow transition duration-300
              ${
                codeFilled
                  ? "bg-orange-300 hover:bg-orange-400 hover:cursor-pointer"
                  : "bg-orange-300/40 cursor-not-allowed"
              }`}
          >
            Confirm
          </button>

        </div>

      </AuthCard>
    </Authentication>
  )
}