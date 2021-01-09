<template>
  <v-container class="pa-16">
    <v-card class="pa-16" style="margin:10%;">
      <v-form  ref="form"
    v-model="valid" style="margin:15%;padding:10%">
      <v-text-field
      label="User"
      :rules="rules"
      hide-details="auto"
      required
      v-model="userId"
    ></v-text-field>
    <v-text-field label="Password" :rules="rules" required v-model="password" type="password"
      hide-details="auto"></v-text-field>
      
        <v-btn block style="padding-top:10px;" :disabled="!valid" @click="loginUser()">
        Login
      </v-btn>
      </v-form>
    </v-card>
     <snackBar v-if="snackbar" />
  </v-container>
</template>

<script>
import snackBar from '../components/snakbar/snackbar'
export default {
  layout: "login",
  head() {
    return {
      title: `Course-MS | Login`
    };
  },
  data() {
    return {
       rules: [
        value => !!value || 'Required.',
      ],
      valid: true,
      userId: "",
      password: "",
      snackbar: false
    };
  },
  components: {
    snackBar
  },
  methods: {
    async loginUser() {
      var userRole;
      this.userId.length > 3
        ? (userRole = "student")
        : (userRole = "faculty");
      var userId = this.userId;
      // console.log("Ok ---- "+userRole + userId)
      //check auth
     await this.$axios.$get(`/${userRole}/${userId}`)
    .then((res)=>{
     if(res[0].password === this.password){
      this.$store.dispatch("login/updateLoggedIn", { userRole, userId });
      console.log('Auth Ok')
     }
     else{
      this.$store.dispatch('snackbar/callSnackbarInfo',{message:"Sorry ! Try again..",color:'#FF0000',time:"2000"})
      this.snackbar = true
      return 
     }
    }).catch((err)=>{
      console.log(err)
    })
    this.$router.push(`/${userRole}/${userId}`);
      // this.$store.dispatch("login/updateLoggedIn", { userRole, userId });
      // //  this.$router.redirect(`/${userRole}/${userId}`)
      // //  redirect(`/${userRole}/${userId}`)
      // // this.$router.replace(`/${userRole}/${userId}`)
      // this.$router.push(`/${userRole}/${userId}`);
    }
  }
};
</script>
