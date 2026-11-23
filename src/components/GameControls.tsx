import { ArrowRight, RotateCcw } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export function GameControls() {
  const outcome = useGameStore((state) => state.outcome)
  const resetRound = useGameStore((state) => state.resetRound)

  return (
    <div className="game-actions">
      <button type="button" className="reset-button" onClick={resetRound}>
        <RotateCcw size={12} aria-hidden="true" /> NEW ROUND
      </button>
      {outcome && (
        <button type="button" className="rematch-button" onClick={resetRound}>
          REMATCH <ArrowRight size={12} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
