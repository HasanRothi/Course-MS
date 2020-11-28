<template>
  <v-row justify="center" align="center">
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      true
      color="green accent-4"
    ></v-progress-linear>
   <v-expand-transition>
      <div v-if="formOpen == true">
        <FacultyForm :btnAction="btnAction" :facultyId="facultyId" />
      </div>
    </v-expand-transition>

     <v-row class="text-center">
      <v-text-field
        v-model="searchFacultyItem"
        append-icon="mdi-magnify"
        :label="`Search faculty( ${number_of_faculty})`"
        single-line
        hide-details
      ></v-text-field>
      <div v-if="facultyDataFilter == 0" style="text-align:center" class="pa-16">
      <b>No search Found</b>
    </div>
    </v-row>
     <v-row style="text-align:center">
      <v-container fluid>
        <v-card class="rounded-t-xl">
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
                    user Id
                  </th>

                  <th class="text-left" style="color:black">
                    Name
                  </th>
                   <th class="text-left" style="color:black">
                    Dept
                  </th>
                  <th class="text-left" style="color:black">
                    Password
                  </th>
                  <th class="text-left" style="color:black">
                    Phone
                  </th>
                  <th class="text-left" style="color:black">
                    Mail
                  </th>
                  <th class="text-left" style="color:black">
                    Action
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
                  <td>{{ faculty.dept }}</td>
                  <td>{{ faculty.password }}</td>
                  <td>{{ faculty.phone }}</td>
                  <td>{{ faculty.mail }}</td>
                  <td>
                    <div style="display:flex">
                      <v-btn>
                        <v-icon
                          class="orange--text"
                          @click="
                            (btnAction = 'update'),
                              (facultyId = faculty.userId),
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
                          @click="deleteFacultyData(faculty.userId)"
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
  </v-row>
</template>

<script>
import FacultyForm from '../../components/form/facultyForm'
export default {
   head() {
      return {
        title: "Course-MS | Faculty | facultyList"
      }
  },
  data(){
    return {
      formOpen : false,
      btnAction:"",
      loading : false,
      searchFacultyItem:"",
      ALL_FACULTY:[],
      fabIcon: true,
      facultyId:""
    }
  },
  components: {
    FacultyForm
  },
  async created() {
    this.getFacultyData();
    this.$nuxt.$on("recallFaculty", () => {
      // console.log("Event bus")
      this.getFacultyData();
    });
  },
  methods: {
    async getFacultyData() {
      this.loading = true;
      await this.$store.dispatch("faculty/fetchfacultyList");
      var data = await this.$store.getters["faculty/getFacultyList"];
      this.ALL_FACULTY = data.Facultys;
      this.number_of_faculty = data["Number of faculty"];
      this.loading = false;
    },
    async deleteFacultyData(id) {
      // console.log(id);
      // this.loading = true;
      await this.$axios
        .$delete(`/faculty/${id}`)
        .then(res => {
          console.log("Delete" + res);
          this.loading = false;
          this.$store.dispatch("snackbar/callSnackbarInfo", {
            message: "Successfully Deleted Faculty",
            color: "blue",
            time: "4000"
          });
          this.snackbar = true;
          this.getFacultyData();
        })
        .catch(err => {
          console.log("Delete errr " + err);
        });
    }
  },
   computed: {
    facultyDataFilter: function() {
      return this.ALL_FACULTY.filter(faculty => {
        return faculty.userId.match(this.searchFacultyItem);
      });
    }
  },

}
</script>
