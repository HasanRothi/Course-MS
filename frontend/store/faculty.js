export const state = () => ({
    facultyList: []
})

export const mutations = {
    setfacultyList(state, facultys = "lol") {
        state.facultyList = facultys
            // console.log("Inside mutaions" + state.facultyList)
    }
}
export const actions = {
    async fetchfacultyList({ commit }) {
        // console.log("Inside actions")
        const facultys = await this.$axios.$get('/faculty')
        commit('setfacultyList', facultys)
    }
}
export const getters = {
    getFacultyList: state => {
        // console.log("Inside gettter faculty")
        return state.facultyList
    },
    getSingleCourse: state => userId => {
        // console.log("Inside get individual faculty - " + userId)
        return state.facultyList.Facultys.filter(e => {
            // console.log(e.CourseCode)
            return e.userId == userId
        })
    }
}