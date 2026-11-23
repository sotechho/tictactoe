import { Cpu, UsersRound } from 'lucide-react'
import { useGameStore } from '@/store/gameStore'
import type { Difficulty, GameMode } from '@/types/game'

export function GameModeSelector() {
  const mode = useGameStore((state) => state.mode)
  const difficulty = useGameStore((state) => state.difficulty)
  const setMode = useGameStore((state) => state.setMode)
  const setDifficulty = useGameStore((state) => state.setDifficulty)

  const selectMode = (nextMode: GameMode) => setMode(nextMode)
  const selectDifficulty = (nextDifficulty: Difficulty) => setDifficulty(nextDifficulty)

  return (
    <div className="game-card-top">
      <div className="mode-tabs" role="group" aria-label="Game mode">
        <button
          type="button"
          className={mode === 'ai' ? 'mode-tab active' : 'mode-tab'}
          onClick={() => selectMode('ai')}
          aria-pressed={mode === 'ai'}
        >
          <Cpu size={12} aria-hidden="true" /> VS COMPUTER
        </button>
        <button
          type="button"
          className={mode === 'local' ? 'mode-tab active' : 'mode-tab'}
          onClick={() => selectMode('local')}
          aria-pressed={mode === 'local'}
        >
          <UsersRound size={12} aria-hidden="true" /> LOCAL 2P
        </button>
      </div>
      {mode === 'ai' && (
        <div className="difficulty-picker" role="group" aria-label="AI difficulty">
          <button
            type="button"
            className={difficulty === 'easy' ? 'difficulty active' : 'difficulty'}
            onClick={() => selectDifficulty('easy')}
            aria-pressed={difficulty === 'easy'}
          >
            EASY
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            className={difficulty === 'hard' ? 'difficulty active' : 'difficulty'}
            onClick={() => selectDifficulty('hard')}
            aria-pressed={difficulty === 'hard'}
          >
            HARD
          </button>
        </div>
      )}
    </div>
  )
}
