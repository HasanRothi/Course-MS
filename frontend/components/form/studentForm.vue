<template>
  <div>
     <snackBar v-if="snackbar" />
      <v-card style="backgroundColor:#f1f2f6" class="pa-4 rounded-b-xl">
    <FormulateForm
  v-model="formValues" @submit="save"
>
<v-row>
     <v-col
          cols="12"
          md="6"
        >
  <FormulateInput
    v-model="userId"
    name="userId"
    label="User Id"
    validation="required"
  />
 </v-col>
  <v-col
          cols="12"
          md="6"
        >
  <FormulateInput
    v-model="name"
    name="name"
    label="Name"
    validation="required"
  />
  </v-col>
  <v-col
          cols="12"
          md="6"
        >
  <FormulateInput
    v-model="password"
    name="password"
    label="Password"
     :validation="[
    ['required'],
    ['max', 12],
    ['min', 8]
  ]"
  />
  </v-col>
  <v-col
          cols="12"
          md="6"
        >
  <FormulateInput
    v-model="phone"
    name="phone"
    label="Phone"
    validation="required"
  />
  </v-col>
  <v-col
          cols="12"
          md="6"
        >
  <FormulateInput
    v-model="mail"
    name="mail"
    label="Mail"
    validation="email"
  />
  </v-col>
   <v-col
          cols="12"
          md="6"
        >
  <FormulateInput
    type="submit"
    :label="btnAction"

  />
  </v-col>
  </v-row>
</FormulateForm>
</v-card>
  </div>
</template>

<script>
import '../../node_modules/@braid/vue-formulate/themes/snow/snow.scss';
import SnackBar from '../snakbar/snackbar'
export default {
   props : ["btnAction","studentId"],
    data(){
        return {
            formValues :[],
            snackbar : false,
             snackbarWrong : false,
             userId :"",
             name:"",
             password:"",
             mail:"",
             phone:"",
             facultyInfo:[]
        }
    },
    components: {
    SnackBar
  },
    async created(){
        console.log(this.btnAction+this.studentId)
        if(this.btnAction=="update"){
    await this.$axios.$get(`student/${this.studentId}`)
    .then((res)=>{
      console.log(res[0])
      this.userId = res[0].userId,
        this.name = res[0].name,
        this.password = res[0].password,
        this.phone = res[0].phone,
        this.mail = res[0].mail
    }).catch((err)=>{
      console.log(err)
    })       
    }
    },
    computed:{
      getStudentInfo(){
        return this.facultyInfo = {
          userId : this.formValues.userId,
          name :this.formValues.name ,
          password : this.formValues.password,
          phone : this.formValues.phone,
          mail : this.formValues.mail
        }
      }
     
    },
    methods:{
       async save(){
        if(this.btnAction=="update"){
          this.update();
          return 
        }
        // console.log(" Faculty info"+this.getStudentInfo)
         await  this.$axios.$post('/student',this.getStudentInfo)
            .then((res)=>{
                console.log("Result "+res)
                this.$store.dispatch('snackbar/callSnackbarInfo',{message:"Successfully added new Student",color:"green",time:"4000"})
                this.snackbar =true;
                this.$nuxt.$emit("recallStudent");
            }).catch((err)=>{
                console.log("AddError "+err)
            })


      },
      async update(){
        // console.log(this.facultyId ,"values "+this.getStudentInfo)
        await  this.$axios.$patch(`/student/${this.studentId}`,this.getStudentInfo)
            .then((res)=>{
                console.log("update Result "+res)
                this.$store.dispatch('snackbar/callSnackbarInfo',{message:"Successfully updated student",color:"green",time:"4000"})
                this.snackbar =true;
                this.$nuxt.$emit("recallStudent");
            }).catch((err)=>{
                console.log("update Error "+err)
            })
      }
      
    }
}

</script>

<style>

</style>