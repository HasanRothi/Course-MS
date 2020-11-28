.<template>
  <v-container>
      <v-card v-bind:class="[BOOK_INFO.available > 10? 'blue' :  BOOK_INFO.available > 5? 'orange' : 'red']" >
          <v-row>
               <v-col
          cols="12"
          md="4"
        >
        <v-icon>mdi-book</v-icon>
        {{BOOK_INFO.name}}
               </v-col>
                     <v-col
          cols="12"
          md="2"
        >
        <v-icon>mdi-book-open</v-icon>
         {{BOOK_INFO.author}}
               </v-col>
                        <v-col
          cols="12"
          md="2"
        >   <v-icon>mdi-database-check</v-icon> {{BOOK_INFO.available}}
               </v-col>
                      <v-col
          cols="12"
          md="4"
        >
          <v-card class="ma-2" style="text-align:center">
<FormulateForm
  v-model="formValues" @submit="borrowStudent"
>
<v-row>
     <v-col
          cols="12"
          md="6"
        >
  <FormulateInput
    v-model="studentID"
    name="studentID"
    label="Student ID"
    validation="required"
  />
 </v-col>
   <v-col
          cols="12"
          md="6"
        >
  <FormulateInput
    type="submit"
    label="Borrow"

  />
  </v-col>
  </v-row>
</FormulateForm>
</v-card>
               </v-col>
          </v-row>

      </v-card>

          <v-row >

            <v-col  cols="12"
          md="3" v-for="student in BOOK_INFO.students" :key="student.id">
                 <!-- <v-card style="text-align:center">
 {{student}} <v-btn icon @click="borrowReturnStudent(student)"><v-icon>mdi-delete</v-icon></v-btn>
  </v-card> -->
   <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-actions>

      <v-btn
        icon
        @click="(show = !show) , (v=student)"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
      <v-btn
        color="orange lighten-2"
        text
      >
       <span>{{student}}</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="borrowReturnStudent(student)"><v-icon>mdi-delete</v-icon></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text  v-if="student==v">

 <div class="pa-2">
   <v-icon >mdi-mail</v-icon>
   {{studentInfo.mail}}
   </div>
<div class="pa-2">
   <v-icon>mdi-phone</v-icon>
   {{studentInfo.phone}}
   </div>

          </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
            </v-col>
          </v-row>

  </v-container>
</template>

<script>
export default {
     head() {
      return {
        title: `Course-MS| Book | ${this. BOOK_INFO.name}`
      }
  },
  data() {
      return {
        formValues : {},
          BOOK_INFO :[],
          studentID:"",
          show: false,
          v:"",
          studentInfo : ""
      }
  },
   created(){
      this.getBOOK_INFO()
  },
  watch: {
    async show(){
      console.log(this.v)
      await this.$axios.$get(`/student/${this.v}`)
          .then((res)=>{
           this.studentInfo = res[0]
          }).catch((err)=>{
            console.log(err)
          })
    }
  },
  methods: {
     async  getBOOK_INFO(){
            await this.$axios.$get(`/library/${this.$route.params.bookID}`)
          .then((res)=>{
           this. BOOK_INFO = res[0]
          }).catch((err)=>{
            console.log(err)
          })
      },
      async borrowStudent(){
          console.log(this.studentID)
          var  studentId  = {
              studentId : this.studentID
          }
          await this.$axios.$patch(`/library/borrow/${this.$route.params.bookID}` , studentId)
          .then((res)=>{
           console.log(res)
           this.getBOOK_INFO()
          }).catch((err)=>{
            console.log(err)
          })
      },
       async borrowReturnStudent(id){
          var  studentId  = {
              studentId : id
          }
          await this.$axios.$patch(`/library/borrowreturn/${this.$route.params.bookID}` , studentId)
          .then((res)=>{
           this.getBOOK_INFO()
          }).catch((err)=>{
            console.log(err)
          })
      }
  },

}
</script>

<style>

</style>