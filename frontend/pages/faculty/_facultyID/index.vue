<template>
<v-container ma-0 pa-0 fill-height >
  <v-row justify="center"  >
    <v-card style="width:100% ; text-align:center" dark>
      <v-tabs
      centered
      show-arrows
    >
        <v-tab>
        <v-btn @click="component='FacultyOwn'"> <v-icon
        color="purple darken-2"
          left
        >
          mdi-home
        </v-icon>Home</v-btn>
        </v-tab>
        <v-tab>
        <v-btn @click="component='FacultyProfile'"> <v-icon
        color="indigo darken-2"
          left
        >
         mdi-account
        </v-icon>Profile</v-btn>
        </v-tab>
        <v-tab>
         <v-btn @click="component='CourseList'"> <v-icon
        color="green darken-2"
          left
        >
          mdi-book
        </v-icon>Course</v-btn>
        </v-tab>
        <v-tab>
     <v-btn @click="component='StudentList'"> <v-icon
         color="orange darken-2"
          left
        >
         mdi-group
        </v-icon>Student</v-btn>
        </v-tab>
        <v-tab>
     <v-btn @click="component='FacultyList'"> <v-icon
          color="blue darken-2"
          left
        >
          mdi-teach
        </v-icon>Faculty</v-btn>
        </v-tab>
        <v-tab>
        <v-btn @click="component='NoticeView'"> <v-icon
          color="red darken-2"
          left
        >
         mdi-bell-alert
        </v-icon>Notice</v-btn>
        </v-tab>
      <v-tab>
        <v-btn @click="component='ArchiveForm'"> <v-icon
          color="green darken-2"
          left
        >
         mdi-archive-outline
        </v-icon>Archive</v-btn>
        </v-tab>
        <v-tab>
        <v-btn @click="component='PaymentForm'"> <v-icon
          color="red darken-2"
          left
        >
         mdi-cloud-lock
        </v-icon>Payment</v-btn>
        </v-tab>
      </v-tabs>
    </v-card>

  </v-row>
  <component :is="component" class="pa-16"></component>
  </v-container>
</template>

<script>
import StudentList from '../../../components/student/studentList'
import FacultyList from '../../../components/faculty/facultyList'
import CourseList from '../../../components/course/courseList'
import FacultyOwn from '../../../components/faculty/facultyOwn'
import FacultyProfile from '../../../components/faculty/facultyProfile'
import NoticeView from '../../../components/notice/noticeView'
import ArchiveForm from '../../../components/archive/add'
import PaymentForm from '../../../components/payment/add'
export default {
  components: {
    StudentList,
    FacultyList,
    CourseList,
    FacultyOwn,
    FacultyProfile,
    NoticeView,
    ArchiveForm,
    PaymentForm
  },
  middleware: 'authUser',
   data () {
    return {
      author : "",
      component : FacultyOwn
    }
  },
    head() {
      return {
        title: `Course-MS | Faculty | ${this.$route.params.facultyID}`
      }
  },
   created (){
    if(process.browser){
            localStorage.setItem("role","Admin");
            this.author = localStorage.getItem("role");
            console.log(this.author)
        }
  }
}
</script>
