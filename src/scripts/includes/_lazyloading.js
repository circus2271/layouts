import lozad from 'lozad'

const observer = lozad('.lozad',
  {
    loaded: function (el) {
      const withPlaceholder = el.classList.contains('js-lozad-with-sqip-placeholder')

      if (withPlaceholder) {
        el.classList.add('loaded')
      }
    }
  }
)

observer.observe()