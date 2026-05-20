import { createApp } from 'vue-lynx'
import { createPinia } from 'pinia';
import router from './router'
import App from './App.vue'
import './App.css'
import { VueQueryPlugin } from '@tanstack/vue-query';
import { i18n } from './plugins/i18n'
const app = createApp(App)
app.use(createPinia());
app.use(VueQueryPlugin);
app.use(router);
app.use(i18n);
// createMemoryHistory doesn't trigger initial navigation automatically,
// so we must push the initial route before mounting.
router.push('/');
app.mount()
