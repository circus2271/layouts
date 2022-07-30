const circle = document.querySelector('.animation-container .circle');
const animationContainer = document.querySelector('.animation-container')
// we will devide animationn container height by several parts to simplify up/down animation
const verticalFractions = 6
const fractialHeight = animationContainer.clientHeight / verticalFractions

const circleHeight = circle.clientHeight
const circleCenterY = () => circle.offsetTop + (circleHeight / 2)

const circleAnimationBreakpoints = [
  {
    scrolledDistancePercent: 10,
    y: -fractialHeight,
    rotate: 0
  },
  {
    scrolledDistancePercent: 20,
    y: -fractialHeight * 1.6,
    rotate: 0
  },
  {
    scrolledDistancePercent: 30,
    y: -fractialHeight,
    rotate: 20
  },
  {
    scrolledDistancePercent: 35,
    y: 0,
    rotate: 25
  },
  {
    scrolledDistancePercent: 40,
    y: fractialHeight,
    rotate: 20
  },
  {
    scrolledDistancePercent: 45,
    y: fractialHeight * 1.5,
    rotate: 20
  },
  {
    scrolledDistancePercent: 55,
    y: fractialHeight,
    rotate: 0
  },
  {
    scrolledDistancePercent: 70,
    y: 0,
    rotate: -10
  },
  {
    scrolledDistancePercent: 80,
    y: -fractialHeight,
    rotate: -12.5
  },
  {
    scrolledDistancePercent: 90,
    y: -fractialHeight * 1.35,
    rotate: -15
  },
  {
    scrolledDistancePercent: 100,
    y: -fractialHeight * 2.25,
    rotate: -15
  }
]

const lastBreakpoint = circleAnimationBreakpoints[circleAnimationBreakpoints.length-1]


// const windowWidth = window.innerWidth;

let documentHeight = document.body.clientHeight;
// let maxScroll = documentHeight - window.innerHeight
// let maxScroll = window.innerHeight
// let maxScroll = window.innerHeight - 200
let maxScroll = window.innerHeight - circleCenterY()
window.onresize = () => {
  documentHeight = document.body.clientHeight;
  maxScroll = documentHeight - window.innerHeight
}

window.onscroll = e => {
  const currentScroll = window.scrollY
  const pageScrollPercent = +(currentScroll / maxScroll * 100).toFixed(0)
  const percentsAnimated = pageScrollPercent

  console.log({currentScroll, percentsAnimated})

  const nextBreakpoint = circleAnimationBreakpoints.filter(breakpoint => breakpoint.scrolledDistancePercent > percentsAnimated)[0]
  const transformYPropertyValue = nextBreakpoint ? nextBreakpoint.y * percentsAnimated / nextBreakpoint.scrolledDistancePercent : lastBreakpoint.y

  const randomSpeed = 1 + Math.random() / 10 // from 1 to 1.1
  // circle.style.transform = `translateX(${percentsAnimated * window.innerWidth / 100 * randomSpeed}px) translateY(${transformYPropertyValue}px)`
  circle.style.transform = `translateX(${percentsAnimated * (animationContainer.clientWidth) / 100 * randomSpeed }px) translateY(${transformYPropertyValue}px) rotate(${nextBreakpoint?.rotate ?? 0}deg) translateZ(-28px)`
}