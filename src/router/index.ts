import { createRouter, createMemoryHistory } from 'vue-router';
import Home from '../pages/index.vue';
import NotFound from '../pages/not-found.vue';
import UserList from '../pages/user-list.vue';
import UserDetail from '../pages/user-detail.vue';
import Store from '../pages/store.vue';
import Tailwind from '../pages/tailwind.vue';
import TabsRoute from '../pages/tabs/index-route.vue';
import TabsKeepalive from '../pages/tabs/index-keepalive.vue';
import TabsHome from '../pages/tabs/home.vue';
import TabsChat from '../pages/tabs/chat.vue';
import TabsSetting from '../pages/tabs/setting.vue';
import ComponentsItem from '../pages/item.vue';
import ComponentsButton from '../pages/button.vue';
import ComponentsCard from '../pages/card.vue';
import ComponentsInput from '../pages/input.vue';

import Grid from '../pages/grid.vue';
import NativeLocalStorage from '../pages/native-local-storage.vue';
import EventModifier from '../pages/event-modifier.vue';
import Icons from '../pages/icons.vue';
import Keepalive from '../pages/keepalive.vue';
import Image from '../pages/image.vue';
import Badge from '../pages/badge.vue';
import Alert from '../pages/alert.vue';
import ActionSheet from '../pages/action-sheet.vue';
import Dialog from '../pages/dialog.vue';
import ConfirmDialog from '../pages/confirm-dialog.vue';
import ImagePicker from '../pages/image-picker.vue';
import Popover from '../pages/popover.vue';
import ScrollView from '../pages/scroll-view.vue';
import List from '../pages/list.vue';
import ListColumn from '../pages/list-column.vue';
import ListWaterfall from '../pages/list-waterfall.vue';
import InifiniteLoadPage from '../pages/inifinite-load.vue';
import FetchDataFeed from '../pages/fetch-data/feed.vue';
import FetchDataFeedDetail from '../pages/fetch-data/feed-detail.vue';
import Loading from '../pages/loading.vue';
import Skeleton from '../pages/skeleton.vue';
import TestPage from '../pages/test/index.vue';
import PullToRefresh from '../pages/pull-to-refresh.vue';
import TextEllipsis from '../pages/text-ellipsis.vue';
import Transition from '../pages/transition.vue';
import ChatPage from '../pages/chat/index.vue';
import ChatConversation from '../pages/chat/conversation.vue';
import Echarts from '../pages/echarts.vue';

const router = createRouter({
    // Lynx has no window.location / window.navigator, so we must use
    // memory history (similar to React Router's MemoryRouter).
    history: createMemoryHistory(),
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', name: 'Home', component: Home, meta: { keepAlive: true } },
        { path: '/action-sheet', name: 'ActionSheet', component: ActionSheet },
        { path: '/alert', name: 'Alert', component: Alert },
        { path: '/button', name: 'ComponentsButton', component: ComponentsButton },
        { path: '/badge', name: 'Badge', component: Badge },
        {
            path: '/chat',
            children: [
                {
                    path: '',
                    name: 'ChatPage',
                    component: ChatPage,
                },
                {
                    path: 'conversation/:id',
                    name: 'ChatConversation',
                    component: ChatConversation,
                },
            ]
        },
        { path: '/card', name: 'ComponentsCard', component: ComponentsCard },
        { path: '/confirm-dialog', name: 'ConfirmDialog', component: ConfirmDialog },
        { path: '/dialog', name: 'Dialog', component: Dialog },
        { path: '/echarts', name: 'Echarts', component: Echarts },
        { path: '/event-modifier', name: 'EventModifier', component: EventModifier },
        {
            path: '/fetch-data',
            children: [
                {
                    path: '',
                    name: 'FetchDataFeed',
                    component: FetchDataFeed,
                    meta: {
                        keepAlive: true
                    }
                },
                { path: 'feed-detail/:id', name: 'FetchDataFeedDetail', component: FetchDataFeedDetail },
            ]
        },
        { path: '/grid', name: 'Grid', component: Grid },
        { path: '/input', name: 'ComponentsInput', component: ComponentsInput },
        { path: '/inifinite-load', name: 'InifiniteLoadPage', component: InifiniteLoadPage },
        { path: '/icons', name: 'Icons', component: Icons },
        { path: '/image', name: 'Image', component: Image },
        { path: '/image-picker', name: 'ImagePicker', component: ImagePicker },
        { path: '/item', name: 'ComponentsItem', component: ComponentsItem },
        { path: '/keepalive', name: 'Keepalive', component: Keepalive },
        { path: '/loading', name: 'Loading', component: Loading },
        { path: '/list', name: 'List', component: List },
        { path: '/list-column', name: 'ListColumn', component: ListColumn },
        { path: '/list-waterfall', name: 'ListWaterfall', component: ListWaterfall },
        { path: '/native-local-storage', name: 'NativeLocalStorage', component: NativeLocalStorage },
        { path: '/popover', name: 'Popover', component: Popover },
        { path: '/pull-to-refresh', name: 'PullToRefresh', component: PullToRefresh },
        { path: '/scroll-view', name: 'ScrollView', component: ScrollView },
        { path: '/skeleton', name: 'Skeleton', component: Skeleton },
        { path: '/store', name: 'store', component: Store },
        { path: '/tailwind', name: 'tailwind', component: Tailwind },
        { path: '/tabs-keepalive', name: 'TabsKeepalive', component: TabsKeepalive },
        {
            path: '/tabs-route',
            name: 'TabsRoute',
            component: TabsRoute,
            children: [
                {
                    path: '',
                    name: 'tabs-home',
                    component: TabsHome,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: 'chat',
                    name: 'tabs-chat',
                    component: TabsChat,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: 'settings',
                    name: 'tabs-settings',
                    component: TabsSetting,
                    meta: {
                        keepAlive: true
                    }
                },
            ]
        },
        { path: '/test', name: 'TestPage', component: TestPage },
        { path: '/text-ellipsis', name: 'TextEllipsis', component: TextEllipsis },
        { path: '/transition', name: 'Transition', component: Transition },
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