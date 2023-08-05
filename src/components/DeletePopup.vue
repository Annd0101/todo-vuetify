<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{props}">
      <v-btn v-bind="props" variant="text" color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Confirm Delete</v-card-title>
      <v-card-text>Are you sure you want to delete this project?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="outlined" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn
          color="error"
          variant="outlined"
          text
          @click.prevent="deleteProject(project.id)"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import db from '@/firebase'
import { deleteDoc, doc } from 'firebase/firestore'
import { defineEmits } from 'vue';
import { defineProps } from 'vue';
const props = defineProps(['project']);
const emit = defineEmits(['removed']);
const dialog = ref(false)
const project = ref({ ...props.project });
console.log(project.value.id)
const deleteProject = (id) => {
    deleteDoc(doc(db,"projects", id))
    emit('removed')
  }
</script>

<style scoped></style>
