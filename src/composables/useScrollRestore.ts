import { reactive, ref, onMounted } from 'vue-lynx'
import { useRoute } from 'vue-router'

const scrollStore = reactive<Record<string, number>>({})

export function useScrollRestore() {
    const route = useRoute()
    const scrollTop = ref(0)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onScroll = (e: any) => {
        // const top = e?.detail?.scrollTop ?? 0
        // scrollTop.value = top
        // scrollStore[route.path] = top
        scrollStore[route.path] = e.detail?.scrollTop ?? 0
    }

    onMounted(() => {
        scrollTop.value = scrollStore[route.path] ?? 0
    })

    return {
        scrollTop,
        onScroll
    }
}