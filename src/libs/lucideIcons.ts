import house from '@/assets/icons/lucide/house.png';
import houseDark from '@/assets/icons/lucide/house-dark.png';
import settings from '@/assets/icons/lucide/settings.png';
import settingsDark from '@/assets/icons/lucide/settings-dark.png';
import sunMoon from '@/assets/icons/lucide/sun-moon.png';
import sunMoonDark from '@/assets/icons/lucide/sun-moon-dark.png';
import chevronRight from '@/assets/icons/lucide/chevron-right.png';
import chevronRightDark from '@/assets/icons/lucide/chevron-right-dark.png';
import messageCircle from '@/assets/icons/lucide/message-circle.png';
import messageCircleDark from '@/assets/icons/lucide/message-circle-dark.png';

export const iconMap = {
    house: house,
    houseDark: houseDark,
    sunMoon: sunMoon,
    sunMoonDark: sunMoonDark,
    settings: settings,
    settingsDark: settingsDark,
    chevronRight: chevronRight,
    chevronRightDark: chevronRightDark,
    messageCircle: messageCircle,
    messageCircleDark: messageCircleDark,
} as const;
export type LucideIcon = keyof typeof iconMap;
export type BaseLucideIcon = 'house' | 'sunMoon' | 'settings' | 'chevronRight' |'messageCircle';