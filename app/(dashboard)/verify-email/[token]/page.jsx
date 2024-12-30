'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/utils/api';
import Link from 'next/link';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import { TypographyH1, TypographyP } from '@/components/ui/Typographies';

export default function VerifyEmail() {
  const params = useParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.post('/accounts/verify-email/', {
          token: params.token
        });

        setStatus('success');
        setMessage(response.data.msg || 'Email verified successfully!');
      } catch (error) {
        setStatus('error');
        setMessage(
          error.response?.data?.error || 
          'Failed to verify email. The link may be invalid or expired.'
        );
      }
    };

    if (params.token) {
      verifyEmail();
    }
  }, [params.token]);

  return (
    <ResponsiveContainer className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
        <TypographyH1 className="text-center text-2xl">
          Email Verification
        </TypographyH1>

        {status === 'verifying' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-highlight mx-auto"></div>
            <TypographyP className="mt-4">
              Verifying your email...
            </TypographyP>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center space-y-4">
            <div className="text-green-500 text-6xl">✓</div>
            <TypographyP>{message}</TypographyP>
            <Link 
              href="/login" 
              className="block w-full py-2 px-4 bg-highlight hover:bg-darkhighlight text-white rounded-md text-center transition-colors"
            >
              Proceed to Login
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center space-y-4">
            <div className="text-red-500 text-6xl">✕</div>
            <TypographyP className="text-red-400">{message}</TypographyP>
            <div className="space-y-2">
              <Link 
                href="/signup" 
                className="block w-full py-2 px-4 bg-highlight hover:bg-darkhighlight text-white rounded-md text-center transition-colors"
              >
                Back to Sign Up
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="block w-full py-2 px-4 border border-highlight hover:bg-highlight text-white rounded-md text-center transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </ResponsiveContainer>
  );
}
