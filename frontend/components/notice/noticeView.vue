<template>
  <div>
    <NoticeForm v-if="formOpen" :btnAction_Prop="btnAction" :courseCode_Prop="courseCode" :facultyId_Prop="facultyId" :NoticeTitle_Prop="NoticeTitle"/>
    <v-text-field
        v-model="searchNoticeItem"
        append-icon="mdi-magnify"
        :label="`Search Notice( ${number_of_notice})`"
        single-line
        hide-details
      ></v-text-field>
       <div v-if="noticeDataFilter == 0" style="text-align:center" class="pa-16">
      <b>No Notice Found</b>
    </div>
         <v-row style="width:100% ; font-family:monospace;" >
     
        <v-col  cols="12"  v-for="notice in noticeDataFilter" :key="notice._id"
          md="4">
          <v-card style="text-align:center" >
          <v-row>
            <v-col cols="12"  md="6">
            <v-icon>mdi-book</v-icon>
             <h4>{{notice.courseCode}}</h4>
             </v-col>
             <v-col cols="12" md="6">
             <v-icon> mdi-teach</v-icon>
             <h4>{{notice.facultyId}}</h4>
             </v-col>
          </v-row>
          <v-row>
            <v-col cols="12"  md="12">
            <v-icon>mdi-bell-alert </v-icon>
             <h4>{{notice.noticeTitle}}</h4>
             </v-col>
          </v-row>
          <v-row>
            <v-col cols="12"  md="12">
            <v-icon>mdi-note-text</v-icon>
             <h4>{{notice.noticeDetails}}</h4>
             </v-col>
          </v-row>
          <v-row>
            <v-col cols="12"  md="12">
            <v-icon>mdi-calendar-clock</v-icon>
             <h4>{{notice.date}}</h4>
              <v-btn @click="NoticeTitle=notice.NoticeTitle , formOpen=true " >
               <v-icon color="orange darken-2">mdi-pencil</v-icon>
             </v-btn>
             <v-btn @click="removeNotice(notice.NoticeId)">
               <v-icon color="red darken-2">mdi-delete</v-icon>
             </v-btn>
             </v-col>
          </v-row>
          
           </v-card>
       </v-col>
  
  </v-row>
  </div>
</template>

<script>
import NoticeForm from '../form/noticeForm'
export default {
  props:["courseCode"],
  data(){
    return {
      formOpen:false,
      btnAction:"Update",
      facultyId:"SHA",
      ALL_NOTICE :[],
      number_of_notice:"",
      searchNoticeItem:"",
      NoticeTitle:""
    }
  },
  component(){
    NoticeForm
  },
  async created(){
    this.getNoticeData()
    // console.log(this.ALL_NOTICE+" ----- "+this.number_of_notice)
     this.$nuxt.$on("updateNotice", () => {
      console.log("Event bus for notice")
      this.getNoticeData();
    });
    
  },
  
  methods:{
    async getNoticeData(){
      console.log(this.courseCode)
       await this.$axios.$get(`/coursenotice/${this.courseCode}`)
    .then((res)=>{
      this.ALL_NOTICE = res["Notices"]
      this.number_of_notice = res["Number of Notice"]
    }).catch((err)=>{
      console.log(err)
    })
    },
    async removeNotice(id){
      console.log(id)
       await this.$axios.$delete(`/coursenotice/${id}`)
    .then((res)=>{
      this.getNoticeData()
    }).catch((err)=>{
      console.log(err)
    })
    },
    updateNotice(id){
      console.log(id)
    }
  },
  computed:{
    
    noticeDataFilter: function() {
      return this.ALL_NOTICE.filter(notice => {
        return notice.noticeTitle.match(this.searchNoticeItem);
      });
    }
}
}
</script>

<style>

</style>