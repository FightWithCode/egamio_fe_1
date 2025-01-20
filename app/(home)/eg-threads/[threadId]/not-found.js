import Link from 'next/link'
import ResponsiveContainer from "@/components/common/ResponsiveContainer"

export default function NotFound() {
  return (
    <ResponsiveContainer className="!text-background pt-24 pb-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Thread Not Found</h2>
        <p className="mb-4">Could not find the requested thread.</p>
        <Link 
          href="/eg-threads" 
          className="text-highlight hover:underline"
        >
          Return to Threads List
        </Link>
      </div>
    </ResponsiveContainer>
  )
}
