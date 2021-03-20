<template>
  <div>
      <v-card class="pa-4" style="font-family:cursive;">
      <h4 class="text-center">{{totalCredit}}</h4>
    <h5 class="text-center">Per Credit - {{perCredit}} tk</h5>
      </v-card>
    <v-row>
      <v-col cols="12" md="3">
        <v-card>
            <v-card-title>Fee</v-card-title>
             <v-card-subtitle class="pb-0">{{this.fee}} tk</v-card-subtitle>
        </v-card>
       </v-col>
       <v-col cols="12" md="3">
        <v-card>
            <v-card-title>Paid</v-card-title>
             <v-card-subtitle class="pb-0">{{this.paid}} tk</v-card-subtitle>
        </v-card>
       </v-col>
       <v-col cols="12" md="3">
        <v-card>
            <v-card-title>Due</v-card-title>
             <v-card-subtitle class="pb-0">{{this.due}} tk</v-card-subtitle>
        </v-card>
       </v-col>
       <v-col cols="12" md="3">
        <v-card>
            <v-card-title>Balance</v-card-title>
             <v-card-subtitle class="pb-0">{{this.balance}} tk</v-card-subtitle>
        </v-card>
       </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
        totalCredit : 0,
        perCredit: 2300,
        fee: 0,
        paid: 0,
        due: 0,
        balance: 0,
        loading: true,
        studentId : this.$route.params.studentID
    }
  },
  async created(){ 
  //  console.log(this.studentId)
    await this.$axios.$get(`student/${this.studentId}`)
    .then((res)=>{
      this.courseByStudent = res[0].courseList
      this.paid = res[0].paid
      // this.number_of_course = res.length
    }).catch((err)=>{
      console.log(err)
    })
    this.courseByStudent.forEach(element => {
        this.totalCourse++
      this.totalCredit+=element.courseInfo.courseCredit
    });
    
    this.fee = this.totalCredit * this.perCredit
    if(this.fee == this.paid) {
        this.due = 0
        this.balance = 0
    }else if(this.fee > this.paid) {
        this.balance = 0
        this.due = this.fee - this.paid
    } else {
        this.due = 0
        this.balance = this.paid - this.fee
    }
    // console.log(this.courseByStudent)
    this.loading = false
    
  },
}
</script>

<style>

</style>