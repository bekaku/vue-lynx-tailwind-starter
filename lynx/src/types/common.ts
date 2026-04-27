import type { AvatarProps, IconProps, RBACProps } from "./props";
export type AppColor = 'primary' | 'secondary' | 'destructive' | 'success' | 'muted' | 'border' | 'ring' | 'background' | 'foreground' | 'card';
export type ThemeName = 'dark' | 'light';
export type IconSetType =
  | 'bootstrap-icons'
  | 'line-awesome'
  | 'ion'
  | 'material-icons'
  | 'mdi';
export interface LabelValue<Type> {
  label?: string;
  description?: string;
  avatar?: AvatarProps;
  icon?: IconProps;
  iconSet?: IconSetType
  iconSize?: number;
  iconColor?: string;
  fetch?: boolean;
  value?: Type;
  border?: boolean;
  to?: string;
  translateLabel?: boolean;
  translateDescription?: boolean;
  params?: string[];
  queries?: string[];
  rbac?: RBACProps;
  noActiveLink?: boolean;
  button?: boolean;
  disable?: boolean;
  children?: LabelValue<Type>[];
}