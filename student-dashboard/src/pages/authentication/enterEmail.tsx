import { useNavigate } from "react-router-dom"
import Authentication from "./auth"
import AuthCard from "../../components/authCard"

export default function Verify() {

  const navigate = useNavigate()

  const handleConfirm = () => {
    navigate("/resetPassword")
  }

  return (
    <Authentication>
      <AuthCard title="Authentication" showFlowers={false}>
        
        <div className="space-y-4 mt-10">
          <p className="text-white/60 text-center mb-10">
            Enter your email address and we'll send you a code to reset your password
          </p>
          
          <input
            className="w-full rounded-lg bg-white/80 px-4 py-2 text-[#2b2350] placeholder-[#2b2350]/50 outline-none focus:ring-2 focus:ring-orange-300/60"
            placeholder="Enter email"
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