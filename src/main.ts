import { createApp } from 'vue'

import "@/assets/tailwind.css";
import "@/assets/style/main.css";
import "element-plus/theme-chalk/index.css";

// @ts-ignore
import App from '~/App.vue'
import router from '~/router'

const app = createApp(App).use(router);

router.isReady().then(() => app.mount('#app'))
