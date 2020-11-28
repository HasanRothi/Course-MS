<template>
  <div>
     <SnackBar v-if="snackbar"/>

      <v-form  ref="form" >
        <v-card style="backgroundColor:#f1f2f6" class="pa-4 rounded-b-xl">
             <v-row>
           <v-col
          cols="12"
          md="6"
        >
          <v-text-field
         
            v-model="code"
            label="Course Code"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
         
            v-model="name"
            label="Course Title"
            required
          ></v-text-field>
        </v-col>
         <v-col
          cols="12"
          md="6"
        >
          <v-select
        
            v-model="credit"
            label="credit"
            :items="creditItems"
          ></v-select>
        </v-col>
          <v-col
          cols="12"
          md="6"
        >
          <v-text-field
         
            v-model="dept"
            label="Dept"
            name = "name"
            required
          ></v-text-field>
        </v-col>
         <v-col
          cols="12"
          md="6"
        >
           <v-select
          
          :items="FacultyItems"
          label="Faculty"
          v-model="faculty"
        ></v-select>
        </v-col>
         <v-col
          cols="12"
          md="12"
        >
         <v-btn v-if="btnAction=='save'" block class="green white--text" @click="addNewCourse">Save</v-btn>
         <v-btn v-if="btnAction=='update'" block class="orange white--text" @click="updateCourse()">Update</v-btn>
        </v-col>
             </v-row>
        </v-card>
         </v-form>
  </div>
</template>

<script>
import SnackBar from '../snakbar/snackbar'
export default {
  props : ["btnAction","courseCode"],
data(){
    return {
        snackbar:false,
        code:"",
        name:"",
        credit:"2.09",
        faculty:"",
        dept :"",
        snackbar : false,
      snackbarWrong : false,
      //  inputRules : [v => v.length > 0 || "Feild Required"],
       FacultyItems : [],
       creditItems : ["0.5","1.0","1.5","2.0","3.0","4.0"],
       FacultyItemsCount:""
    }
},
components: {
    SnackBar
  },
  async created(){
    console.log("Btn Action - "+this.btnAction , "Course Code"+this.courseCode)
     await this.$axios.$get('https://ucam-it.herokuapp.com/faculty')
    .then((res)=>{
        res.Facultys.forEach((e)=>{
            this.FacultyItems.push(e.userId)
        })
    })
    // getSingleCouse
    if(this.btnAction=="update"){
      console.log("update log")
    var data = await this.$store.getters['course/getSingleCourse'](this.courseCode)
    // console.log("Data crdit- "+data[0].CourseCredit);
        this.code = data[0].CourseCode,
        this.name = data[0].CourseName,
        this.credit = data[0].CourseCredit,
        this.dept = data[0].Dept
        this.faculty = data[0].Faculty
    }

    
  },
 
  methods:{
     async addNewCourse(){
           if(this.$refs.form.validate()){
               var courseInfo = {
                   courseCode : this.code ,
                   courseName : this.name ,
                   courseCredit : this.credit,
                   dept : this.dept,
                   facultyId : this.faculty
               }
               console.log(courseInfo)
           await  this.$axios.$post('/course',courseInfo)
            .then((res)=>{
                console.log("Result "+res)
                this.$store.dispatch('snackbar/callSnackbarInfo',{message:"Successfully added new Course",color:"green",time:"4000"})
                this.snackbar =true;
                this.$nuxt.$emit("addNewCourse");
            }).catch((err)=>{
                console.log("AddError "+err)
            })
           }
           else {
               console.log("ErrorField")
               await this.$store.dispatch('snackbar/callSnackbarInfo',{message:"Required Feild | Try agian",color:"red",time:"4000"})
               this.snackbar =true;
      
           }
          
      },
      async updateCourse(){
        console.log(this.name + this.code + this.credit + this.faculty)
          var courseInfo = {
                   courseCode : this.code ,
                   courseName : this.name ,
                   courseCredit : this.credit,
                   dept : this.dept,
                   facultyId : this.faculty
              
               }
         await  this.$axios.$patch(`/course/${this.courseCode}`,courseInfo)
            .then((res)=>{
                console.log("update Result "+res)
                this.$store.dispatch('snackbar/callSnackbarInfo',{message:"Successfully updated Course",color:"green",time:"4000"})
                this.snackbar =true;
                this.$nuxt.$emit("addNewCourse");
            }).catch((err)=>{
                console.log("update Error "+err)
            })
      }
  }
}
</script>

<style>

</style>