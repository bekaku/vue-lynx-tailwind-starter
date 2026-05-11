import cameraDark from '@/assets/icons/lucide/camera-dark.png';
import camera from '@/assets/icons/lucide/camera.png';
import houseDark from '@/assets/icons/lucide/house-dark.png';
import house from '@/assets/icons/lucide/house.png';


export const iconMap = {
    camera: camera,
    cameraDark: cameraDark,
    house: house,
    houseDark: houseDark,
} as const;
export type LucideIcon = keyof typeof iconMap;
export type BaseLucideIcon =
    'camera'
    | 'house'
    ;