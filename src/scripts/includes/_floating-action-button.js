import { distinctUntilChanged, fromEvent, map, filter, throttleTime } from 'rxjs'

let prevScroll
let buttonVisible = true
let ignoreScrollEvents = false

fromEvent(document, 'scroll', { passive: true })
  .pipe(
    throttleTime(50),
    filter(() => ignoreScrollEvents === false),
    map(() => {
      const currentScroll = window.scrollY

      if (currentScroll - prevScroll > 30) {
        buttonVisible = false
      }

      if (currentScroll + 30 < prevScroll) {
        buttonVisible = true
      }

      prevScroll = currentScroll
      return buttonVisible
    }),
    distinctUntilChanged(),
  )
  .subscribe({
    next: buttonVisible => {
      if (buttonVisible) {
        floatingButton.classList.remove('hidden')
      }
      if (buttonVisible === false) {
        floatingButton.classList.add('hidden')
      }
    },
    error: console.log
  })

const floatingButton = document.querySelector('.js-floating-action-button'),
  mobileFullScreenMenu = document.querySelector('.js-mobile-fullscreen-menu')

mobileFullScreenMenu.classList.add('initialize-transitions')

floatingButton.onclick = () => {
  floatingButton.classList.toggle('active')
  mobileFullScreenMenu.classList.toggle('visible')
  document.body.classList.toggle('overflow-hidden')
}

const videoPlayers = document.querySelectorAll('.js-player')

const html = [...videoPlayers].map(player => {
  const { videoTitle, videoId } = player.dataset

  const markup = `
    <li>
      <a href="#${videoId}">
        ${videoTitle}
      </a>
    </li>
  `

  return markup
}).join('')

const videoTitlesList = document.querySelector('.js-fullscreen-menu__video-titles-list')
videoTitlesList.innerHTML = html

fromEvent(window, 'popstate')
  .pipe(
    filter(() => !!window.location.hash),
    map(() => {
      const possibleVideoId = window.location.hash.slice(1),
        playerEl = document.querySelector(`[data-video-id="${possibleVideoId}"]`),
        distanceToPlayer = playerEl.getBoundingClientRect().top,
        distanceWithGap = distanceToPlayer - 20

      return distanceWithGap
    })
  ).subscribe({
  next: scrollDistance => {
    floatingButton.classList.remove('active')
    mobileFullScreenMenu.classList.remove('visible')
    document.body.classList.remove('overflow-hidden')
    ignoreScrollEvents = true
    window.scrollBy(0, scrollDistance)

    setTimeout(() => {
      // hack using event loop
      // this code will be executed not immediately, but after short delay
      // "on next tick"
      ignoreScrollEvents = false
    }, 0)
  },
  error: console.log
})
