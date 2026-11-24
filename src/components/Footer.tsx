import { Sparkles } from 'lucide-react'
import { useState } from 'react'

export function Footer() {
  const [date] = useState<Date>(new Date())
  return (
    <footer className="page-footer">
      <span>GOOD GAMES. GOOD VIBES.</span>
      <span>
        EST. {date.getFullYear()} <Sparkles size={10} aria-hidden="true" /> GRID CLUB
      </span>
    </footer>
  )
}
