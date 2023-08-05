<template>
  <div class="team">
    <h1 class="text-subtitle-1 text-grey">This is teams</h1>
    <v-container class="my-5">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="person in team"
          :key="person.name"
        >
          <v-card variant="flat" class="text-center">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="text-grey-lighten-2">
                <img :src="person.avatar" alt="" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="text-subtitle-1">{{ person.name }}</div>
              <div class="text-grey">{{ person.role }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                variant="flat"
                color="white"
                class="text-body-2 text-grey ml-3"
              >
                <v-icon start>mdi-message</v-icon>
                <span class="mb-1">Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      team: [
      { name: 'An Edric', role: 'Web developer', avatar: '/avatar-1.png' },
        { name: 'Ryu', role: 'Graphic designer', avatar: '/avatar-2.png' },
        { name: 'Chun Li', role: 'Web developer', avatar: '/avatar-3.png' },
        { name: 'Gouken', role: 'Social media maverick', avatar: '/avatar-4.png' },
        { name: 'Yoshi', role: 'Sales guru', avatar: '/avatar-5.png'}
      ]
    }
  }
}
</script>
