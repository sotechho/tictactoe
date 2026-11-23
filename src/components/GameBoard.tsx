import { useGameStore } from '../store/gameStore'
import { playTapSound } from '../utils/playTapSound'

export function GameBoard() {
  const board = useGameStore((state) => state.board)
  const winningLine = useGameStore((state) => state.winningLine)
  const outcome = useGameStore((state) => state.outcome)
  const nextPlayer = useGameStore((state) => state.nextPlayer)
  const mode = useGameStore((state) => state.mode)
  const playMove = useGameStore((state) => state.playMove)

  return (
    <div className="board" role="group" aria-label="Tic-tac-toe board">
      {board.map((cell, index) => {
        const isWinningCell = winningLine.includes(index)
        const isDisabled = Boolean(cell || outcome || (mode === 'ai' && nextPlayer === 'O'))
        return (
          <button
            className={`cell ${cell ? `cell-${cell.toLowerCase()}` : ''} ${isWinningCell ? 'winning-cell' : ''}`}
            key={index}
            type="button"
            onClick={() => {
              if (playMove(index)) playTapSound()
            }}
            disabled={isDisabled}
            aria-label={`Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}${cell ? `, ${cell}` : ', empty'}`}
          >
            {cell && <span className="mark">{cell}</span>}
          </button>
        )
      })}
    </div>
  )
}
