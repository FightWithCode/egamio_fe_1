import Image from "next/image"

export default function BlogContent({ post }) {
  return (
    <div className="bg-transparent p-6 rounded-lg border-[1px] border-white/20 backdrop-blur-md">
      <Image
        src={post.image}
        alt={post.title}
        className="rounded-lg w-full h-[400px] object-cover mb-6"
        priority
      />

      <BlogMeta post={post} />
      <BlogTitle title={post.title} />
      <BlogAuthorInfo post={post} />
      <BlogBody content={post.content} />
    </div>
  )
}

function BlogMeta({ post }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <span className="bg-highlight text-white text-sm font-semibold px-3 py-1 rounded-full">
        {post.category}
      </span>
      <span className="bg-highlight text-white text-sm font-semibold px-3 py-1 rounded-full">
        {post.rating}
      </span>
    </div>
  )
}

function BlogTitle({ title }) {
  return (
    <h1 className="text-white text-4xl font-extrabold leading-tight mb-4">
      {title}
    </h1>
  )
}

function BlogAuthorInfo({ post }) {
  return (
    <div className="text-foreground text-sm mb-6">
      By <span className="font-semibold">{post.author}</span> |{" "}
      <span className="font-semibold">{post.date}</span> | {post.comments}
    </div>
  )
}

function BlogBody({ content }) {
  return (
    <div className="text-foreground text-lg leading-relaxed space-y-4">
      {content.split('\n\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}
