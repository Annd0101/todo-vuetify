<template>
  <div class="Dashboard">
    <h1 class="text-subtitle-1 text-grey">Dashboard</h1>

    <v-snackbar
      v-model="snackbar"
      :timeout="4000"
      location="top"
      color="success"
    >
      <span>Awesome ! You update a new project</span>

      <v-btn
        variant="text"
        color="white"
        size="small"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-snackbar v-model="remove" :timeout="4000" location="top" color="success">
      <span>You delete a new project</span>
      <v-btn variant="text" color="white" size="small" @click="remove = false">
        Close
      </v-btn>
    </v-snackbar>

    <v-container class="mt-12 container">
      <v-row class="mb-3 ml-2">
        <v-btn
          small
          variant="flat"
          color="grey-lighten-3"
          class="text-grey"
          @click="sortBy('title')"
        >
          <v-tooltip activator="parent" location="top">
            Sort by project name
          </v-tooltip>
          <v-icon start>mdi-folder</v-icon>
          <span class="text-caption text-lowercase">by project name</span>
        </v-btn>
        <v-btn
          variant="flat"
          color="grey-lighten-3"
          class="text-grey"
          @click="sortBy('person')"
        >
          <v-tooltip activator="parent" location="top">
            Sort by person
          </v-tooltip>
          <v-icon small start>mdi-account</v-icon>
          <span class="text-caption text-lowercase">by person</span>
        </v-btn>
      </v-row>

      <v-card
        class="pl-3"
        variant="flat"
        v-for="project in projects"
        :key="project.id"
      >
        <v-row class="pa-3 project" :class="`${project.status}`">
          <v-col cols="12" sm="3" md="3">
            <div class=" text-caption text-grey">Project title</div>
            <div>{{ project.title }}</div>
          </v-col>
          <v-col cols="3" sm="3" md="3">
            <div class=" text-caption text-grey">Person</div>
            <div>{{ project.person }}</div>
          </v-col>
          <v-col cols="3" sm="3" md="3">
            <div class=" text-caption text-grey">Due by</div>
            <div>{{project.due}}</div>
          </v-col>
          <v-col cols="3" sm="2" md="1">
            <div class=" text-caption text-grey text-center">Update</div>
            <UpdatePopup
              :project="project"
              @updated="snackbar = true"
            ></UpdatePopup>
          </v-col>
          <v-col cols="3" sm="2" md="1">
            <div class=" text-caption text-grey text-center">Delete</div>
            <DeletePopup
              :project="project"
              @removed="remove = true"
            ></DeletePopup>
          </v-col>
          <v-col cols="12" sm="2" md="1">
            <div>
              <v-chip
                :class="`${project.status}`"
                class="text-white text-caption ma-2"
              >
                {{ project.status }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import db from '@/firebase'
import UpdatePopup from '@/components/UpdatePopup.vue'
import DeletePopup from '@/components/DeletePopup.vue'
export default {
  components: { UpdatePopup, DeletePopup },
 data(){
  return{
    projects: [
        // { title: 'Design a new website', person: 'The Net Ninja', due: '1st Jan 2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        // { title: 'Code up the homepage', person: 'Chun Li', due: '10th Jan 2019', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        // { title: 'Design video thumbnails', person: 'Ryu', due: '20th Dec 2018', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        // { title: 'Create a community forum', person: 'Gouken', due: '20th Oct 2018', status: 'overdue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
      ],
      snackbar: false,
      remove: false,
  }
 },
 methods : {
  sortBy(prop){
    this.projects.sort((a,b) =>
      a[prop] < b[prop] ? -1 : 1
    )
  },

 },
 created() {
  // firestore real-time listener
  db.collection('projects').onSnapshot(res =>{
    const changes = res.docChanges()
    changes.forEach(change =>{
      if(change.type === 'added'){
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          })
      } else if (change.type === 'modified') {
        const updatedProject = {
          ...change.doc.data(),
          id: change.doc.id,
        };
        const index = this.projects.findIndex(project => project.id === updatedProject.id);
        if (index !== -1) {
          this.projects.splice(index, 1, updatedProject);
        }
      } else if (change.type === 'removed') {
        const removedProjectId = change.doc.id;
        this.projects = this.projects.filter(project => project.id !== removedProjectId);
      }
    })
  })
 }
}
</script>
<style scoped>
.project.complete{
  border-left: 4px solid #3CD1C2;
}
.project.ongoing{
  border-left: 4px solid orange
}
.project.overdue{
  border-left: 4px solid tomato;
}
.v-chip.complete{
  background: #3cd1c2;
}
.v-chip.ongoing{
  background: #ffaa2c;
}
.v-chip.overdue{
  background: #f83e70;
}
</style>
