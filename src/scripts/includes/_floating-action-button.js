import { distinctUntilChanged, fromEvent, map, filter, throttleTime } from 'rxjs'
import { isMobile, scroll$ } from './helpers'

let prevScroll
let buttonVisible = true
let ignoreScrollEvents = false

scroll$
  .pipe(
    throttleTime(50),
    filter(() => ignoreScrollEvents === false && isMobile()),
    map((currentScroll) => {
      const deltaY = currentScroll - prevScroll

      // scrolled down
      if (deltaY >= 30) {
        buttonVisible = false
      }

      // scrolled up
      if (deltaY <= -30) {
        buttonVisible = true
      }

      prevScroll = currentScroll
      return buttonVisible
    }),
    distinctUntilChanged(),
  )
  .subscribe(buttonVisible => {
    buttonVisible ?
      floatingButton.classList.remove('hidden') :
      floatingButton.classList.add('hidden')
  })

const floatingButton = document.querySelector('.js-floating-action-button'),
  mobileFullScreenMenu = document.querySelector('.js-mobile-fullscreen-menu')

mobileFullScreenMenu.classList.add('initialize-transitions')

floatingButton.onclick = (e) => {
  e.stopPropagation()

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

fromEvent(videoTitlesList, 'click')
  .pipe(filter(el => el.target.tagName === 'A'))
  .subscribe(e => floatingButton.click())

fromEvent(document, 'click')
  .pipe(filter(e => mobileFullScreenMenu.classList.contains('visible') && !e.target.closest('.js-mobile-fullscreen-menu')))
  .subscribe(() => floatingButton.click())

