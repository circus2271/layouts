import { fromEvent, map, share } from 'rxjs'

const createIsMobileGetter = () => {
  const findOut = () => !!navigator.userAgent && navigator.userAgent.match(/(iphone|ipad|ipod|android|webos|blackberry|windows phone)/gi)

  let mobile = findOut()

  window.addEventListener('resize', () => mobile = findOut())
  return () => mobile
}

export const isMobile = createIsMobileGetter()

export const scroll$ = fromEvent(document, 'scroll', { passive: true }).pipe(map(() => window.scrollY), share() )

