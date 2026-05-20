/* eslint-disable @typescript-eslint/no-explicit-any */
 
import type { AppLocale, ILocales } from "@/types/common";
import { computed, type ComputedRef } from "vue";
import { useI18n } from "vue-i18n";
import { useStorage } from "./useStorage";

export const availableLocales: ILocales[] = [
    {
        name: 'English',
        iso: 'en',
        flag: '🇺🇸'
    },
    {
        name: 'ไทย',
        iso: 'th',
        flag: 'TH'
    }
];

type I18nReturn = ReturnType<typeof useI18n>;

// 🌟 2. สร้าง Interface ประกาศว่า useLang จะคืนค่าอะไรบ้าง
export interface UseLangReturn {
    t: I18nReturn['t'];
    locale: any;
    currenLocaleItem: ComputedRef<ILocales | undefined>;
    onInitLang: () => Promise<void>;
    setLocale: (lang: AppLocale) => Promise<unknown>;
}

export const useLang = (): UseLangReturn => {
    const langAtt = 'lang';
    const { t, locale } = useI18n({ useScope: 'global' });
    const { setItem, getItem } = useStorage();
    const currenLocaleItem = computed(() =>
        availableLocales.find(t => t.iso == locale.value),
    );
    const setLocale = async (lang: AppLocale) => {
        setItem(langAtt, lang);
        locale.value = lang;
        return new Promise((resolve) => {
            resolve(true);
        });
    };
    const onInitLang = async () => {
        const lang = await getItem(langAtt);
        if (lang) {
            await setLocale(lang as AppLocale);
        } else {
            await setLocale('en');
        }
    };
    return {
        t,
        locale,
        currenLocaleItem,
        onInitLang,
        setLocale
    };
};