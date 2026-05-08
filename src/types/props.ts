import type { BaseLucideIcon } from "@/libs/lucideIcons"
import type { AppColor } from "./common"

export interface LucideIconProps {
    name: BaseLucideIcon;
    size?: number;
    class?: string;
    dark?: boolean;
    autoTheme?: boolean;
}
export interface RBACProps {
    permissions?: string[];
    condition?: 'any' | 'all' | 'not';
}

export interface AvatarProps {
    src: string
    shadow?: number
    top?: boolean
    fetchImage?: boolean
    rounded?: boolean
    round?: boolean
    square?: boolean
    size?: number
    ratio?: number
    imgBg?: string
    spinnerColor?: string
    bordered?: boolean
    borderedColor?: string
    borderedWidth?: string
    badge?: BadgeProps
}
export interface ButtonProps {
    color?: AppColor;
    clear?: boolean;
    disabled?: boolean;
    expand?: 'block' | 'full';
    full?: boolean;
    label?: string;
    href?: string;
    avatar?: AvatarProps;
    iconOnly?: boolean;
    round?: boolean;
    outline?: boolean;
    size?: 'default' | 'large' | 'small';
    strong?: boolean;
    type?: 'button' | 'reset' | 'submit';
    to?: string;
    rbac?: RBACProps;
}
export interface BadgeProps {
    color?: AppColor;
    floating?: boolean
    rounded?: boolean
    transparent?: boolean
    text?: string
    textColor?: AppColor
    cssClass?: string
    cssStyle?: {
        [key: string]: string | number
    }
}
export interface BackButtonProps {
    textClass?: string;
    defaultHref?: string;
}
export interface TollbarProps {
    class?: string;
    title?: string;
    showBackButton?: boolean;
    backButton?: BackButtonProps
}