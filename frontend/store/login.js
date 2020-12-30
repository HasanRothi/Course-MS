export const state = () => ({
    isLoggedIn: false,
    userId: null,
    userRole: null
})

export const mutations = {
    setLoggedIn(state, userRole, userId="16255008") {
        state.isLoggedIn = true
        state.userId = userId
        state.userRole = userRole
        console.log("inside mutation" + userRole + userId)
    },
    setLoggedOut(state) {
        console.log("Logout from mutations")
        state.isLoggedIn = false
        state.userId = null
        state.userRole = null
    }
}
export const actions = {
    async updateLoggedIn({ commit }, { userRole, userId }) {
        console.log("inside action" + userRole + userId)
             await this.$localForage.setItem("userRole", userRole)
             await this.$localForage.setItem("userId", userId)
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
        console.log('Inside getters', userInfo)
        return userInfo
    }

}