<template>
  <v-container>
   <v-row justify="center"  >
    <v-card style="width:100% ; text-align:center" dark>
      <div  class="pa-1">
        <v-btn @click="component='StudentOwn'"> <v-icon
        color="purple darken-2"
          left
        >
          mdi-home
        </v-icon>Home</v-btn>
        <v-btn @click="component='StudentProfile'"> <v-icon
        color="indigo darken-2"
          left
        >
         mdi-account
        </v-icon>Profile</v-btn>
        <v-btn @click="component='StudentPayment'"> <v-icon
        color="red darken-2"
          left
        >
        mdi-cloud-lock
        </v-icon>Payment</v-btn>
   </div>
    </v-card>
  </v-row>
  <component :is="component" class="pa-16"></component>
  </v-container>
</template>

<script>
import StudentProfile from '../../../components/student/studentProfile'
import StudentOwn from '../../../components/student/studentOwn'
import StudentPayment from '../../../components/student/studentPayment'
export default {
  middleware: 'authUser',
    data(){
        return {
            component:"StudentOwn"
        }
    },
       head() {
      return {
        title: `Course-MS | Student | ${this.$route.params.studentID}`
      }
  },
 components:{
     StudentProfile,
     StudentOwn,
     StudentPayment
 }
};
</script>
