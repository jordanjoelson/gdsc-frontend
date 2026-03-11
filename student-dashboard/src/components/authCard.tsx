import type { ReactNode } from "react"
import Logo from "@/icons/logo.svg"

interface AuthCardProps {
  title?: string
  children: ReactNode
  showFlowers?: boolean
}

export default function AuthCard({
  title,
  children,
  showFlowers = true,
}: AuthCardProps) {
  return (
    <div className="relative mx-auto w-full max-w-md mt-10">
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
      <div className="relative rounded-2xl bg-[#362A5A] shadow-xl border-2 border-[#1F1C3D] overflow-hidden h-[80vh] max-h-[80vh]">
        {/* Background flowers (optional) */}
        {showFlowers && (
          <>
            <img
              src={Logo}
              alt=""
              className="absolute -right-90 -top-100 w-200 max-w-none opacity-20 pointer-events-none select-none"
            />
            <img
              src={Logo}
              alt=""
              className="absolute right-10 top-30 w-200 max-w-none opacity-20 pointer-events-none select-none"
            />
          </>
        )}

        <div className="relative p-8">
          {title && (
            <h1 className="text-center text-white text-4xl font-semibold">
              {title}
            </h1>
          )}

          {children}
        </div>
      </div>
    </div>
  )
}