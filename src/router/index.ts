import { createRouter, createMemoryHistory } from 'vue-router';
import Home from '../pages/index.vue';
import About from '../pages/about.vue';
import UserList from '../pages/user-list.vue';
import UserDetail from '../pages/user-detail.vue';
import Store from '../pages/store.vue';
import Tailwind from '../pages/tailwind.vue';
import TabsRoute from '../pages/tabs/index-route.vue';
import TabsKeepalive from '../pages/tabs/index-keepalive.vue';
import TabsHome from '../pages/tabs/home.vue';
import TabsChat from '../pages/tabs/chat.vue';
import ComponentsListItem from '../pages/components/list-item.vue';
import ComponentsButton from '../pages/components/button.vue';
import ComponentsCard from '../pages/components/card.vue';
import ComponentsInput from '../pages/components/input.vue';
import NotFound from '../pages/not-found.vue';
import Grid from '../pages/grid.vue';
import NativeLocalStorage from '../pages/native-local-storage.vue';
import EventModifier from '../pages/event-modifier.vue';
import Icons from '../pages/icons.vue';
import Keepalive from '../pages/keepalive.vue';

const router = createRouter({
    // Lynx has no window.location / window.navigator, so we must use
    // memory history (similar to React Router's MemoryRouter).
    history: createMemoryHistory(),
    routes: [
        { path: '/', redirect: '/keepalive' },
        { path: '/home', name: 'Home', component: Home },
        { path: '/about', name: 'about', component: About },
        { path: '/components/list-item', name: 'ComponentsListItem', component: ComponentsListItem },
        { path: '/components/button', name: 'ComponentsButton', component: ComponentsButton },
        { path: '/components/card', name: 'ComponentsCard', component: ComponentsCard },
        { path: '/components/input', name: 'ComponentsInput', component: ComponentsInput },
        { path: '/event-modifier', name: 'EventModifier', component: EventModifier },
        { path: '/icons', name: 'Icons', component: Icons },
        { path: '/grid', name: 'Grid', component: Grid },
        { path: '/keepalive', name: 'Keepalive', component: Keepalive },
        { path: '/native-local-storage', name: 'NativeLocalStorage', component: NativeLocalStorage },
        {
            path: '/tabs-route',
            name: 'TabsRoute',
            component: TabsRoute,
            children: [
                {
                    path: '',
                    name: 'tabs-home',
                    component: TabsHome
                },
                {
                    path: 'chat',
                    name: 'tabs-chat',
                    component: TabsChat
                },
            ]
        },
        { path: '/store', name: 'store', component: Store },
        { path: '/tailwind', name: 'tailwind', component: Tailwind },
        { path: '/tabs-keepalive', name: 'TabsKeepalive', component: TabsKeepalive },
        { path: '/user-list', name: 'user-list', component: UserList },
        { path: '/users-detail/:id', name: 'user-detail', component: UserDetail },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound
        },
    ],
});

export default router;