<template>
  <v-container>
     <v-expand-transition>
      <div v-if="formOpen == true">
        <StudentForm :btnAction="btnAction" :studentId="studentId" />
      </div>
    </v-expand-transition>
    <v-row class="text-center">
      <v-text-field
        v-model="searchStudentItem"
        append-icon="mdi-magnify"
        :label="`Search student( ${number_of_student})`"
        single-line
        hide-details
      ></v-text-field>
      <!-- student list -->
       <v-row style="width:100% ; font-family:Times New Roman;" >
        <v-col  cols="12"  v-for="student in studentDataFilter" :key="student.id"
          md="6">
          <v-card style="text-align:center" >
          <v-row>
            <v-col cols="12"  md="4">
            <v-icon>mdi-account</v-icon>
             <h4>{{student.id}}</h4>
             </v-col>
             <v-col cols="12" md="4">
             <v-icon>mdi-account-details</v-icon>
             <h4>{{student.Name}}</h4>
             </v-col>
              <v-col cols="12" md="4">
             <v-icon>mdi-account-lock</v-icon>
             <h4>{{student.password}}</h4>
             </v-col>
          </v-row>
          <v-row>
            <v-col cols="12"  md="4">
            <v-icon>mdi-phone</v-icon>
             <h4>{{student.Phone}}</h4>
             </v-col>
             <v-col cols="12" md="4">
             <v-icon>mdi-email-outline </v-icon>
             <h4>{{student.Mail}}</h4>
             </v-col>
              <v-col cols="12" md="4">
             <v-btn @click="(studentId=student.id) ,(btnAction = 'update'), (formOpen = true) , (fabIcon = !fabIcon)"><v-icon  class="orange--text">mdi-pencil</v-icon></v-btn>
             <v-btn @click="deleteStudentData(student.id)"><v-icon  class="red--text">mdi-delete</v-icon></v-btn>
             </v-col>
          </v-row>
             <!-- course list -->
           <v-card class="blue black--text">
             Course ({{student.TotalCourse}} )
           </v-card>
           <v-row>
             <v-col cols="12"  md="10">
               <v-autocomplete
      v-model="selectCourse"
      :loading="loading"
      :items="offeredCourseList"
      :search-input.sync="search"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      hide-details
      :label="`Take a Course (${offeredCourseList.length})`"
      solo-inverted
    ></v-autocomplete>
             </v-col>
      <v-col cols="12"  md="2" >
        <v-btn block @click="registerCourse(student.id)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>

           </v-row>
             <v-card class="rounded-t-xl">
          <v-simple-table
            class="pt-8"
            v-if="student.CourseList != 0"
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
                  <th class="text-left" style="color:black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(course, i) in student.CourseList"
                  :key="course.id"
                  class="pa-15"
                >
                  <td>{{ i + 1 }}</td>
                  <td>{{ course.courseInfo.courseCode }}</td>
                  <td>{{ course.courseInfo.courseName }}</td>
                  <td>{{ course.courseInfo.courseCredit }}</td>
                  <td>{{ course.courseInfo.facultyId }}</td>
                  <td>
                    <div style="display:flex">
                      <v-btn>
                        <v-icon
                          class="red--text"
                          @click="unRegisterCourse(student.id , course._id)"
                        >
                          mdi-delete</v-icon
                        >
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
             </v-card>
           </v-card>
       </v-col>
  </v-row>
    </v-row>
     <v-btn
        color="green"
        fixed
        dark
        bottom
        right
        fab
        @click="
          (btnAction = 'save'), (formOpen = !formOpen), (fabIcon = !fabIcon)
        "
      >
        <v-icon v-if="fabIcon">mdi-plus</v-icon>
        <v-icon v-if="!fabIcon || btnAction == 'update'">mdi-close</v-icon>
      </v-btn>
  </v-container>
</template>

<script>
import StudentForm from '../form/studentForm'
export default {
   head() {
      return {
        title: "Course-MS | Faculty | StudentList"
      }
  },
  components: {
    StudentForm
  },
  data(){
    return {
      ALL_STUDENTS : [],
      number_of_student:"",
      searchStudentItem :"",
      offeredCourseList : [],
      courseListWith_id:[],
     selectCourse:"",
     loading : false,
     btnAction:"save",
     formOpen:false,
     fabIcon:true,
     studentId:""
    }
  },
  computed :{
  },
  async created() {
     this.getStudentData();
    this.$nuxt.$on("recallStudent", () => {
      this.getStudentData();
    });
  },
  computed:{
      studentDataFilter: function() {
      return this.ALL_STUDENTS.filter(student => {
        return student.id.match(this.searchStudentItem);
      });
    }
  },
  methods:{
   async getStudentData(){
       await this.$axios
        .$get('/student')
        .then(res => {
          this.ALL_STUDENTS = res.Students
          this.number_of_student = res["Number of student"]
        })
        .catch(err => {
          console.log("Delete errr " + err);
        });
         await this.$store.dispatch("course/fetchCourseList");
         var data = await this.$store.getters["course/getCourseList"];
        data.Courses.forEach((c)=>{
          this.offeredCourseList.push(c.CourseCode)
          var code = c.CourseCode
          this.courseListWith_id.push({code : code , id : c.id})
        })
    },
     async deleteStudentData(id) {
      await this.$axios
        .$delete(`/student/${id}`)
        .then(res => {
          console.log("Delete" + res);
          this.loading = false;
          this.$store.dispatch("snackbar/callSnackbarInfo", {
            message: "Successfully Deleted Student",
            color: "blue",
            time: "4000"
          });
          this.snackbar = true;
          this.getStudentData();
        })
        .catch(err => {
          console.log("Delete errr " + err);
        });
    },
    async registerCourse(id){
      var ok =  this.courseListWith_id.filter((c)=>{
    return c.code===this.selectCourse
  })
      var x  = {
        studentId : id,
        courseList : [ok[0].id]
      }
      await this.$axios
        .$post('/student/addcourse',x)
        .then(res => {
          console.log("Add course result "+res)
        })
        .catch(err => {
          console.log("Add course error "+err)
          });
          this.getStudentData();
    },
    async unRegisterCourse(studentId , courseId){
      console.log(studentId , courseId)
       var x  = {
        studentId : studentId ,
        courseList : [courseId]
      }
      await this.$axios
        .$delete(`/student/removecourse/${studentId}`,x)
        .then(res => {
          console.log("Delete course result "+res)
        })
        .catch(err => {
          console.log("Delete course error "+err)
          });
          this.getStudentData();

    }
  }
}
</script>
