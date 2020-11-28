export const state = () => ({
    snackbarInfo: []
})

export const mutations = {
    setSnackbarInfo(state, value) {
        state.snackbarInfo = value
    }
}
export const actions = {
    callSnackbarInfo({ commit }, info) {
        commit('setSnackbarInfo', info)
    }
}
export const getters = {
    getsnackbarInfo: state => {
        return state.snackbarInfo
    }
}