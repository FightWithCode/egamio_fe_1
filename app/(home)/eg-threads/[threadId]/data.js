// app/(home)/eg-threads/[postId]/data.js
export function getSamplePost(postId) {
    return {
        id: 1,
        title: "What are the best settings for BGMI?",
        author: "PlayerOne",
        authorAvatar: "/avatars/player-one.jpg",
        content: `I've been experimenting with different sensitivity settings and layouts for BGMI. 
            I want to hear your recommendations! What works best for you?`,
        image: "/images/bgmi-settings.jpg",
        game: "BGMI",
        tags: ["Gaming", "BGMI", "Settings", "Mobile"],
        createdAt: "2024-01-15T10:30:00Z",
        votes: 156,
        commentCount: 23,
        comments: [
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
            },
            // ... other comments
        ],
        relatedTopics: [
            {
                id: 1,
                title: "What's your favorite shooter game?",
                votes: 78,
                commentCount: 12,
                author: "Newbie",
                authorAvatar: "/avatars/newbie.jpg",
                text: "Could you share your layout screenshot?",
                votes: 12,
                createdAt: "2024-01-15T11:30:00Z",
                isTrending:true
            },
            {
                id: 2,
                title: "What's your favorite shooter game?",
                votes: 78,
                commentCount: 12,
                author: "Newbie",
                authorAvatar: "/avatars/newbie.jpg",
                text: "Could you share your layout screenshot?",
                votes: 12,
                createdAt: "2024-01-15T11:30:00Z",
                isHot: true
            },
        ]
    };
}
