export type Mark = 'X' | 'O'
export type Cell = Mark | null
export type Board = Cell[]
export type GameMode = 'ai' | 'local'
export type Difficulty = 'easy' | 'hard'
export type Outcome = Mark | 'draw' | null
export type ScoreboardStats = Record<Mark, number> & { draws: number }
export type Theme = 'light' | 'dark'
