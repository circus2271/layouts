import { fromEvent, map, share } from 'rxjs'


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


///
export const scroll$ = fromEvent(document, 'scroll', { passive: true }).pipe(map(() => window.scrollY), share() )
