// app/(home)/eg-threads/data.js
export async function getSamplePosts() {
  return [
    {
      id: 1,
      title: "What are the best settings for BGMI?",
      author: "PlayerOne",
      game: "BGMI",
      comments: 12,
      likes: 34,
      content:
        "I've been experimenting with different sensitivity settings and layouts for BGMI. I want to hear your recommendations! What works best for you?",
    },
    {
      id: 2,
      title: "Looking for teammates for Valorant Ranked.",
      author: "ValorViper",
      game: "Valorant",
      comments: 5,
      likes: 20,
      content:
        "I'm looking for skilled teammates to climb ranked in Valorant. Prefer players with good communication and at least Plat rank.",
    },
    {
      id: 3,
      title: "Poll: Favorite map in Call of Duty: Mobile?",
      author: "CODFanatic",
      game: "Call of Duty",
      comments: 18,
      likes: 50,
      content:
        "What's your favorite map in COD: Mobile? Vote now! Personally, I love Rust for its fast-paced action.",
    },
  ]
}
