// app/(home)/blogs/components/Sidebar.jsx
import SidebarPost from './SidebarPost'

export default function Sidebar({ posts }) {
  return (
    <aside className="p-3 rounded-lg sticky top-24 backdrop-blur-md border-[1px]">
      <h3 className="text-white text-xl font-bold border-b border-highlight pb-2">
        Related Posts
      </h3>
      {posts.map((post, index) => (
        <SidebarPost key={post.id} post={post} />
      ))}
      <AdSpace />
    </aside>
  )
}

function AdSpace() {
  return (
    <div className="bg-background-light p-4 rounded-lg text-center">
      <h4 className="text-highlight font-bold">Ad Space</h4>
      <p className="text-foreground text-sm mt-2">
        Place your ad content here to monetize your site.
      </p>
    </div>
  )
}
