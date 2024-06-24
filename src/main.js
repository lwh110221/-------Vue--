import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSearch, faChartBar, faFileAlt, faBox, faCog, faComments, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faSearch, faChartBar, faFileAlt, faBox, faCog, faComments, faUser)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router);
app.mount('#app')
