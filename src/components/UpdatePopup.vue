<template>
  <v-dialog width="600" v-model="dialog">
    <template v-slot:activator="{props}">
      <v-btn v-bind="props" variant="text" color="success">
        <v-icon>mdi-update</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-center">Update project</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="updatedProject.title"
            label="Title"
            prepend-icon="mdi-folder"
            :rules="inputRules"
          ></v-text-field>
          <v-textarea
            v-model="updatedProject.content"
            label="Information"
            prepend-icon="mdi-pencil"
            :rules="inputRules"
          ></v-textarea>

          <v-menu>
            <template v-slot:activator="{props}">
              <v-text-field
                v-model="updatedProject.due"
                v-bind="props"
                label="Due date"
                :rules="inputRules"
                prepend-icon="mdi-calendar-month"
              ></v-text-field>
            </template>
          </v-menu>
          <v-text-field
            v-model="updatedProject.person"
            label="Person"
            prepend-icon="mdi-account"
            :rules="inputRules"
          ></v-text-field>

          <v-select
            v-model="updatedProject.status"
            label="Status"
            prepend-icon="mdi-list-status"
            :items="['ongoing', 'complete', 'overdue']"
          ></v-select>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="success"
              variant="outlined"
              text
              @click.prevent="updateProject"
            >
              Save
            </v-btn>
            <v-btn
              color="error"
              variant="outlined"
              text
              @click="dialog = false"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup>
// import moment from 'moment'
import { ref } from 'vue';
import db from '@/firebase'
import { setDoc, doc } from 'firebase/firestore'
import { defineProps } from 'vue';
import { defineEmits } from 'vue';
const props = defineProps(['project']);
const updatedProject = ref({ ...props.project });
const emit = defineEmits(['updated']);
const form = ref(null)
const dialog = ref(false)

// const formattedDate = () => {
//   return due.value ? moment(due.value).format("Do MMMM YYYY") : "";
// }
// formattedDate()
const inputRules = [
  (value) => {
    if (value) return true;
    return 'You must enter a title'
  }
]
const updateProject = async () => {
  const { valid } = await form.value.validate()
  if (valid) {
    setDoc(doc(db,'projects', updatedProject.value.id),{
        title : updatedProject.value.title,
        due: updatedProject.value.due,
        person: updatedProject.value.person,
        content: updatedProject.value.content,
        status: updatedProject.value.status
    }).then(() => {
        dialog.value = false
        emit('updated')
    })
  }
}
</script>

<style scoped></style>
