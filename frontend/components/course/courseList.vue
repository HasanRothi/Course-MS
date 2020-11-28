<template>
  <v-container>
    <v-expand-transition>
      <div v-if="formOpen == true">
        <CourseForm :btnAction="btnAction" :courseCode="courseCode" />
      </div>
    </v-expand-transition>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      true
      color="green accent-4"
    ></v-progress-linear>
    <snackBar v-if="snackbar" />
    <v-row class="text-center">
      <v-text-field
        v-model="searchCourseItem"
        append-icon="mdi-magnify"
        :label="`Search Course Code ( ${number_of_courses})`"
        single-line
        hide-details
      ></v-text-field>
    </v-row>
    <div v-if="courseDataFilter == 0" style="text-align:center" class="pa-16">
      <b>No search Found</b>
    </div>

    <v-row style="text-align:center">
      <v-container fluid>
        <v-card class="rounded-t-xl">
          <v-simple-table
            class="pt-8"
            v-if="courseDataFilter != 0"
            style="backgroundColor:#f1f2f6"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="color:black">
                    SL
                  </th>
                  <th class="text-left" style="color:black">
                    Course Code
                  </th>

                  <th class="text-left" style="color:black">
                    Course Title
                  </th>
                  <th class="text-left" style="color:black">
                    Course Credit
                  </th>
                   <th class="text-left" style="color:black">
                    Dept
                  </th>
                  <th class="text-left" style="color:black">
                    Faculty
                  </th>
                  <th class="text-left" style="color:black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(course, i) in courseDataFilter"
                  :key="course.id"
                  class="pa-15"
                >
                  <td>{{ i + 1 }}</td>
                  <td>{{ course.CourseCode }}</td>
                  <td>{{ course.CourseName }}</td>
                  <td>{{ course.CourseCredit }}</td>
                  <td>{{ course.dept }}</td>
                  <td>{{ course.Faculty }}</td>
                  <td>
                    <div style="display:flex">
                      <v-btn>
                        <v-icon
                          class="orange--text"
                          @click="
                            (btnAction = 'update'),
                              (courseCode = course.CourseCode),
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
                          @click="deleteCourseInfo(course.id)"
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
</template>

<script>
// import {mapState} from 'vuex'
import CourseForm from "../../components/form/courseForm";
import SnackBar from "../../components/snakbar/snackbar";
export default {
  components: {
    CourseForm,
    SnackBar
  },
  head() {
    return {
      title: `Course- MS | ${this.headTitle} | CourseList`
    };
  },
  data() {
    return {
      fabIcon: true,
      ALL_COURSES: [],
      formOpen: false,
      searchCourseItem: "",
      headTitle: "Action",
      snackbar: false,
      loading: false,
      number_of_courses: "",
      btnAction: "save"
    };
  },
  computed: {
    courseDataFilter: function() {
      return this.ALL_COURSES.filter(course => {
        return course.CourseCode.match(this.searchCourseItem);
      });
    }
  },
  async created() {
    this.getCourseData();
    this.$nuxt.$on("addNewCourse", () => {
      // console.log("Event bus")
      this.getCourseData();
    });
  },
  methods: {
    async getCourseData() {
      this.loading = true;
      await this.$store.dispatch("course/fetchCourseList");
      var data = await this.$store.getters["course/getCourseList"];
      this.ALL_COURSES = data.Courses;
      this.number_of_courses = data["Number of course"];
      this.loading = false;
    },
    async deleteCourseInfo(id) {
      console.log(id);
      this.loading = true;
      await this.$axios
        .$delete(`/course/remove/${id}`)
        .then(res => {
          console.log("Delete" + res);
          this.loading = false;
          this.$store.dispatch("snackbar/callSnackbarInfo", {
            message: "Successfully Deleted Course",
            color: "blue",
            time: "4000"
          });
          this.snackbar = true;
          this.getCourseData();
        })
        .catch(err => {
          console.log("Delete errr " + err);
        });
    }
  }
  //  beforeDestroy(){
  //   EventBus.$off('addNewCourse')
  // }
};
</script>
