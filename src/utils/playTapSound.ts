import tapSoundUrl from '../../sounds/game-tap-2073.wav'

export function playTapSound() {
  const sound = new Audio(tapSoundUrl)
  sound.volume = 0.4
  void sound.play().catch((error: unknown) => {
    console.warn('Unable to play the move sound.', error)
  })
}
