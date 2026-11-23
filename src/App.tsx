import { useCallback, useEffect, useState } from 'react'
import './App.css'

type Mark = 'X' | 'O'
type Cell = Mark | null
type Board = Cell[]
type Mode = 'ai' | 'local'
type Difficulty = 'easy' | 'hard'
type Outcome = Mark | 'draw' | null
type Scores = Record<Mark | 'draws', number>

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

const EMPTY_BOARD: Board = Array(9).fill(null)

function getWinningLine(board: Board): number[] | null {
  for (const line of WINNING_LINES) {
    const [first, second, third] = line
    if (board[first] && board[first] === board[second] && board[first] === board[third]) {
      return line
    }
  }
  return null
}

function getBestMove(board: Board): number {
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

function App() {
  const [board, setBoard] = useState<Board>(() => [...EMPTY_BOARD])
  const [nextPlayer, setNextPlayer] = useState<Mark>('X')
  const [outcome, setOutcome] = useState<Outcome>(null)
  const [winningLine, setWinningLine] = useState<number[]>([])
  const [mode, setMode] = useState<Mode>('ai')
  const [difficulty, setDifficulty] = useState<Difficulty>('hard')
  const [scores, setScores] = useState<Scores>({ X: 0, O: 0, draws: 0 })
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return window.localStorage.getItem('arcade-theme') === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('arcade-theme', theme)
  }, [theme])

  const resetRound = () => {
    setBoard([...EMPTY_BOARD])
    setNextPlayer('X')
    setOutcome(null)
    setWinningLine([])
  }

  const playMove = useCallback((index: number, mark: Mark) => {
    if (board[index] !== null || outcome) return

    const nextBoard = [...board]
    nextBoard[index] = mark
    setBoard(nextBoard)

    const line = getWinningLine(nextBoard)
    if (line) {
      setWinningLine(line)
      setOutcome(mark)
      setScores((current) => ({ ...current, [mark]: current[mark] + 1 }))
    } else if (nextBoard.every(Boolean)) {
      setOutcome('draw')
      setScores((current) => ({ ...current, draws: current.draws + 1 }))
    } else {
      setNextPlayer(mark === 'X' ? 'O' : 'X')
    }
  }, [board, outcome])

  useEffect(() => {
    if (mode !== 'ai' || nextPlayer !== 'O' || outcome) return

    const timeout = window.setTimeout(() => {
      const availableMoves = board.flatMap((cell, index) => cell === null ? [index] : [])
      if (availableMoves.length === 0) return
      const move = difficulty === 'easy'
        ? availableMoves[Math.floor(Math.random() * availableMoves.length)]
        : getBestMove([...board])
      playMove(move, 'O')
    }, 420)

    return () => window.clearTimeout(timeout)
  }, [board, difficulty, mode, nextPlayer, outcome, playMove])

  const changeMode = (newMode: Mode) => {
    setMode(newMode)
    resetRound()
  }

  const status = outcome === 'draw'
    ? 'It’s a draw!'
    : outcome
      ? `${outcome} takes the round!`
      : mode === 'ai' && nextPlayer === 'O'
        ? 'Thinking…'
        : `${nextPlayer}’s turn`

  const opponentName = mode === 'ai' ? 'CPU' : 'PLAYER 2'

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Grid Club home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>GRID<span className="brand-light">CLUB</span></span>
        </a>
        <div className="topbar-right">
          <span className="online-indicator"><span /> ARCADE IS OPEN</span>
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? '☾' : '☀'}
          </button>
        </div>
      </header>

      <section className="game-layout" aria-label="Tic-tac-toe game">
        <div className="game-intro">
          <div className="eyebrow"><span>✳</span> THE CLASSIC, REIMAGINED</div>
          <h1>Think fast.<br /><span>Make your mark.</span></h1>
          <p className="intro-copy">A little friendly rivalry never hurt anybody.</p>
        </div>

        <section className="game-card" aria-label="Game board and controls">
          <div className="game-card-top">
            <div className="mode-tabs" role="group" aria-label="Game mode">
              <button
                type="button"
                className={mode === 'ai' ? 'mode-tab active' : 'mode-tab'}
                onClick={() => changeMode('ai')}
                aria-pressed={mode === 'ai'}
              >
                <span aria-hidden="true">✦</span> VS COMPUTER
              </button>
              <button
                type="button"
                className={mode === 'local' ? 'mode-tab active' : 'mode-tab'}
                onClick={() => changeMode('local')}
                aria-pressed={mode === 'local'}
              >
                <span aria-hidden="true">♟</span> LOCAL 2P
              </button>
            </div>
            {mode === 'ai' && (
              <div className="difficulty-picker" role="group" aria-label="AI difficulty">
                <button
                  type="button"
                  className={difficulty === 'easy' ? 'difficulty active' : 'difficulty'}
                  onClick={() => {
                    setDifficulty('easy')
                    resetRound()
                  }}
                  aria-pressed={difficulty === 'easy'}
                >
                  EASY
                </button>
                <span aria-hidden="true">/</span>
                <button
                  type="button"
                  className={difficulty === 'hard' ? 'difficulty active' : 'difficulty'}
                  onClick={() => {
                    setDifficulty('hard')
                    resetRound()
                  }}
                  aria-pressed={difficulty === 'hard'}
                >
                  HARD
                </button>
              </div>
            )}
          </div>

          <div className="players">
            <div className={nextPlayer === 'X' && !outcome ? 'player active-player' : 'player'}>
              <span className="player-token x-token">X</span>
              <span className="player-label">YOU <small>PLAYER 1</small></span>
            </div>
            <div className="vs-badge">VS</div>
            <div className={nextPlayer === 'O' && !outcome ? 'player active-player' : 'player'}>
              <span className="player-token o-token">O</span>
              <span className="player-label">{opponentName} <small>{mode === 'ai' ? difficulty.toUpperCase() : 'LOCAL MATCH'}</small></span>
            </div>
          </div>

          <div className={`turn-banner ${outcome ? 'game-over' : ''}`} aria-live="polite">
            <span className="turn-spark" aria-hidden="true">{outcome === 'draw' ? '✳' : outcome ? '★' : '✦'}</span>
            {status}
            {!outcome && <span className={`turn-mark ${nextPlayer === 'X' ? 'x-color' : 'o-color'}`}>{nextPlayer}</span>}
          </div>

          <div className="board" role="group" aria-label="Tic-tac-toe board">
            {board.map((cell, index) => (
              <button
                className={`cell ${cell ? `cell-${cell.toLowerCase()}` : ''} ${winningLine.includes(index) ? 'winning-cell' : ''}`}
                key={index}
                type="button"
                onClick={() => playMove(index, nextPlayer)}
                disabled={Boolean(cell || outcome || (mode === 'ai' && nextPlayer === 'O'))}
                aria-label={`Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}${cell ? `, ${cell}` : ', empty'}`}
              >
                {cell && <span className="mark">{cell}</span>}
              </button>
            ))}
          </div>

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
        </section>

        <section className="scoreboard" aria-label="Scoreboard">
          <div className="scoreboard-heading">
            <h2>THE SCOREBOARD</h2>
            <span>SESSION TOTALS</span>
          </div>
          <div className="score-row">
            <div className="score-player"><span className="score-symbol x-color">X</span><span>YOU <small>PLAYER 1</small></span></div>
            <strong>{scores.X.toString().padStart(2, '0')}</strong>
          </div>
          <div className="score-row">
            <div className="score-player"><span className="score-symbol o-color">O</span><span>{opponentName} <small>{mode === 'ai' ? 'COMPUTER' : 'LOCAL MATCH'}</small></span></div>
            <strong>{scores.O.toString().padStart(2, '0')}</strong>
          </div>
          <div className="score-row draw-row">
            <div className="score-player"><span className="draw-symbol">=</span><span>DRAWS</span></div>
            <strong>{scores.draws.toString().padStart(2, '0')}</strong>
          </div>
        </section>

        <footer className="page-footer">
          <span>GOOD GAMES. GOOD VIBES.</span>
          <span>EST. 2024 <i>✳</i> GRID CLUB</span>
        </footer>
      </section>
    </main>
  )
}

export default App
