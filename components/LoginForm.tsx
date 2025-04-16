'use client';

import { Form, Input, Button, message } from 'antd';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useFileStore } from '../store/useFileStore';

/**
 * GraphQL mutation for user login.
 */
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
 *
 * This component renders a form using Ant Design. Upon submission, it calls the login mutation.
 * On successful login, it updates the Zustand store with the JWT token and navigates to the homepage.
 */
const LoginForm = () => {
  const { setAuthToken } = useFileStore();
  const [form] = Form.useForm();
  const router = useRouter();
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  /**
   * Handles form submission.
   * @param values - An object with email and password.
   */
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
        setAuthToken(data.login.token); // Save the token in Zustand
        router.push('/'); // Redirect to home page (or dashboard)
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
