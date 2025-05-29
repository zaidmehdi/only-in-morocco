import Post from "@/components/Post";

export default function PostFeed({ onSelectPost }) {
  const posts = [
    {
      id: 1,
      title: "test",
      body: "test",
      votes: 38,
      date: "11 hours ago",
      comments: [],
    },
    {
      id: 2,
      title: "test",
      body: "test again",
      votes: 3,
      date: "11 hours ago",
      comments: ["Exactly my thoughts", "This needs more visibility"],
    },
  ];

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} onClick={() => onSelectPost(post)}>
          <Post {...post} />
        </div>
      ))}
    </div>
  );
}
