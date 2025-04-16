'use client';

import { GetFilesData } from '@/types/graphqlTypes';
import { gql, useMutation } from '@apollo/client';
import { Button, message, Progress } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { useFileStore } from '../store/useFileStore';
import FilePreviewList from './FilePreviewList';

// GraphQL query for fetching files (for cache update)
const GET_FILES = gql`
  query GetFiles {
    getFiles {
      _id
      filename
      url
      mimetype
      size
      uploadedAt
    }
  }
`;

// GraphQL mutation for uploading a file
const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      _id
      filename
      url
      mimetype
      size
      uploadedAt
    }
  }
`;

const FileUploadWithPreview: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const {
    previewImages,
    addPreviewImage,
    // clearPreviewImages,
    setUploading,
    setUploadProgress,
    uploading,
    uploadProgress,
  } = useFileStore();
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    update(cache, { data }) {
      const existing = cache.readQuery<GetFilesData>({ query: GET_FILES });
      if (existing && data) {
        cache.writeQuery<GetFilesData>({
          query: GET_FILES,
          data: { getFiles: [data.uploadFile, ...existing.getFiles] },
        });
      }
    },
  });

  /**
   * Handles file selection via the input element.
   */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const filesArray = Array.from(files);
    // setSelectedFiles(filesArray);
    setSelectedFiles(prev => [...prev, ...filesArray]);
    // clearPreviewImages();
    filesArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        addPreviewImage({ file, previewUrl: reader.result as string });
      };
      reader.onerror = () => {
        message.error('Failed to read file for preview.');
      };
      reader.readAsDataURL(file);
    });
  };

  /**
   * Handles the file upload process with simulated progress.
   */
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      message.warning('No files selected.');
      return;
    }
    setUploading(true);
    setUploadProgress(0);
    let uploadedCount = 0;
    // Simulate progress: Increase progress by 10 every 300 ms until it reaches 90.
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => (prev < 90 ? prev + 10 : prev));
    }, 300);

    try {
      // For demonstration, uploading only the first file.
      for (const file of selectedFiles) {
        // Upload each file separately.
        const { data } = await uploadFile({ variables: { file } });
        message.success(`${data.uploadFile.filename} uploaded successfully`);
        uploadedCount += 1;
        // Update progress as a percentage of uploaded files.
        setUploadProgress(Math.floor((uploadedCount / selectedFiles.length) * 100));
      }
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Unknown error';
      message.error('Upload failed: ' + errorMessage);
    } finally {
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploading(false);
    }
  };

  return (
    <div>
      <input type='file' multiple onChange={handleFileChange} accept='image/*' />

      {uploading && (
        <div style={{ marginTop: '1rem' }}>
          <Progress percent={uploadProgress} size='small' showInfo={false} />
        </div>
      )}
      {previewImages.length > 0 && (
        <>
          <h3>Preview</h3>
          <FilePreviewList previews={previewImages} />
          <Button type='primary' onClick={handleUpload} style={{ marginTop: '1rem' }}>
            Upload Files
          </Button>
        </>
      )}
    </div>
  );
};

export default FileUploadWithPreview;
