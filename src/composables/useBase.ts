/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDevice } from './useDevice';

export const useBase = () => {
  const router = useRouter();
  const route = useRoute();

  const { isNativeAvailable } = useDevice()



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
  const getParam = (field: string): any => {
    if (!field) {
      return;
    }
    return route.params ? route.params[field] : null;
  };
  const getQuery = (field: string): any => {
    if (!field) {
      return;
    }
    return route.query ? route.query[field] : null;
  };

  const getParamNumber = (att: string): number => {
    const val = getParam(att);
    return val != undefined ? +val : 0;
  };
  const getQueryNumber = (att: string): number => {
    const val = getQuery(att);
    return val != undefined ? +val : 0;
  };

  const openExternalUri = (uri: string) => {
    if (!isNativeAvailable || !uri) {
      return;
    }
    NativeModules.AppModule.openUrl(uri);
  }
  return {
    onNavigateTo,
    onBack,
    getFullPath,
    isPathActive,
    getParam,
    getParamNumber,
    getQuery,
    getQueryNumber,
    openExternalUri
  };
};
