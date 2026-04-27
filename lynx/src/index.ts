import { createApp } from 'vue-lynx'
import { createPinia } from 'pinia';
import router from './router'
import App from './App.vue'
import './App.css'
const app = createApp(App)
app.use(createPinia());
app.use(router);
// createMemoryHistory doesn't trigger initial navigation automatically,
// so we must push the initial route before mounting.
router.push('/');
app.mount()
