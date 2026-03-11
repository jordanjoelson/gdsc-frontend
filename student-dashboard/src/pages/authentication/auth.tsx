import React from "react"

export default function Authentication({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#352D51] flex items-center justify-center px-6 py-10">
      {children}
    </div>
  )
}