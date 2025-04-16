'use client';

import { Image } from 'antd';
import React, { useEffect, useState } from 'react';

/**
 * Props for the FilePreview component.
 */
interface FilePreviewProps {
  file: File;
}

/**
 * A component that displays a preview of an image file along with its name.
 *
 * It uses the FileReader API to convert the file into a Data URL
 * and then renders an Ant Design Image component.
 *
 * @param file - The File object to preview.
 * @returns A React component displaying the image preview and file name.
 */
const FilePreview: React.FC<FilePreviewProps> = ({ file }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.onerror = () => {
      console.error('Failed to read file for preview.');
    };
    reader.readAsDataURL(file);
  }, [file]);

  if (!previewUrl) {
    return <div>Loading preview...</div>;
  }
  return (
    <div style={{ textAlign: 'center', margin: '0.5rem' }}>
      <Image src={previewUrl} alt={file.name} width={100} style={{ objectFit: 'contain' }} />
    </div>
  );
};

export default FilePreview;
