export const state = () => ({
    isLoggedIn: false,
    userId: null,
    userRole: null
})

export const mutations = {
    setLoggedIn(state, userRole, userId = null) {
        state.isLoggedIn = true
        state.userId = userId
        state.userRole = userRole
        console.log("inside mutation")
    },
    setLoggedOut(state) {
        state.isLoggedIn = false
        state.userId = null
        state.userRole = null
        this.$auth.$storage.removeLocalStorage("userRole");
        this.$auth.$storage.removeLocalStorage("userId");
    }
}
export const actions = {
    async updateLoggedIn({ commit }, { userRole, userId }) {
        console.log("inside action")
        if (process.browser) {
            this.$auth.$storage.setLocalStorage("userRole", userRole);
            this.$auth.$storage.setLocalStorage("userId", userId);
        }
        commit('setLoggedIn', userRole, userId)
    },
    async loggedOut({ commit }) {
        commit('setLoggedOut')
    }

}
export const getters = {
    getLoggedIn: state => {
        var userInfo = {
            userRole: state.userRole,
            userId: state.userId
        }
        console.log(userInfo)
        return userInfo
    }

}