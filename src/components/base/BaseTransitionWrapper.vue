<script setup lang="ts">
const {
  name = 'fade',
  appear = true,
  duration = 500,
  mode = 'default',
  transitionTime = '0.3s',
} = defineProps<{
  name?:
    | 'fade'
    | 'slide-left'
    | 'slide-right'
    | 'slide-up'
    | 'slide-down'
    | 'zoom'
    | 'bounce';
  mode?: 'in-out' | 'out-in' | 'default';
  appear?: boolean;
  duration?: number;
  transitionTime?: string;
}>();
const emit = defineEmits<{
  'on-enter': [e: any];
  'on-leave': [e: any];
}>();
const onEnter = (e: any) => {
  emit('on-enter', e);
};
const onLeave = (e: any) => {
  emit('on-leave', e);
};
</script>
<template>
  <Transition
    :name="name"
    :mode="mode"
    :appear="appear"
    :duration="duration"
    :appear-from-class="`${name}-enter-from`"
    :appear-active-class="`${name}-enter-active`"
    :appear-to-class="`${name}-enter-to`"
    :enter-from-class="`${name}-enter-from`"
    :enter-active-class="`${name}-enter-active`"
    :enter-to-class="`${name}-enter-to`"
    :leave-from-class="`${name}-leave-from`"
    :leave-active-class="`${name}-leave-active`"
    :leave-to-class="`${name}-leave-to`"
    v-bind="$attrs"
    @enter="onEnter"
    @leave="onLeave"
  >
    <slot />
  </Transition>
</template>
<style scoped lang="css">
/* Native engines require EXPLICIT start and end states.
  Always define both '-enter-from' / '-leave-to' (invisible states)
  AND '-enter-to' / '-leave-from' (visible default states).
*/

/* --- Fade Transition --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* --- Slide Left Transition --- */
.slide-left-enter-active,
.slide-left-leave-active {
  transition:
    transform 300ms ease,
    opacity 300ms ease;
}
.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0; /* Fixed: Added missing opacity */
}
.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0; /* Fixed: Added missing opacity */
}

/* --- Slide Right Transition --- */
.slide-right-enter-active,
.slide-right-leave-active {
  transition:
    transform 300ms ease,
    opacity 300ms ease;
}
.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-enter-to,
.slide-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* .slide-right-enter-active {
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}
.slide-right-leave-active {
  transition: opacity 500ms cubic-bezier(1, 0.5, 0.8, 1), transform 500ms cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-right-enter-from, .slide-right-leave-to {
  transform: translateX(20px);
  opacity: 0;
} */

/* --- Slide Up Transition --- */
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 300ms ease,
    opacity 300ms ease;
}
.slide-up-enter-from {
  transform: translateY(20px);
  opacity: 0;
}
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* --- Slide Down Transition --- */
.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    transform 300ms ease,
    opacity 300ms ease;
}
.slide-down-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-down-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* --- Zoom Transition --- */
.zoom-enter-active,
.zoom-leave-active {
  transition:
    transform 300ms ease,
    opacity 300ms ease;
}
.zoom-enter-from,
.zoom-leave-to {
  transform: scale(0.5);
  opacity: 0; /* Added opacity for a smoother native feel */
}
.zoom-enter-to,
.zoom-leave-from {
  transform: scale(1);
  opacity: 1;
}

/* --- Bounce Transition --- */
.bounce-enter-active {
  animation: bounce-in 300ms forwards; /* Added 'forwards' for native stability */
}
.bounce-leave-active {
  animation: bounce-in 300ms reverse forwards;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
