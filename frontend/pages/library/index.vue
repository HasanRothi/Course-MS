<template>
  <div>
      <v-app-bar dense>
          <v-btn class="light-blue accent-1" to="/"> <v-icon>mdi-home</v-icon> </v-btn>
          <v-spacer></v-spacer>
          <v-sheet elevation="6">
    <v-tabs
      background-color="cyan"
      show-arrows
     v-model="tab"
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab
        v-for="i in bookCategory"
        :key="i"
      >
        {{ i }}
      </v-tab>
    </v-tabs>
  </v-sheet>
  <v-spacer></v-spacer>
  <v-btn>Login</v-btn>
      </v-app-bar>
     <v-container>
          <v-expand-transition>
      <div v-if="formOpen == true">
        <BookForm :btnAction="btnAction" :bookID="bookID" :bookCategory="bookCategory" />

      </div>
    </v-expand-transition>
          <v-text-field
        v-model="searchBookItem"
        append-icon="mdi-magnify"
        :label="`Search Book ( ${number_of_book})`"
        single-line
        hide-details
      ></v-text-field>

    <div v-if="bookDataFilter == 0" style="text-align:center" class="pa-16">
      <b>No Book Found</b>
    </div>

    <v-row style="text-align:center">
      <v-container fluid>
        <v-card class="rounded-t-xl">
          <v-simple-table
            class="pt-8"
            v-if="bookDataFilter != 0"
            style="backgroundColor:#f1f2f6"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="color:black">
                    SL
                  </th>
                  <th class="text-left" style="color:black">
                    Name
                  </th>

                  <th class="text-left" style="color:black">
                    Author
                  </th>
                  <th class="text-left" style="color:black">
                      Edition
                  </th>
                  <th class="text-left" style="color:black">
                      Total
                  </th>
                  <th class="text-left" style="color:black">
                    Available
                  </th>
                  <th class="text-left" style="color:black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(book, i) in bookDataFilter"
                  :key="book.id"
                  class="pa-15"
                  @dblclick="bookClicked(book.id)"
                >
                  <td>{{ i + 1 }}</td>
                  <td>{{ book.name  }}</td>
                  <td>{{ book.author }}</td>
                  <td>{{ book.edition }}</td>
                   <td>{{ book.total }}</td>
                  <td>{{ book.available }}</td>
                  <td>

                    <div style="display:flex">
                      <v-btn>
                        <v-icon
                          class=" orange--text"
                          @click="
                            (btnAction = 'update'),
                              (bookID = book.id),
                              (formOpen = true),
                              (fabIcon = !fabIcon)
                          "
                        >
                          mdi-pencil</v-icon
                        >
                      </v-btn>
                      <v-btn>
                        <v-icon
                          class="red--text"
                          @click="deleteBookInfo(book.id)"
                        >
                          mdi-delete</v-icon
                        >
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-container>
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
      </v-row>
     </v-container>
  </div>
</template>

<script>
import BookForm from '../../components/form/bookForm'
export default {

     layout: 'library',
        head() {
      return {
        title: `Course-MS| Library `
      }},
     components:{
         BookForm
     },
     data() {
         return {
            tab:0,
            formOpen : false,
            fabIcon : true,
            searchBookItem : "",
            number_of_book : 0,
            ALL_BOOKS:[],
            bookID : null,
            btnAction : "save",
            bookCategory : ["ALL","CSE-IT","EEE-ECE","CIVIL","PHAMACY","LAW","SOCIAL WORK"]
         }
     },
      async created() {
       await this.getBookInfo()
           this.$nuxt.$on("add-update-bookInfo", () => {
          this.getBookInfo();
    });
     },
     watch: {
         tab(){
             console.log(this.bookCategory[this.tab])
             //axiox call based on tab
             if(this.bookCategory[this.tab]!='ALL'){
               this.getBookInfo(`/library/category/${this.bookCategory[this.tab]}`)
             }else this.getBookInfo()

         },
     },
      computed:{
         bookDataFilter: function() {
          return this.ALL_BOOKS.filter(book => {
          return book.name.match(this.searchBookItem);
      })
    },
  },
  methods: {
    async getBookInfo(param = "/library"){
         await this.$axios.$get(param)
          .then((res)=>{
            this.ALL_BOOKS = res.Books
            this.number_of_book = res["Number of book"]
          }).catch((err)=>{
            console.log(err)
          })
    },
    async deleteBookInfo(id){
      console.log(id)
         await this.$axios.$delete(`/library/${id}`)
    .then((res)=>{
      this.getBookInfo()
    }).catch((err)=>{
      console.log(err)
    })
    },
     bookClicked(id){
        console.log(id)
        this.$router.push({ path: `/library/book/${id}` })
      }
  },

}
</script>

<style scoped>

</style>>