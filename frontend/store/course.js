export const state = () => ({
    courseList: []
})

export const mutations = {
    setCourseList(state, courses = "lol") {
        state.courseList = courses
            // console.log("Inside mutaions" + state.courseList)
    }
}
export const actions = {
    async fetchCourseList({ commit }) {
        // console.log("Inside actions")
        const courses = await this.$axios.$get('/course/all')
        commit('setCourseList', courses)
    }
}
export const getters = {
    getCourseList: state => {
        return state.courseList
    },
    getSingleCourse: state => courseCode => {
        console.log("Inside get individual course - " + courseCode)
        return state.courseList.Courses.filter(e => {
            // console.log(e.CourseCode)
            return e.CourseCode == courseCode
        })
    }
}