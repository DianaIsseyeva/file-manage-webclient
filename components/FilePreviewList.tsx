'use client';

import { Image } from 'antd';
import React from 'react';
import type { Preview } from '../store/useFileStore';

/**
 * Props for FilePreviewList component.
 */
interface FilePreviewListProps {
  previews: Preview[];
}

/**
 * A component that displays previews of selected files.
 *
 * @param previews - An array of preview objects containing the file and its Data URL.
 * @returns A list of image previews.
 */
const FilePreviewList: React.FC<FilePreviewListProps> = ({ previews }) => {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {previews.map((preview, index) => (
        <Image
          key={index}
          src={preview.previewUrl}
          alt={preview.file.name}
          width={100}
          style={{ objectFit: 'contain' }}
        />
      ))}
    </div>
  );
};

export default FilePreviewList;
