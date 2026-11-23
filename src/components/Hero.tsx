import { Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="game-intro" aria-labelledby="game-title">
      <div className="eyebrow">
        <Sparkles size={13} aria-hidden="true" /> THE CLASSIC, REIMAGINED
      </div>
      <h1 id="game-title">
        Think fast.
        <br />
        <span>Make your mark.</span>
      </h1>
      <p className="intro-copy">A little friendly rivalry never hurt anybody.</p>
    </section>
  )
}
