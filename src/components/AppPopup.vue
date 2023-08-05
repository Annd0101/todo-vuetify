<template>
  <v-dialog width="600" v-model="dialog">
    <template v-slot:activator="{props}">
      <v-btn variant="flat" color="warning" v-bind="props" class="my-3 py-2">
        Add a new project
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-center">Add a new project here</v-card-title>
      <v-card-text>
        <v-form @submit.prevent ref="form">
          <v-text-field
            v-model="title"
            label="Title"
            prepend-icon="mdi-folder"
            :rules="inputRules"
          ></v-text-field>
          <v-textarea
            v-model="content"
            label="Information"
            prepend-icon="mdi-pencil"
            :rules="inputRules"
          ></v-textarea>

          <v-menu>
            <template v-slot:activator="{props}">
              <v-text-field
                v-model="due"
                v-bind="props"
                label="Due date"
                :rules="inputRules"
                prepend-icon="mdi-calendar-month"
              ></v-text-field>
            </template>
          </v-menu>
          <v-text-field
            v-model="person"
            label="Person"
            prepend-icon="mdi-account"
            :rules="inputRules"
          ></v-text-field>

          <v-select
            v-model="status"
            label="Status"
            prepend-icon="mdi-list-status"
            :items="['ongoing', 'complete', 'overdue']"
          ></v-select>
          <v-btn
            color="warning"
            type="submit"
            block
            class="mt-3"
            :loading="loading"
            @click="submitForm"
          >
            Submit
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
// import moment from 'moment'
import { ref } from 'vue';
import db from '@/firebase'
import { defineEmits } from 'vue';
const title = ref()
const content = ref()
const due = ref()
const person = ref()
const status = ref()
const form = ref(null)
const loading = ref(false)
const dialog = ref(false)
const emit = defineEmits(['projectAdded']);
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
const  submitForm = async () => {

  const { valid } = await form.value.validate()
  if (valid) {
    loading.value = true;
    const project = {
      title : title.value,
      content: content.value,
      due: due.value,
      person: person.value,
      status: status.value
    }
    db.collection('projects').add(project).then(() => {
      loading.value = false
      dialog.value = false
      emit('projectAdded')
      console.log('added to db')
    })
  }
}
</script>

<style scoped></style>
