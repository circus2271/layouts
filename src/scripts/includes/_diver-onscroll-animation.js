import { registerAnimationCallback } from './helpers'

const animationContainer = document.querySelector('.js-diver-section .js-animation-container')
// const hueRotateDegrees = window.getComputedStyle(animationContainer).getPropertyValue('--hue-rotate-degrees')

const setHueRotateDegrees = (degrees) => {
//  const normalizedDegrees = Math.round(degrees)
//  const multipliedDegrees = normalizedDegrees * 1.5
//
//  animationContainer.style.setProperty('--hue-rotate-degrees', `${multipliedDegrees}deg`)
//  animationContainer.style.setProperty('--opposite-hue-rotate-degrees', `-${multipliedDegrees}deg`)
//
//  return degrees
}

const diver = animationContainer.querySelector('.js-diver')
// we will devide animation container height by several parts to simplify up/down animation
const verticalFractions = 6
const fractionHeight = animationContainer.clientHeight / verticalFractions

const diverAnimationBreakpoints = [
  {
    scrolledDistancePercent: 10,
    y: -fractionHeight,
    rotate: 0,
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
    y: fractionHeight * 1.15,
    rotate: 20
  },
  {
    scrolledDistancePercent: 55,
    y: fractionHeight * 0.72,
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

const getScrollStartY = () => {
  const startRelativeToPageTop = animationContainer.getBoundingClientRect().top + window.scrollY
  const gap = window.innerHeight - window.innerHeight / 5
  const startWithGap = startRelativeToPageTop - gap

  return startWithGap > 0 ? startWithGap : 0
};
const getScrollEndY = () => animationContainer.getBoundingClientRect().bottom + window.scrollY;

let scrollStart = getScrollStartY();
let scrollEnd = getScrollEndY();

window.addEventListener('resize', _ => {
  scrollStart = getScrollStartY();
  scrollEnd = getScrollEndY();
})

let prevBreakPoint

const handleDiverOnScrollAnimation = (currentScroll) => {
  const delta = scrollEnd - scrollStart;

  let percentsScrolled = ((currentScroll - scrollStart) / delta) * 100
  // normalize value to set diver's initial position on a first run
  if (percentsScrolled > 100) percentsScrolled = 100
  if (percentsScrolled < 0) percentsScrolled = 0
  // console.log(percentsScrolled)

  const nextBreakpoint = diverAnimationBreakpoints.find(breakpoint => breakpoint.scrolledDistancePercent > percentsScrolled)
  const transformYPropertyValue = nextBreakpoint ? nextBreakpoint.y * percentsScrolled / nextBreakpoint.scrolledDistancePercent : lastBreakpoint.y

  const breakPointDidntChange = nextBreakpoint?.scrolledDistancePercent === prevBreakPoint?.scrolledDistancePercent

  // const randomSpeed = 1 + Math.random() / 10 // from 1 to 1.1
  const inertia = breakPointDidntChange ? 1 : 1 + Math.random() / 10 // from 1 to 1.1
  // const xDistance = (animationContainer.clientWidth * (percentsScrolled / 100)) * randomSpeed
  const xDistance = (animationContainer.clientWidth * (percentsScrolled / 100)) * inertia
  diver.style.transform = `translateX(${xDistance}px) translateY(${transformYPropertyValue}px) rotate(${nextBreakpoint?.rotate ?? 0}deg)`

  // <= 16
  // <= 26
  // > 26 && < 56
  // >= 56 && < 82
  // >= 82
  if (percentsScrolled > 28 && percentsScrolled < 56) {
    setHueRotateDegrees(28)

  } else if (percentsScrolled >= 56 && percentsScrolled < 80) {
//    diver.classList.add('semi-transparent')
  } else if (percentsScrolled >= 80) {
//    diver.classList.add('locked')
  } else {
    // <= 28
    setHueRotateDegrees(percentsScrolled)

    if (percentsScrolled <= 16) {
//      diver.classList.remove('semi-transparent')
//      diver.classList.remove('locked')
    }
  }

  prevBreakPoint = nextBreakpoint
}

handleDiverOnScrollAnimation(window.scrollY)
setTimeout(() => {
  diver.classList.add('visible', 'transition-styles-applied')
})

registerAnimationCallback((currentScroll) => {
  const shouldAnimate = currentScroll > scrollStart && currentScroll < scrollEnd

  if (shouldAnimate) {
    handleDiverOnScrollAnimation(currentScroll)
  }
})
