// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// Vuetify
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { VuetifyDateAdapter } from 'vuetify/labs/date/adapters/vuetify'
export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      primary: '#96521ff',
      success: '#3cd1c2',
      info: '#ffaa2c',
      error: '#f83e70'
    },
    date: {
      adapter: VuetifyDateAdapter,
    }
  }
)
