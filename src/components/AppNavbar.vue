<template>
  <nav>
    <!-- snackbar when add project success -->
    <v-snackbar
      v-model="snackbar"
      :timeout="4000"
      location="top"
      color="success"
    >
      <span>Awesome ! You added a new project</span>
      <v-btn
        variant="text"
        color="white"
        size="small"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <!-- Toolbar -->

    <v-toolbar variant="flat">
      <v-app-bar-nav-icon
        class="text-grey"
        @click="drawer=!drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase text-grey">
        <span class="font-weight-light">Todo</span>
        <span></span>
      </v-toolbar-title>

      <!-- dropdown menu -->

      <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn class="text-grey" dark v-bind="props">
            <v-icon location="left" start>mdi-chevron-down</v-icon>
            Menu
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="{ path: `/${item.url}` }"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Logout button -->

      <v-btn variant="flat" color="grey-lighten-3">
        <span class="text-grey">Sign Out</span>
        <v-icon end="">mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- navigation drawer -->

    <v-navigation-drawer v-model="drawer" temporary class="bg-info">
      <v-row>
        <v-col class="mt-5 text-center">
          <v-avatar size="100">
            <img src="/avatar-1.png" alt="" />
          </v-avatar>
          <p class="text-white text-subtitle-2 mt-1">An Edric</p>
        </v-col>
        <v-col class="text-center">
          <AppPopup @projectAdded="snackbar = true"></AppPopup>
        </v-col>
      </v-row>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          :to="{ path: `/${item.url}` }"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import AppPopup from './AppPopup.vue';

export default {
  components: { AppPopup },
  data() {
        return {
            drawer: false,
            items: [
                { text: 'Dashboard', icon: 'mdi-view-dashboard', url: "" },
                { text: 'My Projects', icon: 'mdi-folder', url: "projects" },
                { text: 'Team', icon: 'mdi-account', url: "team" },
            ],
            snackbar: false,
        };
    }
}
</script>
<style scoped></style>
