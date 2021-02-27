<template>
  <div>
    <v-tabs v-model="type" @change="loadArchive()">
    <v-tab @click="type='Thesis'">Thesis</v-tab>
    <v-tab @click="type='Project'">Project</v-tab>
  </v-tabs>
  <span v-if="archiveList.length === 0" class="text--center">No Archive Found</span>
  <v-timeline v-else>
    <v-timeline-item
      v-for="n in archiveList"
      :key="n"
      large
    >
      <template v-slot:icon>
        <v-avatar class="black white--text">
          {{dept}}
        </v-avatar>
      </template>
      <template v-slot:opposite>
        <span v-for="(s,i) in n.students" :key="s"><span v-if="i!=0">,</span>{{s}}</span><br/>
        <v-btn outlined>Supervisor : {{n.supervisor}}</v-btn>
      </template>
      <v-card class="elevation-2">
        <v-card-title class="headline">
        <a :href="n.link" style="cursor:pinter;text-decoration:none;" target="blank">{{n.title}}</a>
        </v-card-title>
        <v-card-text>{{n.description}}</v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 'Thesis',
      archiveList : [],
      archive: ['Thesis','Project'],
      dept : this.$route.params.dept
    }
  },
  created () {
    this.loadArchive ()
  },
  methods : {
    loadArchive () {
      console.log(this.archive[this.type])
      this.archiveList = []
    this.$axios.$get(`archive/${this.$route.params.dept}/${this.archive[this.type]}`)
    .then((res)=>{
      console.log(res)
      res.forEach(element => {
        this.archiveList.push(element)
      });
    }).catch((err)=>{
      console.log(err)
    })
    }
  }
}
</script>

<style>
div {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>