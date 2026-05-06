import house from '@/assets/icons/lucide/house.png';
import houseDark from '@/assets/icons/lucide/house-dark.png';
import houseBlue from '@/assets/icons/lucide/house-blue.png';
import settings from '@/assets/icons/lucide/settings.png';
import settingsDark from '@/assets/icons/lucide/settings-dark.png';
import settingsBlue from '@/assets/icons/lucide/settings-blue.png';
import sunMoon from '@/assets/icons/lucide/sun-moon.png';
import sunMoonDark from '@/assets/icons/lucide/sun-moon-dark.png';
import chevronRight from '@/assets/icons/lucide/chevron-right.png';
import chevronRightDark from '@/assets/icons/lucide/chevron-right-dark.png';
import messageCircle from '@/assets/icons/lucide/message-circle.png';
import messageCircleDark from '@/assets/icons/lucide/message-circle-dark.png';
import messageCircleBlue from '@/assets/icons/lucide/message-circle-blue.png';
import trash from '@/assets/icons/lucide/trash.png';
import trashDark from '@/assets/icons/lucide/trash-dark.png';
import x from '@/assets/icons/lucide/x.png';
import xDark from '@/assets/icons/lucide/x-dark.png';
import chevronLeft from '@/assets/icons/lucide/chevron-left.png';
import chevronLeftDark from '@/assets/icons/lucide/chevron-left-dark.png';
import moveLeft from '@/assets/icons/lucide/move-left.png';
import moveLeftDark from '@/assets/icons/lucide/move-left-dark.png';

export const iconMap = {
    chevronLeft: chevronLeft,
    chevronLeftDark: chevronLeftDark,
    chevronRight: chevronRight,
    chevronRightDark: chevronRightDark,
    house: house,
    houseDark: houseDark,
    houseBlue: houseBlue,
    messageCircle: messageCircle,
    messageCircleDark: messageCircleDark,
    messageCircleBlue: messageCircleBlue,
    moveLeft: moveLeft,
    moveLeftDark: moveLeftDark,
    sunMoon: sunMoon,
    sunMoonDark: sunMoonDark,
    settings: settings,
    settingsDark: settingsDark,
    settingsBlue: settingsBlue,
    trash: trash,
    trashDark: trashDark,
    x: x,
    xDark: xDark,
} as const;
export type LucideIcon = keyof typeof iconMap;
export type BaseLucideIcon =
    'chevronLeft'
    | 'chevronRight'
    | 'house'
    | 'messageCircle'
    | 'moveLeft'
    | 'sunMoon'
    | 'settings'
    | 'trash'
    | 'x';