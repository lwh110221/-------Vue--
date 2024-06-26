import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faBox, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faBox, faUser)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router);
app.mount('#app')
