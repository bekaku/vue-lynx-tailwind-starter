/* eslint-disable @typescript-eslint/no-explicit-any */
import { onMounted, ref } from 'vue'
import { useDevice } from './useDevice'



export function useSafeArea() {
    const { isNativeAvailable, isIos, isAndroid } = useDevice()
    const top = ref(isAndroid ? 40 : isIos ? 47 : 0)
    const bottom = ref(isAndroid ? 24 : isIos ? 34 : 0)
    const left = ref(0)
    const right = ref(0)

    const safeAreaTop = ref<string | number>()
    const safeAreaBottom = ref<string | number>()
    const loadSafeArea = async () => {
        try {

            if (isNativeAvailable) {
                NativeModules.DeviceInfoModule.getStatusBarHeight((value: string | number) => {
                    safeAreaTop.value= value
                });
                NativeModules.DeviceInfoModule.getSafeAreaBottom((value: string | number) => {
                    safeAreaBottom.value= value
                });
            }

            if (lynx.__globalProps.safeAreaInsets) {
                console.log('useSafeArea', lynx.__globalProps.safeAreaInsets)
                const { top: topValue, bottom: bottomValue } = lynx.__globalProps.safeAreaInsets;
                top.value = topValue || 40
                bottom.value = bottomValue || 24
            }

        } catch (e: any) {
            console.warn('useSafeArea', e)
            top.value = 40
            bottom.value = 24
        }
    }

    onMounted(loadSafeArea)

    return {
        top,
        bottom,
        left,
        right,
        safeAreaTop,
        safeAreaBottom
    }
}