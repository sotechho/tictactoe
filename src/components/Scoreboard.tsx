import { useGameStore } from '@/store/gameStore'

export function Scoreboard() {
  const scores = useGameStore((state) => state.scores)
  const mode = useGameStore((state) => state.mode)
  const opponentName = mode === 'ai' ? 'CPU' : 'PLAYER 2'

  return (
    <section className="scoreboard" aria-label="Scoreboard">
      <div className="scoreboard-heading">
        <h2>THE SCOREBOARD</h2>
        <span>SESSION TOTALS</span>
      </div>
      <div className="score-row">
        <div className="score-player">
          <span className="score-symbol x-color">X</span>
          <span>
            YOU <small>PLAYER 1</small>
          </span>
        </div>
        <strong>{scores.X.toString().padStart(2, '0')}</strong>
      </div>
      <div className="score-row">
        <div className="score-player">
          <span className="score-symbol o-color">O</span>
          <span>
            {opponentName} <small>{mode === 'ai' ? 'COMPUTER' : 'LOCAL MATCH'}</small>
          </span>
        </div>
        <strong>{scores.O.toString().padStart(2, '0')}</strong>
      </div>
      <div className="score-row draw-row">
        <div className="score-player">
          <span className="draw-symbol">=</span>
          <span>DRAWS</span>
        </div>
        <strong>{scores.draws.toString().padStart(2, '0')}</strong>
      </div>
    </section>
  )
}
