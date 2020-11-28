<template>
  <div>
  <snackBar v-if="snackbarx" />
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
    v-model="noticeTitle"
    name="noticeTitle"
    label="Notice Title"
    validation="required"
  />
 </v-col>
  <v-col
          cols="12"
          md="6"
        >
  <FormulateInput
  type="textarea"
    v-model="noticeDetails"
    name="noticeDetails"
    label="Notice Details"
    validation="required"
  />
  </v-col>
 
   <v-col
          cols="12"
          md="6"
        >
  <FormulateInput
    type="submit"
    :label="btnAction_Prop"

  />
  </v-col>
  </v-row>
</FormulateForm>
</v-card>
  </div>
</template>

<script>
import SnackBar from '../snakbar/snackbar'
export default {
props : ["btnAction_Prop","courseCode_Prop","facultyId_Prop","NoticeTitle_Prop"],
    data(){
        return {
            formValues :[],
            snackbarx : false,
             snackbarWrong : false,
             courseCodeX :"",
            noticeTitle:"",
             noticeDetails:"",
             facultyIdx:"",
             noticeInfo:[],
             noticeID :"",
             x:""
        }
    },
    components: {
    SnackBar
  },
async created(){
  this.x = this.btnAction_Prop
  // console.log("hayre"+ this.btnAction_Prop)
        console.log("btn"+ this.btnAction_Prop+" Code "+this.courseCode_Prop+" Faculty "+this.facultyId_Prop + this.NoticeTitle_Prop)
        if(this.btnAction_Prop=="Update"){
            await  this.$axios.$get(`/coursenotice/${this.courseCode_Prop}/${this.NoticeTitle_Prop}`)
            .then((res)=>{
              //  console.log("Notice Result"+res[0].noticeTitle)
              this.noticeTitle = res[0].noticeTitle
              this.noticeDetails = res[0].noticeDetails
              this.noticeID = res[0]._id
            }).catch((err)=>{
                console.log("AddError "+err)
            })
    }
    },
    computed:{
      getNoticeInfo(){
        return this.noticeInfo = {
          noticeTitle : this.formValues.noticeTitle,
          noticeDetails :this.formValues.noticeDetails,
          courseCode : this.courseCode_Prop,
          facultyId : this.facultyId_Prop
        }
      } 
    },
    methods:{
       async save(){
        if(this.btnAction_Prop=="Update"){
          this.update();
          return 
        }
      console.log("Notice Info"+this.x+this.courseCode_Prop+this.facultyId_Prop)
         await  this.$axios.$post('/coursenotice',this.getNoticeInfo)
            .then((res)=>{
                console.log("Result "+res)
                this.$store.dispatch('snackbar/callSnackbarInfo',{message:"Successfully added new Faculty",color:"green",time:"4000"})
                this.snackbarx =true;
                this.$nuxt.$emit("updateNotice");
            }).catch((err)=>{
                console.log("AddError "+err)
            })


      },
      async update(){
        
        console.log(this.noticeID)
        await  this.$axios.$patch(`/coursenotice/${this.noticeID}`,this.getNoticeInfo)
            .then((res)=>{
                console.log("update Result "+res)
                this.$store.dispatch('snackbar/callSnackbarInfo',{message:"Successfully updated Notice",color:"green",time:"4000"})
                this.snackbarx =true;
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