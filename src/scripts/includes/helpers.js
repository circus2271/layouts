
class MobileDeviceDetector {

  constructor() {
    this.isMobile = this.checkIfDeviceIsMobile()
    window.addEventListener('resize', () => this.isMobile = this.checkIfDeviceIsMobile())
  }

  checkIfDeviceIsMobile() {
    return !!navigator.userAgent && navigator.userAgent.match(/(iphone|ipad|ipod|android|webos|blackberry|windows phone)/gi)
  }
}

const mobileDeviceDetector = new MobileDeviceDetector()

export const isMobile = () => mobileDeviceDetector.isMobile


function animate({ returnCallback } = { returnCallback: false}) {
  const animations = []

  const a = () => {
    if (animations.length === 0) return

    const currentScroll = window.scrollY
    animations.forEach(cb => cb ? cb(currentScroll) : null)

    requestAnimationFrame(a)
  }

  requestAnimationFrame(a)

  if (returnCallback) {
    return function registerAnimationCallback(cb) {
      animations.push(cb)
    }
  }
}

export const registerAnimationCallback = animate({returnCallback: true})

// function animate() {
//   const animations = []
//   console.log('initialize')
//   setInterval(() => {
//     animations.forEach(cb => cb ? cb() : null)
//   }, 100)
//
//   return function registerCallback(cb) {
//     animations.push(cb)
//   }
//
// }
//
// const registerCallback = animate()
//
// registerCallback(() => console.log(10))
// registerCallback(() => console.log(20))