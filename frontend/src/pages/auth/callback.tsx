import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthCallback() {
  const router = useRouter();
  const { login, validateToken } = useAuth();

  useEffect(() => {
    const { token } = router.query;
    
    if (token) {
      const processToken = async () => {
        localStorage.setItem('token', token as string);
        await validateToken(token as string);
        router.push('/');
      };
      
      processToken();
    }
  }, [router.query, validateToken, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Авторизация...</h1>
        <p>Пожалуйста, подождите, пока мы завершаем процесс авторизации.</p>
      </div>
    </div>
  );
} 