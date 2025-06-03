import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import Head from 'next/head';
import { Container, Center, Text } from '@mantine/core';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <Center style={{ width: '100vw', minHeight: '100vh' }}>
      <Head>
        <title>Login</title>
      </Head>

      <Container size={420} my={40}>
        <LoginForm />
        
        <Text ta="center" size="sm" mt="md">
          Новый пользователь? {''}
          <Link href="/register" passHref legacyBehavior>
            <Text component="a" size="sm" c="blue">
              Зарегистрироваться
            </Text>
          </Link>
        </Text>
      </Container>
    </Center>
  );
} 