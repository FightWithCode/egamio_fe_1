// app/(home)/eg-clips/page.jsx
import { Metadata } from 'next';
import ClipsFeed from './components/ClipsFeed';

export const metadata = {
  title: 'eGamio Clips | Watch Gaming Highlights',
  description: 'Watch the best gaming moments, highlights, and clips from your favorite gamers.',
};

export default function ClipsPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="flex justify-center mt-24">
        <div className="w-full max-w-[417px]">
          <ClipsFeed />
        </div>
      </div>
    </div>
  );
}
