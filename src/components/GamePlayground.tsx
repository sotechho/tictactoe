import { useEffect } from 'react'
import { getBestMove, getRandomMove } from '@/utils/gameLogic'
import { playTapSound } from '@/utils/playTapSound'
import { useGameStore } from '@/store/gameStore'
import { GameBoard } from './GameBoard'
import { GameControls } from './GameControls'
import { GameModeSelector } from './GameModeSelector'
import { PlayerStatus } from './PlayerStatus'
import { TurnIndicator } from './TurnIndicator'

export function GamePlayground() {
  const board = useGameStore((state) => state.board)
  const nextPlayer = useGameStore((state) => state.nextPlayer)
  const outcome = useGameStore((state) => state.outcome)
  const mode = useGameStore((state) => state.mode)
  const difficulty = useGameStore((state) => state.difficulty)
  const playMove = useGameStore((state) => state.playMove)

  useEffect(() => {
    if (mode !== 'ai' || nextPlayer !== 'O' || outcome) return

    const timeout = window.setTimeout(() => {
      const move = difficulty === 'easy' ? getRandomMove(board) : getBestMove([...board])
      if (move !== undefined && playMove(move, 'O')) playTapSound()
    }, 420)

    return () => window.clearTimeout(timeout)
  }, [board, difficulty, mode, nextPlayer, outcome, playMove])

  return (
    <section className="game-card" aria-label="Game board and controls">
      <GameModeSelector />
      <PlayerStatus />
      <TurnIndicator />
      <GameBoard />
      <GameControls />
    </section>
  )
}
