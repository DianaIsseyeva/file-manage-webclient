'use client';

import { Button, message } from 'antd';
import { ChangeEvent, useState } from 'react';
import FilePreviewList from './FilePreviewList';

const FileUploadWithPreview = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  /**
   * Handles changes in the file input element.
   * @param event - The change event from the file input.
   */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles(filesArray);
    }
  };

  /**
   * Simulate an upload operation.
   */
  const handleUpload = () => {
    // Here, you can integrate your GraphQL mutation to upload the files.
    // For now, just show a message.
    message.success('Uploading ' + selectedFiles.length + ' file(s)...');
  };

  return (
    <div>
      <input type='file' multiple onChange={handleFileChange} accept='image/*' />
      {selectedFiles.length > 0 && (
        <>
          <h3>Preview</h3>
          <FilePreviewList files={selectedFiles} />
          <Button type='primary' onClick={handleUpload} style={{ marginTop: '1rem' }}>
            Upload Files
          </Button>
        </>
      )}
    </div>
  );
};

export default FileUploadWithPreview;
