'use client';

import { InboxOutlined } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';
import type { UploadProps } from 'antd';
import { Upload, message } from 'antd';

const { Dragger } = Upload;

const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
      url
      mimetype
      size
    }
  }
`;

const FileUpload = () => {
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const customRequest: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    try {
      const { data } = await uploadFile({
        variables: {
          file,
        },
      });

      message.success(`${data.uploadFile.filename} uploaded successfully`);
      onSuccess?.(data, file);
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Unknown error';

      message.error(`Upload failed: ${errorMessage}`);
      onError?.(err as Error);
    }
  };

  return (
    <Dragger
      multiple
      name='file'
      customRequest={customRequest}
      showUploadList={true}
      accept='image/*'
    >
      <p className='ant-upload-drag-icon'>
        <InboxOutlined />
      </p>
      <p className='ant-upload-text'>Click or drag file to this area to upload</p>
      <p className='ant-upload-hint'>Supports only images. Preview included.</p>
    </Dragger>
  );
};

export default FileUpload;
