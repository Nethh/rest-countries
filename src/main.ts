import { createApp } from 'vue'
import './style.css'
import router from '~/router'
// @ts-ignore
import App from '~/App.vue'

const app = createApp(App).use(router)

router.isReady().then(() => app.mount('#app'))
