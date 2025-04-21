'use client';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';

const LoginWithGoogle = ({ setErrorMessage }) => {
  const { login } = useAuth();
  const router = useRouter();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/auth/google/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        login(data);
        router.refresh();
        router.push('/dashboard');
      } else {
        setErrorMessage(data.error || 'Google authentication failed');
      }
    } catch (error) {
      setErrorMessage('Failed to authenticate with Google');
    }
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          setErrorMessage('Google login failed. Please try again.');
        }}
        // useOneTap={false}
        theme="filled_black"
        shape="pill"
        size="large"
        text="signin_with"
        width="100%"
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default LoginWithGoogle;
