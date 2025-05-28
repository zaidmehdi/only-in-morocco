export default function PostFeed() {
  const posts = [
    { id: 1, title: 'First post', votes: 10 },
    { id: 2, title: 'Second post', votes: 7 },
  ];

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border rounded p-4 flex justify-between items-center"
        >
          <h2>{post.title}</h2>
          <span>👍 {post.votes}</span>
        </div>
      ))}
    </div>
  );
}
