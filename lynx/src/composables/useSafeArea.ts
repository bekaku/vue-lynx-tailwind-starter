/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, onMounted } from 'vue-lynx'

const top = ref(0)
const bottom = ref(0)
const left = ref(0)
const right = ref(0)

export function useSafeArea() {

    const loadSafeArea = () => {
        try {
            const info = (globalThis as any)?.lynx?.getSystemInfo?.()

            if (info?.safeAreaInsets) {
                top.value = info.safeAreaInsets.top || 0
                bottom.value = info.safeAreaInsets.bottom || 0
                left.value = info.safeAreaInsets.left || 0
                right.value = info.safeAreaInsets.right || 0
            } else {
                // fallback สำหรับ simulator
                bottom.value = 34
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e: any) {
            bottom.value = 34
        }
    }

    onMounted(loadSafeArea)

    return {
        top,
        bottom,
        left,
        right
    }
}