// app/(home)/blogs/data.js
import blogImage1 from "@/public/images/blogs/blog1.jpg"
import blogImage2 from "@/public/images/blogs/blog2.jpg"
import blogImage3 from "@/public/images/blogs/blog3.jpg"

export const getBlogPosts = () => [
  {
    id: 1,
    image: blogImage1,
    rating: "8.7",
    title: "We Reviewed the New Magimons Game",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Vellatrix",
    date: "November 21, 2024",
    comments: "258 Comments",
  },
  {
    id: 2,
    image: blogImage2,
    rating: "6.5",
    title: `"Legend of Kenshi II" is a Bit Green for Now`,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Vellatrix",
    date: "November 20, 2024",
    comments: "125 Comments",
  },
  {
    id: 3,
    image: blogImage3,
    rating: "9.2",
    title: `We Reviewed the New and Exciting Fantasy Game "Olympus"`,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Morgana",
    date: "November 19, 2024",
    comments: "320 Comments",
  },
]

export async function getBlogPost(slug) {
  // This would typically be an API call
  // For now, returning mock data
  return {
    id: 1,
    image: blogImage1,
    rating: "8.7",
    title: "We Reviewed the New Magimons Game",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    author: "Vellatrix",
    date: "November 21, 2024",
    comments: "258 Comments",
    comments_arr: [
      {
        id: 1,
        author: "ProGamer",
        authorAvatar: "/avatars/pro-gamer.jpg",
        text: "Try a 3-finger claw setup; it's great for accuracy!",
        votes: 45,
        createdAt: "2024-01-15T11:00:00Z",
        replies: [
          {
            id: 4,
            author: "Newbie",
            authorAvatar: "/avatars/newbie.jpg",
            text: "Could you share your layout screenshot?",
            votes: 12,
            createdAt: "2024-01-15T11:30:00Z"
          }
        ]
      }
    ],
    category: "Game Reviews"
  }
}

// app/(home)/blogs/data.js
export async function getRelatedPosts(currentSlug) {
  // This would typically fetch related posts from an API
  // For now, returning mock data
  return [
    {
      id: 2,
      image: blogImage2,
      rating: "6.5",
      title: `"Legend of Kenshi II" is a Bit Green for Now`,
      description: "Lorem ipsum dolor sit amet...",
      author: "Vellatrix",
      date: "November 20, 2024",
      comments: "125 Comments",
    },
    {
      id: 3,
      image: blogImage3,
      rating: "9.2",
      title: `We Reviewed the New and Exciting Fantasy Game "Olympus"`,
      description: "Lorem ipsum dolor sit amet...",
      author: "Morgana",
      date: "November 19, 2024",
      comments: "320 Comments",
    },
  ]
}

export const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
