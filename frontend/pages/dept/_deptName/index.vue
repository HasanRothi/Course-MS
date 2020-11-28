<template>
  <v-container>
      <v-card dark style="text-align:center;font-family:cursive;" class="pa-2" >
          {{deptName}}
      </v-card>
      <v-row justify="center" align="center">
   <v-col cols="12"
          md="6">
         <CourseListView/>
          </v-col>
          <v-col cols="12"
          md="6">
          <FacultyListView/>
          </v-col>
  </v-row>
  </v-container>
</template>

<script>
import CourseListView from '../../../components/course/courseListView'
import FacultyListView from '../../../components/faculty/facultyListView'
export default {
     head() {
      return {
        title: `Course-MS | Dept | ${this.$route.params.deptName}`
      }
  },
data() {
    return {
        deptName : this.$route.params.deptName
    }
},
 components:{
    CourseListView,
    FacultyListView
  },
  created(){
  },
  components: {
  },
  computed:{
  }
}
</script>

<style>

</style>