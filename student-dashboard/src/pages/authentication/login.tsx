import { Link, useNavigate } from "react-router-dom"
import Authentication from "./auth"
import AuthCard from "../../components/authCard"
import { useState } from "react"

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const allFieldsFilled = email.trim() !== "" && password.trim() !== ""

  const handleLogin = () => {
    if (allFieldsFilled) {
      navigate("/dashboard")
    }
  }

  return (
    <Authentication>
      <AuthCard title="Cosmo" showBack>

        {/* Inputs */}
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-white/80 px-4 py-2 text-[#2b2350] placeholder-[#2b2350]/50 outline-none focus:ring-2 focus:ring-orange-300/60 mt-10"
          />

          <div>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-white/80 px-4 py-2 text-[#2b2350] placeholder-[#2b2350]/50 outline-none focus:ring-2 focus:ring-orange-300/60"
            />

            <div className="mt-2 text-right">
              <Link
                to="/enter-email"
                className="text-xs text-white/60 hover:text-white underline-offset-2 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>

        {/* Login button */}
        <button
          type="button"
          onClick={handleLogin}
          disabled={!allFieldsFilled}
          className={`mt-5 w-full rounded-xl py-2.5 font-semibold text-white shadow active:opacity-80
            ${
              allFieldsFilled
                ? "bg-orange-300 hover:bg-orange-400 hover:cursor-pointer"
                : "bg-orange-300/40 cursor-not-allowed"
            }`}
        >
          Login
        </button>

        {/* Divider text */}
        <div className="mt-4 text-center text-xs text-white/50">
          Or sign in with
        </div>

        {/* Social buttons */}
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

        {/* Signup link */}
        <div className="mt-6 text-center text-sm text-white/70">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-white underline">
            Sign up
          </Link>
        </div>

      </AuthCard>
    </Authentication>
  )
}