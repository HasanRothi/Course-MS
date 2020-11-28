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
  </v-container>
</template>

<script>
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
      password: ""
    };
  },
  methods: {
    loginUser({ store, redirect }) {
      localStorage.setItem("auth", true);
      var userRole;
      this.formValues.userId.length > 3
        ? (userRole = "student")
        : (userRole = "faculty");
      var userId = this.formValues.userId;
      this.$store.dispatch("login/updateLoggedIn", { userRole, userId });
      //  this.$router.redirect(`/${userRole}/${userId}`)
      //  redirect(`/${userRole}/${userId}`)
      // this.$router.replace(`/${userRole}/${userId}`)
      this.$router.push(`/${userRole}/${userId}`);
    }
  }
};
</script>
