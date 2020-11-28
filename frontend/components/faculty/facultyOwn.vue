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
     
        <v-col  cols="12"  v-for="course in courseDataFilter" :key="course._id"
          md="4">
          <n-link :to="`/faculty/${facultyId}/notice/${course.courseCode}`" style="text-decoration: none; color: inherit;">
          <v-card style="text-align:center" >
          <v-row>
            <v-col cols="12"  md="4">
            <v-icon>mdi-book-open-variant</v-icon>
             <h4>{{course.courseCode}}</h4>
             </v-col>
             <v-col cols="12" md="4">
             <v-icon>mdi-book-open-variant</v-icon>
             <h4>{{course.courseName}}</h4>
             </v-col>
              <v-col cols="12" md="4">
             <v-icon>mdi-book-open-variant</v-icon>
             <h4>{{course.courseCredit}}</h4>
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
         courseByFaculty:[],
         number_of_course:"",
         searchCourseItem:"",
         loading:true,
         facultyId: this.$route.params.facultyID
    }
  },
  async created(){ 
   
    await this.$axios.$get(`course/all/faculty/${this.facultyId}`)
    .then((res)=>{
      this.courseByFaculty = res
      this.number_of_course = res.length
    }).catch((err)=>{
      console.log(err)
    })
    // console.log(this.courseByFaculty)
    this.loading = false
    
  },
    computed: {
    courseDataFilter: function() {
      return this.courseByFaculty.filter(course => {
        return course.courseCode.match(this.searchCourseItem);
      });
    }
  },
}
</script>
