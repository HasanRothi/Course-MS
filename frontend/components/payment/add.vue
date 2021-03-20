<template>
  <div style="width:100%">
    <!-- <v-row>
    <v-col cols="12" md="5">
    <v-text-field
      label="Student ID"
      :rules="rules"
    ></v-text-field>
    </v-col>
     <v-col cols="12" md="5">
    <v-text-field
      label="Payment Amount"
      :rules="rules"
    ></v-text-field>
    </v-col>
     <v-col cols="12" md="2">
        <v-btn block>Add</v-btn>
    </v-col>
    </v-row> -->
      <v-text-field
      label="Student ID"
      :rules="rules"
      type="number"
      required
      v-model="studentId"
    ></v-text-field>
      <v-text-field
      label="Payment Amount"
      :rules="rules"
      type="number"
      required
      v-model="amount"
    ></v-text-field>
       <v-btn block @click="addPayment">Add</v-btn>
        <v-snackbar
      v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="color"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
     data () {
    return {
      amount: 0,
      studentId : null,
      text: null,
      color: null,
      snackbar: false
    }
  },
 methods: {
    async addPayment () {
    await this.$axios.$patch(`/student/payment/${this.studentId}` , {payment: this.amount})
      .then((res)=>{
          this.color = "green"
    this.text = res.message
        this.snackbar = true
    this.amount = 0
    this.studentId = null
     }).catch((err)=>{
          this.color = "red"
    this.text = 'Error Occured'
        this.snackbar = true
    console.log(err)
    })
  // const content = await rawResponse.json();
    }
  }
}
</script>

<style>

</style>