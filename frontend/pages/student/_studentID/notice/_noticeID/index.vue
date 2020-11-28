<template>
  <div>
      
      <v-card dark style="text-align:center;" class="pa-2">
          <v-btn :to="`/student/${this.$route.params.studentID}`"><v-icon
        color="purple darken-2"
          left
        >
          mdi-home
        </v-icon>
              Home
          </v-btn>
     <span class="pa-4"> <v-icon>mdi-source-branch</v-icon> {{courseInfo.courseCode}}</span>
     <span class="pa-4"><v-icon>mdi-forum</v-icon>{{courseInfo.courseName}}</span>
     <span class="pa-4"><v-icon>mdi-code-brackets</v-icon>{{courseInfo.courseCredit}}</span>    
      </v-card>

      <NoticeView :courseCode="courseCode"/>
      
   <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="400"
      left
    >
      <template v-slot:activator="{ on, attrs }">
            <v-btn
        color="orange"
        fixed
        dark
        bottom
        left
        fab
         v-bind="attrs"
          v-on="on"
      >
        <v-icon @click="openChat=!openChat"> mdi-message</v-icon>
      </v-btn>
        
      </template>

      <v-card >
        <v-card-title class="headline orange">
            <div>
                 {{courseCode}} 
                    <v-btn
            color="dark"
            text
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
            </div>
        </v-card-title>

        <v-card-text>
        
            <div v-for="(chat,i) in chatInfo" :key="i">
              <!-- chat view design -->
              <v-row  :class="{ 'flex-row-reverse': chat.userId==studentId }">
                <br>
               <v-avatar
               color="orange"
                size="50"
                >
                 <span style="font-size: 10px;" class="white--text">{{chat.userId}}</span>
    </v-avatar>
              <span >
                  <v-tooltip right>
      <template v-slot:activator="{ on, attrs }">
        <v-card class="pa-2" 
          color="white black--text"
          dark
          v-bind="attrs"
          v-on="on"
        >
           {{chat.message}}
        </v-card>
      </template>
      <span> {{chat.date}}</span>
    </v-tooltip>
                 
              </span>
              </v-row>
            </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <FormulateInput type="text" v-model="message"/>
          <v-btn
            color="dark" @click="sendMessage()"
          >
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
      
  </div>
</template>

<script>
import NoticeView from '../../../../../components/notice/noticeView'
// import Chat from '../../../../../components/chat/chat'
export default {
data(){
    return {
        // courseCode: this.$route.params.courseCode,
         formOpen : false,
         btnAction:"",
         fabIcon:true,
        courseCode: this.$route.params.noticeID,
        courseInfo : [],
        ALL_NOTICE_BY_COURSE:[],
        studentId : this.$route.params.studentID,
        openChat:false,
         dialog: false,
         chatInfo : [],
         message:""
    }
},
      head() {
      return {
        title: `Student | ${this.$route.params.studentID} |  ${this.$route.params.noticeID}`
      }
  },
component(){
    NoticeView
    // Chat
},
async created(){
    await this.$axios.$get(`course/${this.courseCode}`)
    .then((res)=>{
      this.courseInfo = res[0]
    }).catch((err)=>{
      console.log(err)
    })
    console.log(this.courseInfo)
    this.getChatInfo();
},
methods:{
  async sendMessage(){
    console.log(this.courseCode + this.studentId + this.message)
    var messageInfo = {
      "userId": this.studentId,
      "message" : this.message

    }
     await this.$axios.$post(`chat/message/${this.courseCode}`,messageInfo)
    .then((res)=>{
      console.log(res)
      this.getChatInfo()
    }).catch((err)=>{
      console.log(err)
    })
  },
  async getChatInfo(){
     await this.$axios.$get(`chat/${this.courseCode}`)
    .then((res)=>{
      this.chatInfo = res[0].chatList
      // console.log("Chat data"+res[0].chatList)
    }).catch((err)=>{
      console.log(err)
    })
    // console.log(this.chatInfo)
  }
}
}
</script>

<style>

</style>