import { registerAnimationCallback, isMobile } from './helpers'

let prevScroll

document.addEventListener('scroll', () => {
    if (isMobile()) {
        const currentScroll = window.scrollY
        const deltaY = currentScroll - prevScroll
        // document.querySelector('#absolute').innerHTML = `scrolled ${deltaY}%`
        if (deltaY>0) console.log(`scrolled ${deltaY}`)
        // const gap = 20
        // const gap = 20
        const gap = 30

        // scrolled down
        if (deltaY >= gap) {
            hideFloatingButton()
        }

        // scrolled up
        if (deltaY <= -gap) {
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