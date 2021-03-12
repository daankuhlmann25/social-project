export const transitionEndEventName = () =>  {
  let i,
      undefined,
      el = document.createElement('div'),
      transitions = {
          'transition':'transitionend',
          'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
          'MozTransition':'transitionend',
          'WebkitTransition':'webkitTransitionEnd'
      }

  for (i in transitions) {
      if (Object.prototype.hasOwnProperty.call(transitions, i) && el.style[i] !== undefined) {
          return transitions[i]
      }
  }
}