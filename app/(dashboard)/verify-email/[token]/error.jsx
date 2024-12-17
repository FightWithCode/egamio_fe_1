'use client'
import Link from 'next/link';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import { TypographyH1, TypographyP } from '@/components/ui/Typographies';

export default function Error({ error, reset }) {
  return (
    <ResponsiveContainer className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
        <TypographyH1 className="text-center text-2xl">
          Something went wrong!
        </TypographyH1>
        <div className="text-center space-y-4">
          <div className="text-red-500 text-6xl">✕</div>
          <TypographyP className="text-red-400">
            {error.message || 'An error occurred while verifying your email.'}
          </TypographyP>
          <div className="space-y-2">
            <Link 
              href="/signup" 
              className="block w-full py-2 px-4 bg-highlight hover:bg-darkhighlight text-white rounded-md text-center transition-colors"
            >
              Back to Sign Up
            </Link>
            <button
              onClick={reset}
              className="block w-full py-2 px-4 border border-highlight hover:bg-highlight text-white rounded-md text-center transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
}
