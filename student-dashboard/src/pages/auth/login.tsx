import { Link } from "react-router-dom"
import Authentication from "./Authentication"

export default function Login() {
  return (
    <Authentication title="Welcome back" subtitle="Log in to continue.">
      {/* your form goes here */}
      <div className="text-white/80">
        Login form here…
      </div>

      <div className="mt-6 text-white/70 text-sm">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-white underline">Sign up</Link>
      </div>
    </Authentication>
  )
}