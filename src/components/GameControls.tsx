import { useGameStore } from '../store/gameStore'

export function GameControls() {
  const outcome = useGameStore((state) => state.outcome)
  const resetRound = useGameStore((state) => state.resetRound)

  return (
    <div className="game-actions">
      <button type="button" className="reset-button" onClick={resetRound}>
        <span aria-hidden="true">↻</span> NEW ROUND
      </button>
      {outcome && (
        <button type="button" className="rematch-button" onClick={resetRound}>
          REMATCH <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  )
}
