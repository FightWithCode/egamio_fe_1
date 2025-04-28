// components/GoogleAuth.jsx
'use client';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/authSlice';

const GoogleAuth = ({ onGoogleSuccess, setErrorMessage }) => {
  const dispatch = useDispatch();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // First step: Call GoogleSignInView
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
        // Dispatch login action to store tokens
        dispatch(login(data));
        onGoogleSuccess(data);
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
        onError={() => setErrorMessage('Google login failed')}
        useOneTap={false}
        theme="filled_black"
        shape="pill"
        size="large"
        text="signup_with"
        width="100%"
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleAuth;
