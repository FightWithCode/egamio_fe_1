import { Metadata } from 'next'
import SignupForm from '@/components/forms/SignupForm';

export const metadata = {
  title: 'Signup - eGamio',
  description: 'Join eGamio - The ultimate gaming and esports platform. Create your player or team account today!',
  keywords: 'gaming, esports, signup, registration, player signup, team signup',
}

export default function SignupPage() {
  return (
    <div className="min-h-screen py-12">
      <SignupForm />
    </div>
  )
}
