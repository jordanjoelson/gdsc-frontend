import { Link } from "react-router-dom"
import Authentication from "./Authentication"

export default function Signup() {
  return (
    <Authentication title="Create account" subtitle="Sign up to get started.">
      {/* your form goes here */}
      <div className="text-white/80">
        Signup form here…
      </div>

      <div className="mt-6 text-white/70 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-white underline">Log in</Link>
      </div>
    </Authentication>
  )
}