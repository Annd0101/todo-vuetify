<template>
  <div class="projects">
    <h1 class="text-subtitle-1 text-grey">Projects</h1>
    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="project in projects"
          :key="project.title"
          :title="project.title"
        >
          <v-expansion-panel-text>
            <div class="font-weight-bold">Due by {{ project.due }}</div>
            <div>{{ project.content }}</div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>
<script>
import db from '@/firebase'
export default {
  data() {
    return {
      projects: []
    }
  },
  created() {
    db.collection('projects').onSnapshot(res =>{
    const changes = res.docChanges()
    changes.forEach(change =>{
      if(change.type === 'added'){
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          })
      }
    })
  })
  },
}
</script>
