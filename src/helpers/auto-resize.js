function resize() {
  this.style.height = "auto"
  this.style.height = `${this.scrollHeight}px`
}

export const setResizeListeners = ($el, query) => {
  const targets = $el.querySelectorAll(query)
  targets.forEach(target => {
    target.style.height = `${target.scrollHeight}px`
    target.addEventListener("input", resize)
  })
}

export const resizeTextareas = ($el, query) => {
  const targets = $el.querySelectorAll(query)
  targets.forEach(target => {
    target.style.height = "auto"
    target.style.height = `${target.scrollHeight}px`
  })
}