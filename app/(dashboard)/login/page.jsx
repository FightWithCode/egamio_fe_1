import { Suspense } from 'react';
import LoginForm from '@/components/forms/LoginForm';


export const metadata = {
  title: 'Login - eGamio',
  description: 'Login to your account to access the dashboard',
  keywords: 'login, user authentication, dashboard, esports, gaming',
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
