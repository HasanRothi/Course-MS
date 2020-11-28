<template>
  <v-app dark >
    <v-app-bar fixed dense app >

      <v-btn  to="/" class="rounded-lg">
        <v-icon>mdi-home</v-icon>
       Home
      </v-btn>
 <!-- <v-switch class="pt-6 pl-2 text-capitalize"
      v-model="switch1"
      inset
       label="dark mode"
              color="black"
              value="black"

    ></v-switch> -->
      <v-spacer />
      <!-- Dept Menu bar -->
      <v-menu
        top
        :offset-x="offsetx"
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
               <v-badge
            color="green"
            :content="number_of_dept"
            bordered
            bottom
            left
            offset-x="10"
            offset-y="10"
        >
              <v-btn v-bind="attrs" v-on="{ ...tooltip, ...menu }" class="rounded-bl-xl">
                <v-icon>mdi-layers</v-icon>
                Dept
              </v-btn>
               </v-badge>
            </template>
            <span>Explore Depatment</span>
          </v-tooltip>
        </template>

        <v-list class="#f0932b " >
          <v-list-item v-for="(item, index) in itemDept" :key="index" link>
            <v-list-item-title>
              <v-btn block class="orange" :to="`/dept/${item}`">
                {{ item }}</v-btn
              >
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-badge
            color="green"
            :content="number_of_book"
            bordered
            bottom
            left
            offset-x="10"
            offset-y="10"
        >
      <v-btn to="/library" class="rounded-bl-xl"><v-icon>mdi-library</v-icon>Library</v-btn>
      </v-badge>
       <v-btn to="/coding" class="rounded-t-xl"  outlined color="blue"><v-icon>mdi-code-tags</v-icon>Coding</v-btn>
      <v-btn v-if="userId" :to="`/${userRole}/${userId}`">
        <v-icon>mdi-account</v-icon>{{ userId }}</v-btn
      >
      <div>

         <v-badge
        bordered
        color="error"
        icon="mdi-lock"
        overlap
      >
        <v-btn v-if="!userId" to="/login" class="rounded-b-xl">Login</v-btn>
         </v-badge>
        <!--User  Menu Bar  -->
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-if="userId" v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-row
                style="font-family:cursive;" class="blue"
              >
              <v-col cols="12" md="2" lg="2" sm="2" ><v-icon>{{item[1].icon}}</v-icon></v-col>
               <v-col cols="12" md="10" lg="10" sm="10"><h5>{{item[0].title}}</h5></v-col>
                <v-divider inset></v-divider>
              </v-row>

            </v-list-item>
            <v-btn block dark @click="logout()"
              ><v-icon>mdi-logout</v-icon> Logout</v-btn
            >
          </v-list>
        </v-menu>
      </div>
      <!-- mobile menu  code here (Pending)-->
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer>
      <span style="text-align:center;"
        >&copy; {{ new Date().getFullYear() }} - Course Management Project</span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
 head() {
    return {
      title: `Course-MS | HOME`
    };
  },
  data() {
    return {
      number_of_dept : 6,
      number_of_book: null,
      switch1: false,
      userId: null,
      userRole: null,
      title: "COurse-Ms",
      offsetx : true,
      items: [],
      itemDept: ["CSE", "IT", "EEE", "CIVIL", "PHARMCAY", "LAW"]
    };
  },
  async created() {
    // this.$vuetify.theme.dark = true;
    this.userRole = "faculty";
    this.userId = "MII"
    // console.log("User - " , this.userId)
    // console.log(" Local UserRole -- "+this.$auth.$storage.getLocalStorage("userRole") , " Local User -- "+this.$auth.$storage.getLocalStorage("userId"))
    if(this.userId){
    await this.$axios
      .$get(`/${this.userRole}/${this.userId}`)
      .then(res => {
        this.items.push([{ title: res[0].userId }, { icon: "mdi-account" }]);
        this.items.push([{ title: res[0].name }, { icon: "mdi-human" }]);
        this.items.push([{ title: res[0].password }, { icon: "mdi-security" }]);
        this.items.push([{ title: res[0].dept }, { icon: "mdi-library" }]);
        this.items.push([{ title: res[0].mail }, { icon: "mdi-email-outline" }]);
        this.items.push([{ title: res[0].phone }, { icon: "mdi-phone" }]);
      })
      .catch(err => {
        console.log(err);
      });
    }
     //gettting number of book for library
       await this.$axios
      .$get('/library')
      .then(res => {
        console.log(res)
        this.number_of_book = res['Number of book']
      })
      .catch(err => {
        console.log(err);
      });

  },
  watch: {
   switch1: function (val) {
      // console.log(this.switch1)
      if(this.switch1=="black") {this.$vuetify.theme.dark = true;}
      else this.$vuetify.theme.dark = false
    },
  },
  methods: {
    logout() {
      console.log("logout");
      localStorage.clear();
      this.$store.dispatch("login/loggedOut");
    }
  }
};
</script>
