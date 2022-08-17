const state = {
    flashMessage: '',
}
const mutations = {
    SET_NOTIFICATION(state, message) {
        state.flashMessage = message
    },
    DELETE_NOTIFICATION(state) {
        state.flashMessage = ''
    },
}
const actions = {
    showFlashMessage({ commit }, { message, showDuration = 3000 }) {
        commit('SET_NOTIFICATION', message)
        setTimeout(() => {
            commit('DELETE_NOTIFICATION', showDuration)
        }, showDuration)
    },
}
export default {
    state,
    mutations,
    actions,
    namespaced: true,
}
