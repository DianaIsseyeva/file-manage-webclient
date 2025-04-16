/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Image, Modal, Table, message } from 'antd';
import { useState } from 'react';

/**
 * GraphQL query to fetch the list of uploaded files.
 */
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

/**
 * GraphQL mutation to delete a file by its ID.
 */
const DELETE_FILE = gql`
  mutation DeleteFile($id: ID!) {
    deleteFile(id: $id)
  }
`;

/**
 * Component that displays a list of uploaded files in a table.
 */
const FileList = () => {
  const { data, loading, error, refetch } = useQuery(GET_FILES);
  const [deleteFile] = useMutation(DELETE_FILE);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // If error occurs in the query, display a message.
  if (error) {
    message.error('Failed to fetch files: ' + error.message);
  }

  // Define columns for the Ant Design Table.
  const columns = [
    {
      title: 'Preview',
      dataIndex: 'url',
      key: 'preview',
      render: (url: string) => <Image width={50} src={url} alt='preview' />,
    },
    {
      title: 'Filename',
      dataIndex: 'filename',
      key: 'filename',
    },
    {
      title: 'MIME Type',
      dataIndex: 'mimetype',
      key: 'mimetype',
    },
    {
      title: 'Size (bytes)',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Uploaded At',
      dataIndex: 'uploadedAt',
      key: 'uploadedAt',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: any) => (
        <Button
          type='primary'
          danger
          onClick={() => {
            setSelectedFileId(record._id);
            setIsModalVisible(true);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  /**
   * Handler for confirming deletion of a file.
   */
  const handleDelete = async () => {
    if (!selectedFileId) return;
    try {
      await deleteFile({ variables: { id: selectedFileId } });
      message.success('File deleted successfully');
      // Refresh the file list
      refetch();
      setIsModalVisible(false);
      setSelectedFileId(null);
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Unknown error';
      message.error('Failed to delete file: ' + errorMessage);
    }
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      <Table
        dataSource={data?.getFiles}
        columns={columns}
        loading={loading}
        rowKey='_id'
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title='Confirm Deletion'
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedFileId(null);
        }}
        okText='Delete'
        cancelText='Cancel'
      >
        <p>Are you sure you want to delete this file?</p>
      </Modal>
    </div>
  );
};

export default FileList;
