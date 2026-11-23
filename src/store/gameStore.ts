import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getWinningLine } from '../utils/gameLogic'
import type { Board, Difficulty, GameMode, Mark, Outcome, ScoreboardStats, Theme } from '../types/game'

const createEmptyBoard = (): Board => Array(9).fill(null)

type GameStore = {
  board: Board
  nextPlayer: Mark
  outcome: Outcome
  winningLine: number[]
  mode: GameMode
  difficulty: Difficulty
  scores: ScoreboardStats
  theme: Theme
  playMove: (index: number, mark?: Mark) => void
  resetRound: () => void
  setMode: (mode: GameMode) => void
  setDifficulty: (difficulty: Difficulty) => void
  toggleTheme: () => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      board: createEmptyBoard(),
      nextPlayer: 'X',
      outcome: null,
      winningLine: [],
      mode: 'ai',
      difficulty: 'hard',
      scores: { X: 0, O: 0, draws: 0 },
      theme: 'light',

      playMove: (index, requestedMark) => {
        const state = get()
        const mark = requestedMark ?? state.nextPlayer
        if (
          index < 0 ||
          index >= state.board.length ||
          state.board[index] !== null ||
          state.outcome ||
          mark !== state.nextPlayer
        ) return

        const board = [...state.board]
        board[index] = mark
        const winningLine = getWinningLine(board)

        if (winningLine) {
          set({
            board,
            winningLine,
            outcome: mark,
            scores: { ...state.scores, [mark]: state.scores[mark] + 1 },
          })
        } else if (board.every(Boolean)) {
          set({
            board,
            outcome: 'draw',
            scores: { ...state.scores, draws: state.scores.draws + 1 },
          })
        } else {
          set({ board, nextPlayer: mark === 'X' ? 'O' : 'X' })
        }
      },

      resetRound: () => set({
        board: createEmptyBoard(),
        nextPlayer: 'X',
        outcome: null,
        winningLine: [],
      }),

      setMode: (mode) => set({
        mode,
        board: createEmptyBoard(),
        nextPlayer: 'X',
        outcome: null,
        winningLine: [],
      }),

      setDifficulty: (difficulty) => set({
        difficulty,
        board: createEmptyBoard(),
        nextPlayer: 'X',
        outcome: null,
        winningLine: [],
      }),

      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'grid-club-settings',
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
)
