import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useChatStore = defineStore('chatStore', () => {
    const messageIdFocus = ref<number | string>();
    return {
        messageIdFocus
    }
});