import { Link } from "react-router-dom"
import Authentication from "./auth"
import AuthCard from "./authCard"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  return (
    <Authentication>
      <AuthCard title="Cosmo">

        {/* Inputs */}
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter email"
            className="w-full rounded-lg bg-white/80 px-4 py-2 text-[#2b2350] placeholder-[#2b2350]/50 outline-none focus:ring-2 focus:ring-orange-300/60 mt-10"
          />
          <div>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full rounded-lg bg-white/80 px-4 py-2 text-[#2b2350] placeholder-[#2b2350]/50 outline-none focus:ring-2 focus:ring-orange-300/60"
            />
            <div className="mt-2 text-right">
              <Link
                to="/forgotPassword"
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
          onClick={() => navigate("/app")}
          className="mt-5 w-full rounded-xl bg-orange-300 py-2.5 font-semibold text-white shadow hover:bg-orange-400 hover:cursor-pointer active:opacity-80"
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
            aria-label="Sign in with provider 1"
          />
          <button
            type="button"
            className="h-10 rounded-xl bg-[#1F1C3D] hover:cursor-pointer"
            aria-label="Sign in with provider 2"
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