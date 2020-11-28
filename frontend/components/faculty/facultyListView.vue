<template>
  <div>
      <h3 style="text-align:center;font-family:cursive">Faculty</h3>
       <v-text-field
        v-model="searchFacultyItem"
        append-icon="mdi-magnify"
        :label="`Search Faculty( ${number_of_faculty})`"
        single-line
        hide-details
      ></v-text-field>
      <div v-if="facultyDataFilter == 0" style="text-align:center" class="pa-16">
      <b>No Faculty Found</b>
    </div>

    <v-row style="text-align:center">
      <v-container fluid>
        <v-card class="rounded-r-xl">
          <v-simple-table
            class="pt-8"
            v-if="facultyDataFilter != 0"
            style="backgroundColor:#f1f2f6"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="color:black">
                    SL
                  </th>
                  <th class="text-left" style="color:black">
                    Short
                  </th>

                  <th class="text-left" style="color:black">
                    Name
                  </th>
                
                  <th class="text-left" style="color:black">
                    Phone
                  </th>
                  <th class="text-left" style="color:black">
                    Mail
                  </th>
          
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(faculty, i) in facultyDataFilter"
                  :key="faculty.id"
                  class="pa-15"
                >
                  <td>{{ i + 1 }}</td>
                  <td>{{ faculty.userId }}</td>
                  <td>{{ faculty.name }}</td>
                  <td>{{ faculty.phone }}</td>
                  <td>{{ faculty.mail }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-container>
    </v-row>
  </div>
</template>

<script>
export default {
data(){
    return {
 ALL_FACULTY:[],
      number_of_faculty:"",
      searchFacultyItem:""
    }
},
async created(){
//     // console.log("hu la la hu hlaa ")
//  await this.$store.dispatch("faculty/fetchfacultyList");
//       var data = await this.$store.getters["faculty/getFacultyList"];
//       this.ALL_FACULTY = data.Facultys;
//       this.number_of_faculty = data["Number of faculty"];
 await this.$axios.$get(`/faculty/dept/${this.$route.params.deptName}`,)
    .then((res)=>{
       this.ALL_FACULTY = res["Facultys"]
      this.number_of_faculty = res["Number of faculty"];
    }).catch((err)=>{
      console.log(err)
    })
},
computed:{
    facultyDataFilter: function() {
      return this.ALL_FACULTY.filter(faculty => {
        return faculty.userId.match(this.searchFacultyItem);
      });
    }
}
}
</script>

<style>

</style>