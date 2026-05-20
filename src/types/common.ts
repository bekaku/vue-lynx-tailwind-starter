/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AvatarProps, IconProps, LucideIconProps, RBACProps } from "./props";
export type AppLocale = 'th' | 'en';
export type AppColor = 'primary' | 'secondary' | 'destructive' | 'success' | 'muted' | 'border' | 'ring' | 'background' | 'foreground' | 'card';
export type ChatHistoryTab = 'ALL' | 'GROUP' | 'FAVORITE';
export type ChatSettingType =
  | 'NOTIFICATION'
  | 'PIN'
  | 'FAVORITE'
  | 'LEAVE'
  | 'UPDATE_READ_ALL'
  | 'CLEAR_NEW_MESSAGE_NUMBER'
  | 'CLEAR_NEW_MESSAGE_NUMBER_ONLY'
  | 'UPDATE_DATA';
export type ChatType = 'PERSONAL' | 'GROUP';
export type ChatMessageType = 'MEDIA' | 'TEXT' | 'IMAGE' | 'FILE' | 'INVITE' | 'LEAVE' | 'LOCATION';
export type EmojiType = 'LIKE' | 'FIGHTING' | 'LAUGH' | 'WOW' | 'CARE' | 'SAD';
export type FileMimeType = 'IMAGE' | 'VIDEO' | 'FILE' | 'DIRECTORY';
export type IconSetType =
  | 'svg'
  | 'quasar-bootstrap-icons'
  | 'quasar-line-awesome'
  | 'quasar-mdi';
export type ThemeName = 'dark' | 'light';
export type UploadStatus = 'UPLOADING' | 'COMPLETED' | 'FAILED';


export interface ApiListResponse {
  totalPages: number
  totalElements: number
  last: boolean
}
export interface ApiResponse<Type> extends ApiListResponse {
  dataList: Type[]
}
export interface DirectoryPath extends Id {
  current?: boolean;
  root?: boolean;
  name: string;
  fileSize?: number;
}

export interface EmojiCountDto {
  total: number
  emojiType: EmojiType
}
export interface FileManagerMetaData extends Id {
  duration?: number | null;
  title?: string | null;
  description?: string | null;
  thumbnailFileId?: number | string | null;
  thumbnailFile?: any
  width?: number
  height?: number
  view?: number
  hidden?: boolean
}
export interface FileManager extends FileManagerMetaData {
  fileMime: string;
  fileName: string;
  filePath: string;
  fileThumbnailPath: string;
  fileSize: string;
  fileSizeNo?: number;
  fileCount?: number;
  functionId?: number;
  createdDate?: string;
  updatedDate?: string;
  file?: any;
  fileMimeType?: FileMimeType
  videoSources?: VideoSrc[]
  videoTracks?: VideoTrack[]
  deleteFlag?: boolean | undefined
  uploadProgress?: {
    uploading: boolean;
    progress: number;
    status: UploadStatus;
    uploadData?: FileManager | null
  };
}
export interface FileUploadChunkResponse {
  filename?: string | null;
  fileMime?: string | null;
  status?: boolean;
  lastChunk?: boolean;
}
export interface FilesDirectory extends Id {
  active?: boolean;
  filesDirectoryParentId?: number;
  name: string;
  paths?: DirectoryPath[];
}

export interface FileUploadChunkMergeRequest extends FileManagerMetaData {
  totalChunks: number;
  fileMime: string | null;
  originalFilename?: string;
  chunkFilename: string;
  resizeImage: boolean;
  fileDirectoryId?: number | null;
}
export interface FileManagerMetaData extends Id {
  duration?: number | null;
  title?: string | null;
  description?: string | null;
  thumbnailFileId?: number | string | null;
  thumbnailFile?: any;
  width?: number;
  height?: number;
  view?: number;
  hidden?: boolean;
}
export interface GroupChatMemberDto extends Id {
  favorite: boolean
  muteNotify: boolean
  pin: boolean
  online?: boolean
  joinDate: string
  offDate?: string
  member: UserDto
}
export interface GroupChatDto extends Id {
  dtoAvatar?: ImageDto | null
  chatType: ChatType
  groupName?: string | null
  latestMessage?: string | null
  latestUpdate?: string | null
  latestMessageType?: ChatMessageType | null
  totalNewMessage: number
  totalMembers?: number
  pin: boolean
  favorite: boolean
  muteNotify: boolean
  online: boolean
  memberItems?: GroupChatMemberDto[]
  totalImages?: number
  totalFile?: number
}
export interface GroupChatFileDto extends Id {
  fileManager: FileManager | null | undefined
}
export interface GroupChatMsgDto extends Id {
  groupId?: number | undefined
  chatMsg?: string | undefined | null
  msgDateTime: string
  readCount: number
  unsend?: boolean | undefined
  sent: boolean
  sendUser?: UserDto | undefined
  files?: GroupChatFileDto[] | undefined | null
  liked?: boolean | undefined
  onlyLabel?: boolean | undefined
  emojiType?: EmojiType | null | undefined
  reactionEngage?: EmojiCountDto[] | undefined
  dtoReplyTo?: GroupChatMsgDto | null | undefined
  chatMessageType?: ChatMessageType | undefined
}
export interface Id {
  id?: number | string | null;
}
export interface ImageDto {
  index?: number;
  id?: number;
  image: string;
  thumbnail: string;
}

export interface ILocales {
  name: string
  iso: AppLocale
  flag: string
}
export interface LabelValue<Type> {
  label?: string;
  description?: string;
  avatar?: AvatarProps;
  lucideIcon?: LucideIconProps;
  icon?: IconProps;
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

export interface OgMeta {
  domain: string
  url: string
  title?: string
  desc?: string
  image?: string
  imageAlt?: string
}
export interface UserDto extends Id {
  email: string
  username?: string | null
  token?: string | null
  avatar?: ImageDto | null
  cover?: ImageDto | null
  active: boolean
  name?: string
}
export interface VideoSrc {
  src?: string
  type?: string
  size?: number
}
export interface VideoTrack {
  kind?: string
  label?: string
  srclang?: string
  src?: string
  default?: boolean
}

