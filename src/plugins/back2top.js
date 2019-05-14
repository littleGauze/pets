export default {
  install (Vue, options) {
    const scrolls = {}
    function back2top (scroll) {
      scroll.scrollTop = 0
    }
    Vue.directive('back2top', {
      inserted (el, binding) {
        const scroller = binding.value
        const name = binding.arg
        const scroll = document.querySelector(scroller)
        el.style.visibility = 'hidden'
        el.style.opacity = 0
        el.style.transition = 'all .5s ease'
        el.addEventListener('click', back2top.bind(this, scroll))
        scroll.addEventListener('scroll', evt => {
          const top = evt.target.scrollTop
          if (top > 500) {
            el.style.visibility = null
            el.style.opacity = 1
          } else {
            el.style.visibility = 'hidden'
            el.style.opacity = 0
          }
        })
        scrolls[name] = scroll
      },
      unbind (el) {
        el.removeEventListener('click', back2top)
      }
    })

    Vue.prototype.$back2top = scrolls
  }
}
