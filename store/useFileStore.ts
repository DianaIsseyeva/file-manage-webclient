import { create } from 'zustand';

/**
 * Interface for a preview entry.
 */
export interface Preview {
  file: File;
  previewUrl: string;
}

/**
 * State interface for file-related data.
 */
export interface FileState {
  // Flag indicating if a file upload is in progress.
  uploading: boolean;
  // Upload progress (0 to 100).
  uploadProgress: number;
  // List of previews for selected files before upload.
  previewImages: Preview[];
  // Error message, if any.
  error: string | null;
  // Authentication token (JWT).
  authToken: string | null;

  // Setter functions:
  setUploading: (value: boolean) => void;
  setUploadProgress: (progress: number | ((prev: number) => number)) => void;
  addPreviewImage: (preview: Preview) => void;
  clearPreviewImages: () => void;
  setError: (error: string | null) => void;
  setAuthToken: (token: string | null) => void;
}

export const useFileStore = create<FileState>(set => ({
  uploading: false,
  uploadProgress: 0,
  previewImages: [],
  error: null,
  authToken: null,
  setUploading: (value: boolean) => set({ uploading: value }),
  setUploadProgress: (progress: number | ((prev: number) => number)) =>
    set(state => ({
      uploadProgress: typeof progress === 'function' ? progress(state.uploadProgress) : progress,
    })),
  addPreviewImage: (preview: Preview) =>
    set(state => ({ previewImages: [...state.previewImages, preview] })),
  clearPreviewImages: () => set({ previewImages: [] }),
  setError: (error: string | null) => set({ error }),
  setAuthToken: (token: string | null) => set({ authToken: token }),
}));
