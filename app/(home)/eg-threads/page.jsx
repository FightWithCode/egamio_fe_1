// app/(home)/eg-threads/page.jsx
import ResponsiveContainer from "@/components/common/ResponsiveContainer"
import Sidebar from "./components/Sidebar"
import ThreadList from "./components/ThreadList"
import { getSamplePosts } from "./data"

export const metadata = {
  title: 'eGThreads | eGamio Forums',
  description: 'Join the eGamio gaming community. Discuss games, share strategies, find teammates, and stay updated with the latest gaming news and updates.',
  keywords: [
    'gaming forum',
    'gaming community',
    'game discussions',
    'BGMI',
    'Valorant',
    'Call of Duty Mobile',
    'gaming tips',
    'esports discussions',
    'player recruitment',
    'gaming strategies'
  ],
  openGraph: {
    title: 'eGThreads | eGamio Forums',
    description: 'Join the eGamio gaming community. Discuss games, share strategies, find teammates, and stay updated with the latest gaming news and updates.',
    type: 'website',
    url: 'https://egamio.com/eg-threads',
    images: [
      {
        url: '/images/og/forums-og.jpg', // Make sure this image exists in your public folder
        width: 1200,
        height: 630,
        alt: 'eGamio Gaming Forums'
      }
    ],
    siteName: 'eGamio'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
  alternates: {
    canonical: 'https://egamio.com/eg-threads',
  }
}

export default async function ForumHome() {
  const samplePosts = await getSamplePosts()

  return (
    <ResponsiveContainer className="py-32">
      <div className="flex flex-col md:flex-row gap-4">
        <Sidebar />
        <ThreadList posts={samplePosts} />
      </div>
    </ResponsiveContainer>
  )
}
