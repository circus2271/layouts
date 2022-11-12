import { scroll$ } from './helpers'
import { filter, tap } from 'rxjs'

const animationContainer = document.querySelector('.js-diver-section .js-animation-container')
const diver = animationContainer.querySelector('.js-diver')
// we will devide animation container height by several parts to simplify up/down animation
const verticalFractions = 6
const fractionHeight = animationContainer.clientHeight / verticalFractions

const diverAnimationBreakpoints = [
  {
    scrolledDistancePercent: 10,
    y: -fractionHeight,
    rotate: 0
  },
  {
    scrolledDistancePercent: 20,
    y: -fractionHeight * 1.6,
    rotate: 0
  },
  {
    scrolledDistancePercent: 30,
    y: -fractionHeight,
    rotate: 20
  },
  {
    scrolledDistancePercent: 35,
    y: 0,
    rotate: 25
  },
  {
    scrolledDistancePercent: 40,
    y: fractionHeight,
    rotate: 20
  },
  {
    scrolledDistancePercent: 45,
    y: fractionHeight * 1.5,
    rotate: 20
  },
  {
    scrolledDistancePercent: 55,
    y: fractionHeight,
    rotate: 0
  },
  {
    scrolledDistancePercent: 70,
    y: 0,
    rotate: -10
  },
  {
    scrolledDistancePercent: 80,
    y: -fractionHeight,
    rotate: -12.5
  },
  {
    scrolledDistancePercent: 90,
    y: -fractionHeight * 1.35,
    rotate: -15
  },
  {
    scrolledDistancePercent: 100,
    y: -fractionHeight * 2.25,
    rotate: -15
  }
]

const lastBreakpoint = diverAnimationBreakpoints[diverAnimationBreakpoints.length - 1]

const getScrollEnd = () => animationContainer.getBoundingClientRect().bottom + window.scrollY;
const getScrollStart = () => {
  const scrollStart = scrollEnd - window.innerHeight;
  return scrollStart < 0 ? 0 : scrollStart;
}

let scrollEnd = getScrollEnd()
let scrollStart = getScrollStart();
window.onresize = () => {
  scrollEnd = getScrollEnd()
  scrollStart = getScrollStart();
}

let firstRun = true
const handleDiverOnScrollAnimation = (currentScroll) => {
  const pageScrollPercent = +((currentScroll - scrollStart) / scrollEnd * 100).toFixed(0)
  const percentsAnimated = pageScrollPercent

  if (pageScrollPercent > 100 && !firstRun) return

  const nextBreakpoint = diverAnimationBreakpoints.filter(breakpoint => breakpoint.scrolledDistancePercent > percentsAnimated)[0]
  const transformYPropertyValue = nextBreakpoint ? nextBreakpoint.y * percentsAnimated / nextBreakpoint.scrolledDistancePercent : lastBreakpoint.y

  const randomSpeed = 1 + Math.random() / 10 // from 1 to 1.1
  diver.style.transform = `translateX(${percentsAnimated * (animationContainer.clientWidth) / 100 * randomSpeed}px) translateY(${transformYPropertyValue}px)`

  // TODO: improve this
  firstRun = false;
}

handleDiverOnScrollAnimation(window.scrollY)
setTimeout(() => {
  diver.classList.add('visible', 'transition-styles-applied')
})

scroll$
  .pipe(tap(() => console.log({scrollStart, scrollEnd})), filter(currentScroll => currentScroll > scrollStart && currentScroll < scrollEnd))
  .subscribe((currentScroll) => handleDiverOnScrollAnimation(currentScroll))