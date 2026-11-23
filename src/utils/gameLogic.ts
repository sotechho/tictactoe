import type { Board } from '@/types/game'

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export function getWinningLine(board: Board): number[] | null {
  for (const line of WINNING_LINES) {
    const [first, second, third] = line
    if (board[first] && board[first] === board[second] && board[first] === board[third]) {
      return line
    }
  }
  return null
}

export function getBestMove(board: Board): number {
  const minimax = (position: Board, isMaximizing: boolean, depth: number): number => {
    const line = getWinningLine(position)
    if (line) return position[line[0]] === 'O' ? 10 - depth : depth - 10
    if (position.every(Boolean)) return 0

    let bestScore = isMaximizing ? -Infinity : Infinity
    for (let index = 0; index < position.length; index += 1) {
      if (position[index] !== null) continue
      position[index] = isMaximizing ? 'O' : 'X'
      const score = minimax(position, !isMaximizing, depth + 1)
      position[index] = null
      bestScore = isMaximizing ? Math.max(bestScore, score) : Math.min(bestScore, score)
    }
    return bestScore
  }

  let bestScore = -Infinity
  const bestMoves: number[] = []
  for (let index = 0; index < board.length; index += 1) {
    if (board[index] !== null) continue
    board[index] = 'O'
    const score = minimax(board, false, 1)
    board[index] = null
    if (score > bestScore) {
      bestScore = score
      bestMoves.length = 0
      bestMoves.push(index)
    } else if (score === bestScore) {
      bestMoves.push(index)
    }
  }
  return bestMoves[Math.floor(Math.random() * bestMoves.length)]
}

export function getRandomMove(board: Board): number | undefined {
  const availableMoves = board.flatMap((cell, index) => (cell === null ? [index] : []))
  if (availableMoves.length === 0) return undefined
  return availableMoves[Math.floor(Math.random() * availableMoves.length)]
}
