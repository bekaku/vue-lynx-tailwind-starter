import { reactive } from 'vue'

const toastState = reactive({
    isOpen: false,
    message: '',
    position: 'bottom' as 'top' | 'middle' | 'bottom',
    duration: 3000,
    actionText: ''
})

export const useToast = () => {
    const show = (options: {
        message: string,
        position?: 'top' | 'middle' | 'bottom',
        duration?: number,
        actionText?: string
    }) => {
        toastState.message = options.message
        toastState.position = options.position || 'bottom'
        toastState.duration = options.duration ?? 3000
        toastState.actionText = options.actionText || ''

        toastState.isOpen = true
    }

    const hide = () => {
        toastState.isOpen = false
    }

    return {
        state: toastState,
        show,
        hide
    }
}