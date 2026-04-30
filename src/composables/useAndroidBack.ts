/* eslint-disable @typescript-eslint/no-explicit-any */

import { onMounted, onUnmounted } from 'vue-lynx'
import { useRoute, useRouter } from 'vue-router'
declare const lynx: any;
export function useAndroidBack() {

    const route = useRoute();
    const router = useRouter()

    const handleBackPress = () => {
        console.log('useAndroidBack > handleBack, current path:', route.path);
        const rootPages = ['/', '/home', '/tabs', '/tabs/home', '/tabs/chat'];

        if (rootPages.includes(route.path)) {
            console.log('At root page, exiting app...');
            try {
                if (typeof NativeModules !== 'undefined' && NativeModules.AppModule) {
                    NativeModules?.AppModule.exitApp();
                } else {
                    console.warn('AppModule is not available in NativeModules');
                }
            } catch (error) {
                console.warn('Failed to exit app:', error);
            }
        } else {
            console.log('In sub-page, going back...');
            router.back();
        }

    }

    onMounted(() => {
        try {
            if (typeof lynx !== 'undefined') {
                const eventEmitter = lynx.getJSModule('GlobalEventEmitter');
                if (eventEmitter && eventEmitter.addListener) {
                    eventEmitter.addListener('onHardwareBackPress', handleBackPress);
                }
            }
        } catch (error) {
            console.warn('Failed to listen to Android back button:', error);
        }
    });

    onUnmounted(() => {
        try {
            if (typeof lynx !== 'undefined') {
                const eventEmitter = lynx.getJSModule('GlobalEventEmitter');
                if (eventEmitter && eventEmitter.removeListener) {
                    eventEmitter.removeListener('onHardwareBackPress', handleBackPress);
                }
            }
        } catch (error) {
            console.warn('Failed to remove Android back button listener:', error);
        }
    });

}