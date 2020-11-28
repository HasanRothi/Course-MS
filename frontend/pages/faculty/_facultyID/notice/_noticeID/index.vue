<template>
  <div>
      
      <v-card dark style="text-align:center;" class="pa-2">
          <v-btn :to="`/faculty/${this.$route.params.facultyID}`"><v-icon
        color="purple darken-2"
          left
        >
          mdi-home
        </v-icon>
              Home
          </v-btn>
     <span class="pa-4"> <v-icon>mdi-source-branch</v-icon> {{noticeId}}</span>
     <span class="pa-4"><v-icon>mdi-forum</v-icon>{{courseInfo.courseName}}</span>
     <span class="pa-4"><v-icon>mdi-code-brackets</v-icon>{{courseInfo.courseCredit}}</span>    
      </v-card>
      <NoticeForm v-if="formOpen" :btnAction_Prop="btnAction" :courseCode_Prop="courseCode" :facultyId_Prop="facultyId"/>
      <NoticeView :courseCode="courseCode"/>
        <v-btn
        color="green"
        fixed
        dark
        bottom
        right
        fab
        @click="
          (btnAction = 'save'), (formOpen = !formOpen), (fabIcon = !fabIcon)
        "
      >
        <v-icon v-if="fabIcon">mdi-plus</v-icon>
        <v-icon v-if="!fabIcon || btnAction == 'update'">mdi-close</v-icon>
      </v-btn>
      <!-- chat  -->
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

      <v-card id="chatCard" ref="chatCard">
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

        <v-card-text >
            <div v-for="(chat,i) in chatInfo" :key="i">
              <!-- chat view design -->
              <v-row  :class="{ 'flex-row-reverse': chat.userId==facultyId }">
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
          <FormulateInput  type="text" v-model="message"/>
          <v-btn
            color="dark" @click="sendMessage()"
          >
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/vue-chat-scroll/dist/vue-chat-scroll.min.js"></script>
<script>
import NoticeView from '../../../../../components/notice/noticeView'
import NoticeForm from '../../../../../components/form/noticeForm'
export default {
data(){
    return {
        // noticeId: this.$route.params.noticeId,
         formOpen : false,
         btnAction:"",
         fabIcon:true,
        noticeId: this.$route.params.noticeID,
        courseInfo : [],
        ALL_NOTICE_BY_COURSE:[],
        courseCode : this.$route.params.noticeID,
        facultyId : this.$route.params.facultyID,
        chatInfo:[],
         message:"",
          openChat:false,
         dialog: false,
    }
},

component(){
    NoticeView,
    NoticeFrom
},
async created(){

  console.log("faculty "+this.$route.params.facultyID+ "code " +this.$route.params.noticeID)
    await this.$axios.$get(`course/${this.noticeId}`)
    .then((res)=>{
      this.courseInfo = res[0]
    }).catch((err)=>{
      console.log(err)
    })
    // console.log(this.courseInfo)
    this.getChatInfo();
},
methods: {

 async sendMessage(){
    console.log(this.courseCode + this.facultyId + this.message)
    var messageInfo = {
      "userId": this.facultyId,
      "message" : this.message
    }
      console.log("Card height"+ document.getElementById('chatCard').clientHeight)
    //  await this.$axios.$post(`chat/message/${this.courseCode}`,messageInfo)
    // .then((res)=>{
    //   console.log(res)
    //   this.getChatInfo()
    // }).catch((err)=>{
    //   console.log(err)
    // })
  },
   async getChatInfo(){
     await this.$axios.$get(`chat/${this.courseCode}`)
    .then((res)=>{
      if(res[0].chatList)
     {
        this.chatInfo = res[0].chatList
     }
      // console.log("Chat data"+res[0].chatList)
    }).catch((err)=>{
      console.log(err)
    })
    console.log(this.chatInfo)
    
  }
},
}
</script>

<style>

</style>