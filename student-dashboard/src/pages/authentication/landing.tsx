import Authentication from "./auth"
import AuthCard from "../../components/authCard"
import { Link } from "react-router-dom"

// import logos
import Logo from "../../components/icons/logo.svg"
import BlackLogo from "../../components/icons/blackLogo.svg"

export default function SignupOrLogin() {
  return (
    <Authentication>
      <AuthCard title="Cosmo" showFlowers={false}>
        
        {/* Logo */}
        <div className="relative w-80 mx-auto my-8 -mb-1 -mt-1">

          {/* Black shadow logo (behind) */}
          <img
            src={BlackLogo}
            alt=""
            className="absolute inset-0 m-auto w-full translate-y-2 z-0"
          />

          {/* Purple main logo */}
          <img
            src={Logo}
            alt="Main Logo"
            className="relative w-full z-10"
          />

        </div>

        {/* Buttons */}
        <div className="space-y-3">

          <Link to="/signup">
            <button
              type="button"
              className="w-full rounded-xl bg-orange-300 py-3 font-semibold text-white shadow hover:bg-orange-400 mb-3 hover:cursor-pointer"
            >
              Create Account
            </button>
          </Link>

          <Link to="/login">
            <button
              type="button"
              className="w-full rounded-xl bg-orange-300 py-3 font-semibold text-white shadow hover:bg-orange-400 active:opacity-80 hover:cursor-pointer"
            >
              Login
            </button>
          </Link>

        </div>

      </AuthCard>
    </Authentication>
  )
}