import { Footer } from './components/Footer'
import { GamePlayground } from './components/GamePlayground'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Scoreboard } from './components/Scoreboard'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <Header />
      <section className="game-layout" aria-label="Tic-tac-toe game">
        <Hero />
        <GamePlayground />
        <Scoreboard />
        <Footer />
      </section>
    </main>
  )
}

export default App
