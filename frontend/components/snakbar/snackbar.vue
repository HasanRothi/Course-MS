<template>
 <div>
      <v-snackbar v-model="snackbarOpen" :timeout="time" top :color="color">
    <span>{{message}}</span>
</v-snackbar>
 </div>
</template>

<script>
export default {
data(){
    return {
        snackbarOpen:false,
        time:"-1",
        color:"",
        message:""
    }
},
async created (){
    var snakbar_info = await this.$store.getters['snackbar/getsnackbarInfo']
    this.message = snakbar_info.message;
    this.time = snakbar_info.time,
    this.color =snakbar_info.color,
    this.snackbarOpen = true
    console.log(this.color)
},

}
</script>

<style>

</style>