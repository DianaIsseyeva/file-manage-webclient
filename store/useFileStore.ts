// src/store/useFileStore.ts

import { create } from 'zustand';

export interface FileState {
  // Indicates whether a file upload is in progress.
  uploading: boolean;
  // Upload progress in percentage (0 to 100).
  uploadProgress: number;
  // List of Data URLs for file previews before upload.
  previewUrls: string[];
  // Error message if an error occurs.
  error: string | null;
  // JWT token for authentication.
  authToken: string | null;
  // Setter functions:
  setUploading: (value: boolean) => void;
  setUploadProgress: (progress: number) => void;
  setPreviewUrls: (urls: string[]) => void;
  setError: (error: string | null) => void;
  setAuthToken: (token: string | null) => void;
}

export const useFileStore = create<FileState>(set => ({
  uploading: false,
  uploadProgress: 0,
  previewUrls: [],
  error: null,
  authToken: null,
  setUploading: (value: boolean) => set({ uploading: value }),
  setUploadProgress: (progress: number) => set({ uploadProgress: progress }),
  setPreviewUrls: (urls: string[]) => set({ previewUrls: urls }),
  setError: (error: string | null) => set({ error }),
  setAuthToken: (token: string | null) => set({ authToken: token }),
}));
