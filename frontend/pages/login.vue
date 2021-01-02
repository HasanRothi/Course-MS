<template>
  <v-container class="pa-16">
    <v-card class="pa-16" style="margin:10%;">
      <FormulateForm
        style="margin:15%;padding:10%"
        v-model="formValues"
        @submit="loginUser"
      >
        <FormulateInput
          name="userId"
          label="User Id"
          validation="required"
          icon="mdi-lock"
        />
        <FormulateInput
          type="password"
          name="password"
          label="Password"
          validation="required"
        />
        <FormulateInput type="submit" label="Login" />
      </FormulateForm>
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
      formValues: {},
      userId: "",
      password: "",
      snackbar: false
    };
  },
  components: {
    snackBar
  },
  methods: {
    async loginUser({ store, redirect }) {
      var userRole;
      this.formValues.userId.length > 3
        ? (userRole = "student")
        : (userRole = "faculty");
      var userId = this.formValues.userId;
      console.log("Ok ---- "+userRole + userId)
      //check auth
     await this.$axios.$get(`/${userRole}/${userId}`)
    .then((res)=>{
     if(res[0].password === this.formValues.password){
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
