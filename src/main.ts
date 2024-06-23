import { createApp } from 'vue'

import "@/assets/tailwind.css";
import "@/assets/style/main.css";
import "element-plus/theme-chalk/index.css";
import * as ElementPlusIcon from "@element-plus/icons-vue"
import { createPinia } from 'pinia'

// @ts-ignore
import App from '~/App.vue'
import router from '~/router'

const app = createApp(App)
	.use(router)
	.use(createPinia());

for (const [key, component] of Object.entries(ElementPlusIcon)) {
	app.component(key, component)
}
router.isReady().then(() => app.mount('#app'))
