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

let scrollEnd = animationContainer.getBoundingClientRect().bottom
// let scrollStart = (scrollEnd - window.innerHeight) || 0
let scrollStart = scrollEnd - window.innerHeight
let scrollDistance = scrollEnd - scrollStart;
window.onresize = () => {
  scrollEnd = animationContainer.getBoundingClientRect().bottom
  scrollStart = scrollEnd - window.innerHeight
  scrollDistance = scrollEnd - scrollStart;
  console.log('resize')
}

let firstRun = true
const handleDiverOnScrollAnimation = (currentScroll) => {
  const pixelsPassed = (currentScroll - scrollStart) || 0
  const percentsScrolled = ((pixelsPassed / scrollDistance) * 100).toFixed(0)
  console.log({percentsScrolled})

  if (percentsScrolled > 100 && !firstRun) return

  const nextBreakpoint = diverAnimationBreakpoints.filter(breakpoint => breakpoint.scrolledDistancePercent > percentsScrolled)[0]
  const transformYPropertyValue = nextBreakpoint ? nextBreakpoint.y * percentsScrolled / nextBreakpoint.scrolledDistancePercent : lastBreakpoint.y

  const randomSpeed = 1 + Math.random() / 10 // from 1 to 1.1
  diver.style.transform = `translateX(${percentsScrolled * (animationContainer.clientWidth) / 100 * randomSpeed}px) translateY(${transformYPropertyValue}px)`

  // TODO: improve this
  firstRun = false
}

handleDiverOnScrollAnimation(window.scrollY)
setTimeout(() => {
  diver.classList.add('visible', 'transition-styles-applied')
})

scroll$
  // .pipe(tap((cs)=>console.log({cs, scrollStart, scrollEnd})),filter(currentScroll => currentScroll > scrollStart && currentScroll < scrollEnd))
  // .pipe(filter(currentScroll => currentScroll > scrollStart && currentScroll < scrollEnd), tap((cs)=>console.log({cs, scrollStart, scrollEnd})),)
  .subscribe((currentScroll) => handleDiverOnScrollAnimation(currentScroll))