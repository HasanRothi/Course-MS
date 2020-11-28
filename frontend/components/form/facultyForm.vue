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
    v-model="dept"
    name="dept"
    label="Dept"
    validation="required"
    append-icon="mdi-magnify"
  >
  </FormulateInput>
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
   props : ["btnAction","facultyId"],
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
             dept : "",
             facultyInfo:[]
        }
    },
    components: {
    SnackBar
  },
    async created(){
        console.log(this.btnAction+this.facultyId)
        if(this.btnAction=="update"){
    var data = await this.$store.getters['faculty/getSingleCourse'](this.facultyId)
    console.log(data[0])
        this.userId = data[0].userId,
        this.name = data[0].name,
        this.dept = data[0].dept,
        this.password = data[0].password,
        this.phone = data[0].phone,
        this.mail = data[0].mail
    }
    },
    computed:{
      getFacultyInfo(){
        return this.facultyInfo = {
          userId : this.formValues.userId,
          name :this.formValues.name ,
          dept :this.formValues.dept,
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
        // console.log(" Faculty info"+this.getFacultyInfo)
         await  this.$axios.$post('/faculty',this.getFacultyInfo)
            .then((res)=>{
                console.log("Result "+res)
                this.$store.dispatch('snackbar/callSnackbarInfo',{message:"Successfully added new Faculty",color:"green",time:"4000"})
                this.snackbar =true;
                this.$nuxt.$emit("recallFaculty");
            }).catch((err)=>{
                console.log("AddError "+err)
            })


      },
      async update(){
        // console.log(this.facultyId ,"values "+this.getFacultyInfo)
        await  this.$axios.$patch(`/faculty/${this.facultyId}`,this.getFacultyInfo)
            .then((res)=>{
                console.log("update Result "+res)
                this.$store.dispatch('snackbar/callSnackbarInfo',{message:"Successfully updated faculty",color:"green",time:"4000"})
                this.snackbar =true;
                this.$nuxt.$emit("recallFaculty");
            }).catch((err)=>{
                console.log("update Error "+err)
            })
      }
      
    }
}

</script>

<style>

</style>