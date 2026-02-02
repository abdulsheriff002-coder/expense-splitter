import type React from "react"

interface CardProps {
  title?: string
  children: React.ReactNode
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="ui-card">
      {title && (
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="section-title">{title}</h2>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  )
}
