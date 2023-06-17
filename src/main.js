import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
import velocity from 'velocity-animate'
import './assets/main.css'
import store from './store'
import VueAwesomePaginate from "vue-awesome-paginate";
const app = createApp(App)
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'element-plus/dist/index.css'
app.config.productionTip = false;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(Notifications, { velocity })
app.use(VueAwesomePaginate)
app.mount('#app')
