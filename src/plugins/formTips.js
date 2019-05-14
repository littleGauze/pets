export default {
  install (Vue, options) {
    let oldBorder = 'none'
    let hasFocus = false
    const focus = () => (hasFocus = true)
    function handle (el, binding) {
      const id = `${el.name}-tip`
      const parent = el.parentNode
      const old = document.getElementById(id)
      if (!old && binding.value) {
        oldBorder = el.style.border
        el.style.border = '1px solid red'
        const span = document.createElement('span')
        const tip = document.createTextNode(binding.value)
        span.appendChild(tip)
        span.id = id
        span.style.display = 'block'
        span.style.color = 'red'
        span.style.fontSize = '12px'
        parent.appendChild(span)
        return
      }

      if (!binding.value && old) {
        parent.removeChild(old)
        el.style.border = oldBorder
      }

      // listen blur event
      el.addEventListener('focus', focus)
      el.addEventListener('blur', function blurHanle (evt) {
        hasFocus = false
        setTimeout(() => {
          !hasFocus && window.scroll(0, 0)
        }, 100)
        const old = document.getElementById(id)
        if (el.value && old) {
          parent.removeChild(old)
          el.style.border = oldBorder
          el.removeEventListener('blur', blurHanle)
          el.removeEventListener('focus', focus)
        }
      })
    }
    Vue.directive('ftip', {
      inserted: handle,
      update: handle
    })
  }
}
