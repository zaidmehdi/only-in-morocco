import Post from "@/components/Post";

export default function PostFeed() {
  const posts = [
    {
      id: 1,
      title: "Test",
      body: "test",
      votes: 38,
      time: "about 11 hours ago",
    },
    {
      id: 2,
      title: "Test",
      body: "test again",
      votes: 3,
      time: "about 11 hours ago",
    },
  ];

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}
