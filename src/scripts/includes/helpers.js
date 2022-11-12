import { fromEvent, map, share, throttleTime } from 'rxjs'

export const isMobile = () => !!navigator.userAgent && navigator.userAgent.match(/(iphone|ipad|ipod|android|webos|blackberry|windows phone)/gi)

// export const scroll$ = fromEvent(document, 'scroll', { passive: true }).pipe(throttleTime(50),throttleTime(50), map(() => window.scrollY), share() )
export const scroll$ = fromEvent(document, 'scroll', { passive: true }).pipe(map(() => window.scrollY), share() )
