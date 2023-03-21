import confetti from 'canvas-confetti'

export function blast(){
	confetti({
	  particleCount: 60,
	  spread: 90,
	  origin: { y: 0.4 },
	  ticks: 150,
	  gravity: 1.2,
	  scalar: 1.2,
	  disableForReducedMotion: true
	});
}
