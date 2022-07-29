import lozad from 'lozad'

const observer = lozad('.lozad',
  {
    loaded: function (el) {
      const withPlaceholder = el.classList.contains('lozad-sqip-extension')

      if (withPlaceholder) {
        const placeholder = el.parentNode.querySelector('.lozad-sqip-placeholder')
        if (placeholder) placeholder.classList.add('fade-out')
      }
    }
  }
)

observer.observe()