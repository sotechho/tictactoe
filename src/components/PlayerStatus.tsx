import { useGameStore } from '@/store/gameStore'

export function PlayerStatus() {
  const nextPlayer = useGameStore((state) => state.nextPlayer)
  const outcome = useGameStore((state) => state.outcome)
  const mode = useGameStore((state) => state.mode)
  const difficulty = useGameStore((state) => state.difficulty)
  const opponentName = mode === 'ai' ? 'CPU' : 'PLAYER 2'

  return (
    <div className="players">
      <div className={nextPlayer === 'X' && !outcome ? 'player active-player' : 'player'}>
        <span className="player-token x-token">X</span>
        <span className="player-label">
          YOU <small>PLAYER 1</small>
        </span>
      </div>
      <div className="vs-badge">VS</div>
      <div className={nextPlayer === 'O' && !outcome ? 'player active-player' : 'player'}>
        <span className="player-token o-token">O</span>
        <span className="player-label">
          {opponentName} <small>{mode === 'ai' ? difficulty.toUpperCase() : 'LOCAL MATCH'}</small>
        </span>
      </div>
    </div>
  )
}
