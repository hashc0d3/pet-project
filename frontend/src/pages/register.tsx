import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RegisterForm } from '../components/RegisterForm';
import { useAuth } from '../contexts/AuthContext';
import Head from 'next/head';
import { Container, Center, Text } from '@mantine/core';
import Link from 'next/link';

export default function RegisterPage() {
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
        <title>Register</title>
      </Head>

      <Container size={420} my={40}>
        <RegisterForm />
        
        <Text ta="center" size="sm" mt="md">
          Уже есть аккаунт? {''}
          <Link href="/login" passHref legacyBehavior>
            <Text component="a" size="sm" c="blue">
              Войти
            </Text>
          </Link>
        </Text>
      </Container>
    </Center>
  );
} 