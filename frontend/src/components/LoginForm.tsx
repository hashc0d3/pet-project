import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoginCredentials } from '../types/auth';
import { TextInput, PasswordInput, Button, Paper, Title, Text, Stack, Group, Divider } from '@mantine/core';

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md" className="w-full max-w-sm mx-auto">
      <Title order={2} ta="center" mt="md" mb={30}>
        Вход
      </Title>
      
      {error && (
        <Text color="red" ta="center" mb="md">
          {error}
        </Text>
      )}

      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Email"
            placeholder="Ваш Email"
            required
            value={credentials.email}
            onChange={(event) => setCredentials({ ...credentials, email: event.currentTarget.value })}
            autoComplete="email"
          />

          <PasswordInput
            label="Пароль"
            placeholder="Ваш пароль"
            required
            value={credentials.password}
            onChange={(event) => setCredentials({ ...credentials, password: event.currentTarget.value })}
            autoComplete="current-password"
          />

          <Button type="submit" fullWidth mt="xl">
            Войти
          </Button>

          <Divider label="Или продолжить с" labelPosition="center" my="lg" />

          <Button
            fullWidth
            variant="default"
            onClick={() => window.location.href = 'http://localhost:3001/auth/google'}
            leftSection={<img src="https://www.google.com/favicon.ico" alt="Google logo" style={{ width: 16, height: 16 }} />}
          >
            Войти через Google
          </Button>

        </Stack>
      </form>
    </Paper>
  );
}; 