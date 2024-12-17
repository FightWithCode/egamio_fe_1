import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import { TypographyH1, TypographyP } from '@/components/ui/Typographies';

export default function Loading() {
  return (
    <ResponsiveContainer className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
        <TypographyH1 className="text-center text-2xl">
          Email Verification
        </TypographyH1>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-highlight mx-auto"></div>
          <TypographyP className="mt-4">
            Loading...
          </TypographyP>
        </div>
      </div>
    </ResponsiveContainer>
  );
}
