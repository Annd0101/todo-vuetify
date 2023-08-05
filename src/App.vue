<template>
  <v-app class="bg-grey-lighten-3">
    <AppNavbar></AppNavbar>
    <v-main class="mx-6">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
export default {
  name: 'App',
  components: {
    AppNavbar
  },
  data: () => ({
    //
  }),
}
</script>
