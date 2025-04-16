'use client';

import React from 'react';
import FilePreview from './FilePreview';

/**
 * Props for the FilePreviewList component.
 */
interface FilePreviewListProps {
  files: File[];
}

/**
 * A component that displays a list of image previews.
 *
 * @param files - An array of File objects to preview.
 * @returns A list of FilePreview components.
 */
const FilePreviewList: React.FC<FilePreviewListProps> = ({ files }) => {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {files.map(file => (
        <FilePreview key={file.name} file={file} />
      ))}
    </div>
  );
};

export default FilePreviewList;
