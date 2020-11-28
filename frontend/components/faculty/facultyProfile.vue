<template>
  <v-container>
      <v-card style="width:100% ; font-family:cursive;" class="blue">
     <v-row style="text-align:center">
        <v-col  cols="12"
          md="2">
          <span>
            <v-icon>mdi-book-open-variant</v-icon>
             <h4>Course - {{totalCourse}}</h4>
          </span>
       </v-col>
       <v-col  cols="12"
          md="1">
          <span>
            <v-icon> mdi-account</v-icon>
             <h4>{{facultyOwnInfo.userId}}</h4>
          </span>
       </v-col>
        <v-col  cols="12"
          md="1">
          <span>
            <v-icon>mdi-layers</v-icon>
             <h4>{{facultyOwnInfo.dept}}</h4>
          </span>
       </v-col>
        <v-col  cols="12"
          md="2">
          <span>
            <v-icon>mdi-human</v-icon>
             <h4>{{facultyOwnInfo.name}}</h4>
          </span>
       </v-col>
       <v-col  cols="12"
          md="2">
          <span>
            <v-icon>mdi-security</v-icon>
             <h4>{{facultyOwnInfo.password}}</h4>
          </span>
       </v-col>
       <v-col  cols="12"
          md="2">
          <span>
            <v-icon>mdi-email-outline </v-icon>
             <h4>{{facultyOwnInfo.mail}}</h4>
          </span>
       </v-col>
        <v-col  cols="12"
          md="2">
          <span>
            <v-icon>mdi-phone</v-icon>
             <h4>{{facultyOwnInfo.phone}}</h4>
          </span>
       </v-col>
    
   </v-row>
  </v-card>
  <!-- update own profile -->
  <v-card>
      <div class="pa-4 pl-16">
          <FormulateForm
  v-model="formValues"
  @submit="updateOwnInfo"
>
  <FormulateInput
  
    name="password"
    label="Password"
    validation="required"
    v-model="password"
  />
  <FormulateInput
  v-model="mail"
    name="mail"
    label="Mail"
    validation="email"
  />
  <FormulateInput
  v-model="phone"
    name="phone"
    label="Phone"
    validation="required"
  />
  <FormulateInput
    type="submit"
    label="Update"
  />
</FormulateForm>
      </div>
  </v-card>
  </v-container>
</template>

<script>
export default {
    data(){
        return {
            formValues:[],
            facultyOwnInfo: [],
            totalCourse:"12",
            mail:"",
            phone:"",
            password:"",
            facultyId: this.$route.params.facultyID
        }
    },
async created(){
    await this.getFacultyOwnInfo()
},
methods:{
    async updateOwnInfo(){
        var updateInfo = {
            password : this.formValues.password,
            mail : this.formValues.mail,
            phone : this.formValues.phone
        }
             await  this.$axios.$patch(`/faculty/${this.facultyId}`,updateInfo)
            .then((res)=>{
                    this.getFacultyOwnInfo()
            }).catch((err)=>{
                console.log("update Error "+err)
            })
    },
        async getFacultyOwnInfo(){
         await this.$axios.$get(`/faculty/${this.facultyId}`)
    .then((res)=>{
      this.facultyOwnInfo = res[0]
      this.mail = this.facultyOwnInfo.mail
      this.phone = this.facultyOwnInfo.phone
      this.password = this.facultyOwnInfo.password
    }).catch((err)=>{
      console.log(err)
    })
    }
},

}
</script>

<style>

</style>
