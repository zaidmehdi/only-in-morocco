import BaseModal from "./BaseModal";

export default function ViewPostModal({ isOpen, onClose, post }) {
  if (!post) return null;

  const commentCount = post.comments?.length || 0;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        {/* Post content */}
        <div>
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {post.body}
          </p>
        </div>

        {/* Meta info */}
        <div className="flex items-center text-sm text-gray-500 gap-4">
          <div>
            <span className="font-medium text-gray-900">{post.votes}</span>{" "}
            upvotes
          </div>
          <div>
            Posted on <span className="text-gray-700">{post.date}</span>
          </div>
        </div>

        {/* Comments */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm text-gray-900">Comments</h3>
              {commentCount > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium">
                  {commentCount}
                </span>
              )}
            </div>
            <button className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
              Add Comment
            </button>
          </div>

          {commentCount > 0 ? (
            <ul className="space-y-2">
              {post.comments.map((comment, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-700 border border-gray-200 p-2 rounded"
                >
                  {comment}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">No comments yet.</p>
          )}
        </div>
      </div>
    </BaseModal>
  );
}
