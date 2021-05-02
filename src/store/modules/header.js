const state = () => ({
  right: 'gameList',
  hideLeft: false,
  showGameList: false,
  showHowToPlay: false,
  transparent: false,
})

const getters = {
  getHideLeft: (state) => {
    return state.hideLeft
  },
  getRight: (state) => {
    return state.right
  },
  getShowGameList: (state) => {
    return state.showGameList
  },
  getShowHowToPlay: (state) => {
    return state.showHowToPlay
  },
  getTransparent: (state) => {
    return state.transparent
  },
}

const mutations = {
  setRight: (state, value) => {
    state.right = value
  },
  setHideLeft: (state, bool) => {
    state.hideLeft = bool
  },
  setTransparent: (state, bool) => {
    state.transparent = bool
  },
  toggleGameList: (state) => {
    state.showGameList = !state.showGameList
  },
  closeGameList: (state) => {
    state.showGameList = false
  },
  toggleHowToPlay: (state) => {
    state.showHowToPlay = !state.showHowToPlay
  },
  closeHowToPlay: (state) => {
    state.showHowToPlay = false
  },
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}