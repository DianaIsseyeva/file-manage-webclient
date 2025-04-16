'use client';

import { gql, useMutation } from '@apollo/client';
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useFileStore } from '../store/useFileStore';

// GraphQL mutation for login.
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        name
      }
    }
  }
`;

/**
 * A login form component.
 * Upon successful login, it saves the JWT token in both Zustand and cookies,
 * then redirects the user to the home page.
 */
const LoginForm = () => {
  const { setAuthToken } = useFileStore();
  const [form] = Form.useForm();
  const router = useRouter();
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const { data } = await login({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      if (data && data.login) {
        message.success('Login successful!');
        // Save token in Zustand:
        setAuthToken(data.login.token);
        // Save token in a cookie (expires in 1 hour):
        document.cookie = `token=${data.login.token}; Path=/; Max-Age=3600`;
        setAuthToken(data.login.token);
        localStorage.setItem('token', data.login.token);
        router.push('/');
      }
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Unknown error';
      message.error(errorMessage || 'Login failed');
    }
  };

  return (
    <Form form={form} layout='vertical' onFinish={onFinish}>
      <Form.Item
        label='Email'
        name='email'
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Invalid email format!' },
        ]}
      >
        <Input placeholder='Email' />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder='Password' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={loading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
