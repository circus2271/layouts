import { fromEvent, share, throttleTime } from 'rxjs'

export const isMobile = () => !!navigator.userAgent && navigator.userAgent.match(/(iphone|ipad|ipod|android|webos|blackberry|windows phone)/gi)

export const scroll$ = fromEvent(document, 'scroll', { passive: true }).pipe(    throttleTime(100), share())
