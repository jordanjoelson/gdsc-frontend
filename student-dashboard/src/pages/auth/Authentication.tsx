import React from "react";

type Props = {
    title: string
    subtitle: string
    children: React.ReactNode
}

export default function Authentication({ title, subtitle, children }: Props) {
    return (
    <div className="min-h-screen flex items-center justify-center bg-[#352D51] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-white mb-2">{title}</h1>
        {subtitle && <p className="text-white/70 mb-6">{subtitle}</p>}
        {children}
      </div>
    </div>
    )
}