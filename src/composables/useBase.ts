import { computed } from 'vue-lynx';
import { useRouter, useRoute } from 'vue-router';

export const useBase = () => {
  const router = useRouter();
  const route = useRoute();


  const isAndroid = SystemInfo.platform === 'Android';
  const isIos = SystemInfo.platform === 'iOS';
  const isWeb = SystemInfo.platform === 'web';
  const platform = SystemInfo.platform;

  const isPathActive = (path: string) => computed(() => route.path === path).value
  const getFullPath = () => {
    return route.fullPath;
  };
  const onNavigateTo = (path: string, replace: boolean = false) => {
    if (!replace) {
      router.push(path);
    } else if (route.path !== path) {
      router.replace(path)
    }

  };
  const onBack = () => {
    router.back();
  };

  return {
    onNavigateTo,
    onBack,
    getFullPath,
    isPathActive,
    platform,
    isAndroid,
    isIos,
    isWeb
  };
};
