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
import arrowLeft from '@/assets/icons/lucide/arrow-left.png';
import arrowLeftDark from '@/assets/icons/lucide/arrow-left-dark.png';
import user from '@/assets/icons/lucide/user.png';
import userDark from '@/assets/icons/lucide/user-dark.png';
import image from '@/assets/icons/lucide/image.png';
import imageDark from '@/assets/icons/lucide/image-dark.png';
import camera from '@/assets/icons/lucide/camera.png';
import cameraDark from '@/assets/icons/lucide/camera-dark.png';
import ellipsisVertical from '@/assets/icons/lucide/ellipsis-vertical.png';
import ellipsisVerticalDark from '@/assets/icons/lucide/ellipsis-vertical-dark.png';
import heart from '@/assets/icons/lucide/heart.png';
import heartDark from '@/assets/icons/lucide/heart-dark.png';

import chevronDown from '@/assets/icons/lucide/chevron-down.png';
import chevronDownDark from '@/assets/icons/lucide/chevron-down-dark.png';
import chevronUp from '@/assets/icons/lucide/chevron-up.png';
import chevronUpDark from '@/assets/icons/lucide/chevron-up-dark.png';


export const iconMap = {
    camera: camera,
    cameraDark: cameraDark,
    chevronDown:chevronDown,
    chevronDownDark:chevronDownDark,
    chevronUp:chevronUp,
    chevronUpDark:chevronUpDark,
    chevronLeft: chevronLeft,
    chevronLeftDark: chevronLeftDark,
    chevronRight: chevronRight,
    chevronRightDark: chevronRightDark,
    ellipsisVertical: ellipsisVertical,
    ellipsisVerticalDark: ellipsisVerticalDark,
    heart: heart,
    heartDark: heartDark,
    house: house,
    houseDark: houseDark,
    houseBlue: houseBlue,
    image: image,
    imageDark: imageDark,
    messageCircle: messageCircle,
    messageCircleDark: messageCircleDark,
    messageCircleBlue: messageCircleBlue,
    arrowLeft: arrowLeft,
    arrowLeftDark: arrowLeftDark,
    sunMoon: sunMoon,
    sunMoonDark: sunMoonDark,
    settings: settings,
    settingsDark: settingsDark,
    settingsBlue: settingsBlue,
    trash: trash,
    trashDark: trashDark,
    user: user,
    userDark: userDark,
    x: x,
    xDark: xDark,
} as const;
export type LucideIcon = keyof typeof iconMap;
export type BaseLucideIcon =
    'arrowLeft'
    | 'camera'
    |'chevronDown'
    |'chevronUp'
    | 'chevronLeft'
    | 'chevronRight'
    | 'ellipsisVertical'
    | 'heart'
    | 'house'
    | 'image'
    | 'messageCircle'
    | 'sunMoon'
    | 'settings'
    | 'trash'
    | 'user'
    | 'x';