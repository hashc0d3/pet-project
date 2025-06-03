import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import Head from 'next/head';
import { AppShell, Text, Button, Avatar, Group, Container, Paper, Title, Stack } from '@mantine/core';

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <Head>
        <title>Home</title>
      </Head>

      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <AppShell.Header>
          <Container fluid style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text size="xl" fw={700}>My App</Text>
            <Group>
              {user && user.picture && (
                <Avatar src={user.picture} alt={user.name || 'User'} radius="xl" />
              )}
              {user && user.name && (
                <Text size="sm" fw={500}>{user.name}</Text>
              )}
              <Button onClick={logout} color="red">Выйти</Button>
            </Group>
          </Container>
        </AppShell.Header>

        <AppShell.Main>
          <Container size="md" my="md">
            <Paper shadow="md" radius="md" p="md" withBorder>
              <Stack>
                <Title order={3}>Добро пожаловать!</Title>
                {user && (
                  <Stack gap="xs">
                    <Text size="sm" c="dimmed">Email:</Text>
                    <Text size="md" fw={500}>{user.email}</Text>
                    {user.name && (
                      <>
                        <Text size="sm" c="dimmed">Имя:</Text>
                        <Text size="md" fw={500}>{user.name}</Text>
                      </>
                    )}
                    {user.role && (
                      <>
                        <Text size="sm" c="dimmed">Роль:</Text>
                        <Text size="md" fw={500}>{user.role}</Text>
                      </>
                    )}
                  </Stack>
                )}
              </Stack>
            </Paper>
          </Container>
        </AppShell.Main>
      </AppShell>
    </ProtectedRoute>
  );
} 