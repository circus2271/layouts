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

// the idea is that navigations between #hash part of url
// will be replaced buy each other, so navigation back will return back to previous page and not to previous hash
//const scrollIntoView = () => {
//    const elementId = window.location.hash
//    const element = elementId ? document.querySelector(elementId) : null
//
//    if (element) element.scrollIntoView({behavior: 'smooth'})
//}

// check if an url has hash id
// if so, check if there is an element with this id
// if any, scroll into it
//scrollIntoView()

fromEvent(videoTitlesList, 'click')
  .pipe(
    filter(el => el.target.tagName === 'A'),
    map(el => [el.target.hash, el])
  )
  .subscribe(([id, e]) => {
    e.preventDefault()

    if (id) {
      const element = document.querySelector(id)
      if (element) element.scrollIntoView({behavior: 'smooth'})
    }

    floatingButton.click()
  })

fromEvent(document, 'click')
  .pipe(filter(e => mobileFullScreenMenu.classList.contains('visible') && !e.target.closest('.js-mobile-fullscreen-menu')))
  .subscribe(() => floatingButton.click())

