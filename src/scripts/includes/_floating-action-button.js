import { isMobile } from './helpers'

let prevScroll
let time1 = new Date().getTime()

document.addEventListener('scroll', () => {
    if (isMobile()) {
        const time2 = new Date().getTime()
        const deltaTime = time2 - time1

        if (deltaTime < 50) return

        time1 = time2
        // continue

        const currentScroll = window.scrollY
        const deltaY = currentScroll - prevScroll
        // const gap = 30

        // scrolled down
        if (deltaY >= 30) {
            hideFloatingButton()
        }

        // scrolled up
        if (deltaY <= -30) {
            showFloatingButton()
        }

        prevScroll = currentScroll
    }
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


videoTitlesList.addEventListener('click', e => {
    e.preventDefault()
    
    if (e.target.tagName === 'A') {
        const id = e.target.hash

        if (id) {
            const element = document.querySelector(id)
            if (element) element.scrollIntoView({behavior: 'smooth'})

        }

        floatingButton.click()
    }
})


document.addEventListener('click', e => {
    if (mobileFullScreenMenu.classList.contains('visible') && !e.target.closest('.js-mobile-fullscreen-menu')) {
        floatingButton.click()
    }
})

function showFloatingButton() {
    floatingButton.classList.remove('hidden')
}

function hideFloatingButton() {
    floatingButton.classList.add('hidden')
}