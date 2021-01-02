<template>
  <v-container justify="center" align="center">
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      true
      color="green accent-4"
    ></v-progress-linear>
   <v-text-field
        v-model="searchCourseItem"
        append-icon="mdi-magnify"
        :label="`Search Course code( ${number_of_course})`"
        single-line
        hide-details
      ></v-text-field>
   <v-row style="width:100% ; font-family:cursive;" >
     
        <v-col  cols="12"  v-for="course in courseByStudent" :key="course._id"
          md="4">
          <n-link :to="`/student/${studentId}/notice/${course.courseInfo.courseCode}`" style="text-decoration: none; color: inherit;">
          <v-card style="text-align:center" >
          <v-row>
            <v-col cols="12"  md="4">
            <v-icon>mdi-book-open-variant</v-icon>
             <h4>{{course.courseInfo.courseCode}}</h4>
             </v-col>
             <v-col cols="12" md="4">
             <v-icon>mdi-book-open-variant</v-icon>
             <h4>{{course.courseInfo.courseCredit}}</h4>
             </v-col>
              <v-col cols="12" md="4">
             <v-icon>mdi-book-open-variant</v-icon>
             <h4>{{course.courseInfo.facultyId}}</h4>
             </v-col>
          </v-row>
           </v-card>
           </n-link>
       </v-col>
  
  </v-row>
  </v-container>
</template>

<script>

export default {
  data(){
    return {
         
         totalCourse : "2",
         courseByStudent:[],
         number_of_course:"",
         searchCourseItem:"",
         loading:true,
         studentId : this.$route.params.studentID,
    }
  },
  async created(){ 
  //  console.log(this.studentId)
    await this.$axios.$get(`student/${this.studentId}`)
    .then((res)=>{
      this.courseByStudent = res[0].courseList
      // this.number_of_course = res.length
    }).catch((err)=>{
      console.log(err)
    })
    // console.log(this.courseByStudent)
    this.loading = false
    
  },
    computed: {
    courseDataFilter: function() {
      return this.courseByStudent.filter(course => {
        // console.log(course)
        return course.courseInfo.courseCode.match(this.searchCourseItem);
      });
    }
  },
}
</script>
