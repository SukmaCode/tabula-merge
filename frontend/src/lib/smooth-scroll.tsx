import Lenis from 'lenis'

const lenis = new Lenis({
    smoothWheel: true,
    lerp: 0.05,
})

function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

export default lenis