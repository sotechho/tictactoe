import { Asterisk, Sparkles, Trophy } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export function TurnIndicator() {
  const nextPlayer = useGameStore((state) => state.nextPlayer)
  const outcome = useGameStore((state) => state.outcome)
  const mode = useGameStore((state) => state.mode)

  const status = outcome === 'draw'
    ? 'It’s a draw!'
    : outcome
      ? `${outcome} takes the round!`
      : mode === 'ai' && nextPlayer === 'O'
        ? 'Thinking…'
        : `${nextPlayer}’s turn`

  return (
    <div className={`turn-banner ${outcome ? 'game-over' : ''}`} aria-live="polite">
      <span className="turn-spark" aria-hidden="true">
        {outcome === 'draw' ? <Asterisk size={13} /> : outcome ? <Trophy size={13} /> : <Sparkles size={13} />}
      </span>
      {status}
      {!outcome && <span className={`turn-mark ${nextPlayer === 'X' ? 'x-color' : 'o-color'}`}>{nextPlayer}</span>}
    </div>
  )
}
