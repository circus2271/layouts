import lozad from 'lozad'

// such strange function declaration is used to prevent webpack's function name changing and minification
window['onYouTubeIframeAPIReady'] = () => {
  lozad('.js-youtube-player-wrapper .js-player', {
    load: player => {
      new YT.Player(player, {
        height: '100%',
        width: '100%',
        videoId: player.dataset.videoId,
        // playerVars: {
        //   // 'autoplay': 1
        //   autoplay: 1,
        //   mute: 1
        // },
      })
    }
  }).observe()
}

const tag = document.createElement('script')
tag.src = 'https://www.youtube.com/iframe_api'
document.body.appendChild(tag)
