/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AvatarProps, LucideIconProps, RBACProps } from "./props";
export type AppColor = 'primary' | 'secondary' | 'destructive' | 'success' | 'muted' | 'border' | 'ring' | 'background' | 'foreground' | 'card';
export type ThemeName = 'dark' | 'light';
export type FileMimeType = 'IMAGE' | 'VIDEO' | 'FILE' | 'DIRECTORY';
export type UploadStatus = 'UPLOADING' | 'COMPLETED' | 'FAILED';
export interface Id {
  id?: number | string | null;
}
export interface LabelValue<Type> {
  label?: string;
  description?: string;
  avatar?: AvatarProps;
  lucideIcon?: LucideIconProps;
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
export interface DirectoryPath extends Id {
  current?: boolean;
  root?: boolean;
  name: string;
  fileSize?: number;
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
export interface ImageDto {
  index?: number;
  id?: number;
  image: string;
  thumbnail: string;
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