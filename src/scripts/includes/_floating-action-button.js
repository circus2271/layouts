import { distinctUntilChanged, fromEvent, map, filter, throttleTime, from, switchMap, tap, BehaviorSubject } from 'rxjs'
import { isMobile, scroll$ } from './helpers'

let prevScroll
let buttonVisible = true
let ignoreScrollEvents = false

scroll$
  .pipe(
    throttleTime(50),
    filter(() => ignoreScrollEvents === false && isMobile()),
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
      buttonVisible ?
        floatingButton.classList.remove('hidden') :
        floatingButton.classList.add('hidden')
    },
    error: console.log
  })

const floatingButton = document.querySelector('.js-floating-action-button'),
  mobileFullScreenMenu = document.querySelector('.js-mobile-fullscreen-menu')

mobileFullScreenMenu.classList.add('initialize-transitions')

floatingButton.onclick = (e) => {
  e.stopPropagation();

  floatingButton.classList.toggle('active')
  mobileFullScreenMenu.classList.toggle('visible')
  document.body.classList.toggle('overflow-hidden--xs-s-m')
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

fromEvent(videoTitlesList, 'click', {capture: true})
  .pipe(
    filter(el => el.target.tagName === 'A'),
  ).subscribe(() => floatingButton.click())

fromEvent(document, 'click')
  .pipe(filter(() => mobileFullScreenMenu.classList.contains('visible')))
  .subscribe(() => floatingButton.click())

