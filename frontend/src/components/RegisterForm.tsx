import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TextInput, PasswordInput, Button, Paper, Title, Text, Stack } from '@mantine/core';

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', response.data.access_token);
      router.push('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md" className="w-full max-w-sm mx-auto">
      <Title order={2} ta="center" mt="md" mb={30}>
        Регистрация
      </Title>
      
      {error && (
        <Text color="red" ta="center" mb="md">
          {error}
        </Text>
      )}

      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Имя"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.currentTarget.value })}
          />

          <TextInput
            label="Email"
            placeholder="Ваш Email"
            required
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.currentTarget.value })}
            autoComplete="email"
          />

          <PasswordInput
            label="Пароль"
            placeholder="Ваш пароль"
            required
            value={formData.password}
            onChange={(event) => setFormData({ ...formData, password: event.currentTarget.value })}
            autoComplete="new-password"
          />

          <Button type="submit" fullWidth mt="xl" color="green">
            Зарегистрироваться
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}; 