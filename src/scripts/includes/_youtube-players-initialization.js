import lozad from 'lozad'
import { isMobile } from './helpers.js'

window['onYouTubeIframeAPIReady'] = () => {
  lozad('.js-youtube-placeholder-image', {
    // TODO: rewrite
    loaded: placeholderImage => {
      const playerWrapper = placeholderImage.closest('.js-youtube-player-wrapper')
      const player = playerWrapper.querySelector('.js-player')
      const placeholderImageWrapper = placeholderImage.closest('.js-youtube-placeholder-image-wrapper')
      placeholderImageWrapper.classList.add('placeholder-image-loaded')

      placeholderImageWrapper.onclick = () => {
        new YT.Player(player, {
          height: '100%',
          width: '100%',
          videoId: player.dataset.videoId,
          playerVars: {
            autoplay: isMobile() ? 0 : 1,
          },
        })

        // playerWrapper.classList.add('bg-transparent')
        placeholderImageWrapper.classList.add('hidden')
      }
    }
  }).observe()
}
const tag = document.createElement('script')
tag.src = 'https://www.youtube.com/iframe_api'
document.body.appendChild(tag)
