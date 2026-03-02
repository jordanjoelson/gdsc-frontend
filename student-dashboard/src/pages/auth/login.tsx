import { Link } from "react-router-dom"
import Authentication from "./Authentication"
import Logo from "@/icons/logo.svg"

export default function Login() {
  return (
    <Authentication>
      {/* Outer card frame */}
      <div className="relative mx-auto w-full max-w-md">
        {/* Decorative corner lines */}
        <div className="absolute -top-11 h-1 w-2/3 bg-orange-300 rounded-2xl" />
        <div className="absolute -top-14 h-1 w-1/2 bg-orange-300 rounded-2xl" />

        <div className="absolute top-2 -left-14 h-1/2 w-1 bg-orange-300 rounded-2xl" />
        <div className="absolute top-2 -left-11 h-2/3 w-1 bg-orange-300 rounded-2xl" />

        <div className="absolute -bottom-6 right-7 h-1 w-1/6 bg-orange-300 rounded-2xl" />
        <div className="absolute -bottom-3 right-7 h-1 w-2/6 bg-orange-300 rounded-2xl" />

        <div className="absolute bottom-2 -right-4 h-2/6 w-1 bg-orange-300 rounded-2xl" />
        <div className="absolute bottom-2 -right-7 h-1/6 w-1 bg-orange-300 rounded-2xl" />

        {/* Shadow/back card */}
        <div className="absolute inset-0 -translate-x-7 -translate-y-7 rounded-2xl bg-[#1F1C3D]" />

        {/* Main card */}
        <div className="relative rounded-2xl bg-[#362A5A] shadow-xl border-2 border-[#1F1C3D] overflow-hidden">
          {/* BIG FLOWER BACKGROUND (same logo, faded) */}
          <img
            src={Logo}
            alt=""
            className="absolute -right-40 -top-40 w-120 opacity-25"
          />

          <img
            src={Logo}
            alt=""
            className="absolute right-40 top-60 w-150 opacity-25"
          />

          <div className="relative p-8">
            {/* Back button */}
            <button
              type="button"
              className="mb-6 inline-flex items-center gap-2 text-white/70 hover:text-white text-sm"
              onClick={() => window.history.back()}
            >
              <span className="text-lg leading-none">‹</span>
              Back
            </button>

            {/* Title */}
            <h1 className="text-center text-white text-xl font-semibold">
              Cosmo
            </h1>

            {/* Center logo */}
            <div className="mt-2 mb-4">
              <img src={Logo} alt="Logo" className="mx-auto h-20 w-20" />
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full rounded-lg bg-white/80 px-4 py-2 text-[#2b2350] placeholder-[#2b2350]/50 outline-none focus:ring-2 focus:ring-orange-300/60"
              />
              <div>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full rounded-lg bg-white/80 px-4 py-2 text-[#2b2350] placeholder-[#2b2350]/50 outline-none focus:ring-2 focus:ring-orange-300/60"
                />
                <div className="mt-2 text-right">
                  <Link
                    to="/forgot-password"
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
          </div>
        </div>
      </div>
    </Authentication>
  )
}