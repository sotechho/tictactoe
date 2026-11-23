import { useEffect } from 'react'
import { LayoutGrid, Moon, Sun } from 'lucide-react'
import { useGameStore } from '@/store/gameStore'

export function Header() {
  const theme = useGameStore((state) => state.theme)
  const toggleTheme = useGameStore((state) => state.toggleTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Grid Club home">
        <LayoutGrid className="brand-mark" aria-hidden="true" />
        <span>
          GRID<span className="brand-light">CLUB</span>
        </span>
      </a>
      <div className="topbar-right">
        <span className="online-indicator">
          <span /> ARCADE IS OPEN
        </span>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? (
            <Moon size={16} aria-hidden="true" />
          ) : (
            <Sun size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  )
}
