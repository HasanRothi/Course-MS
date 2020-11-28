<template>
  <div>
       <h3 style="text-align:center;font-family:cursive">Offered Course</h3>
           <v-text-field
        v-model="searchCourseItem"
        append-icon="mdi-magnify"
        :label="`Search Course code( ${number_of_course})`"
        single-line
        hide-details
      ></v-text-field>
      <div v-if="courseDataFilter == 0" style="text-align:center" class="pa-16">
      <b>No Student Found</b>
    </div>

    <v-row style="text-align:center">
      <v-container fluid>
        <v-card class="rounded-l-xl">
          <v-simple-table
            class="pt-8"
            v-if="courseDataFilter != 0"
            style="backgroundColor:#f1f2f6"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="color:black">
                    SL
                  </th>
                  <th class="text-left" style="color:black">
                    Course Code
                  </th>

                  <th class="text-left" style="color:black">
                    Course Title
                  </th>
                  <th class="text-left" style="color:black">
                    Course Credit
                  </th>
                  <th class="text-left" style="color:black">
                    Faculty
                  </th>

                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(course, i) in courseDataFilter"
                  :key="course.id"
                  class="pa-15"
                >
                  <td>{{ i + 1 }}</td>
                  <td>{{ course.CourseCode }} 😄</td>
                  <td>{{ course.CourseName }}</td>
                  <td>{{ course.CourseCredit }}</td>
                  <td>{{ course.Faculty }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-container>
    </v-row>
  </div>
</template>

<script>
export default {
data(){
    return {
 ALL_COURSES:[],
       ALL_COURSES:[],
      number_of_course : "",
       searchCourseItem:"",
    }
},
async created(){
    // await this.$store.dispatch("course/fetchCourseList");
    //   var data = await this.$store.getters["course/getCourseList"];
    //   this.ALL_COURSES = data.Courses;
    //   this.number_of_course = data["Number of course"];
     await this.$axios.$get(`/course/dept/${this.$route.params.deptName}`,)
    .then((res)=>{
      console.log(res)
       this.ALL_COURSES = res["Courses"]
      this.number_of_course = res["Number of course"];
    }).catch((err)=>{
      console.log(err)
    })
},
computed:{
     courseDataFilter: function() {
      return this.ALL_COURSES.filter(course => {
        return course.CourseCode.match(this.searchCourseItem);

      });
    }
}
}
</script>

<style>

</style>