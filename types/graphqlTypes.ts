export interface FileMetadata {
  _id: string;
  filename: string;
  url: string;
  mimetype: string;
  size: number;
  uploadedAt?: string;
}

export interface GetFilesData {
  getFiles: FileMetadata[];
}
