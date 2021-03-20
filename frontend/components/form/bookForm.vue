<template>
  <v-container>

          <v-card style="backgroundColor:#f1f2f6" class="pa-4 rounded-b-xl">
    <FormulateForm
  v-model="formValues" @submit="save"
>
<v-row>
     <v-col
          cols="12"
          md="6"
        >
  <FormulateInput
    v-model="name"
    name="name"
    label="Name"
    validation="required"
  />
 </v-col>
  <v-col
          cols="12"
          md="6"
        >
  <FormulateInput

    v-model="author"
    name="author"
    label="Author"
    validation="required"
  />
  </v-col>
   <v-col
          cols="12"
          md="6"
        >
  <FormulateInput

    v-model="edition"
    name="edition"
    label="Edition"
  />
  </v-col>
   <v-col
          cols="12"
          md="6"
        >
  <FormulateInput

    v-model="total"
    name="total"
    label="Total"
    validation="required|number"
  />
  </v-col>
   <v-col
          cols="12"
          md="6"
        >
 <FormulateInput
  v-model="category"
    name="category"
    label="Category"
    validation="required"
/>
  </v-col>
 
   <v-col
          cols="12"
          md="6"
        >
  <FormulateInput
    type="submit"
    :label="btnAction"

  />
  </v-col>
  </v-row>
</FormulateForm>
</v-card>
  </v-container>
</template>

<script>
export default {
    props : ["btnAction","bookID","bookCategory"],
    data() {
        return {
            formValues : {},
            name :"",
            author:"",
            edition:"",
            category:"",
            total:""
        }
    },
    async created() {
      if(this.btnAction=='update'){
        console.log(this.btnAction + this.bookID + this.bookCategory)
           await this.$axios.$get(`/library/${this.bookID}`)
    .then((res)=>{
       console.log(res[0]) , 
      this.name = res[0].name
      this.author = res[0].author,
      this.total = res[0].total,
      this.edition = res[0].edition,
      this.category = res[0].category
     
    }).catch((err)=>{
      console.log(err)
    })
      }
    },
    computed: {
      getBookData(){
        var bookData = {
            name : this.formValues.name,
            author : this.formValues.author,
            category : this.formValues.category.toUpperCase(),
            edition : this.formValues.edition,
            total : this.formValues.total
          }
          return bookData
      }
    },
    methods: {
        async save(){
          if(this.btnAction=='update') {
            this.update() 
            return
          }
            await this.$axios.$post('/library' , this.getBookData)
              .then((res)=>{
                this.$nuxt.$emit("add-update-bookInfo");
              }).catch((err)=>{
                console.log(err)
              })
        },
        async update(){
             await this.$axios.$patch(`/library/${this.bookID}` , this.getBookData)
              .then((res)=>{
                this.$nuxt.$emit("add-update-bookInfo");
              }).catch((err)=>{
                console.log(err)
              })
        }
    },
}
</script>

<style>

</style>