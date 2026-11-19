import { Link } from "react-router-dom";

function PostCard({ post }) {
  const image = post?.featuredImage?.node?.sourceUrl;
  const excerpt = (post.excerpt ? post.excerpt.replace(/<[^>]+>/g, "") : "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6)
    .join(" ");

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block overflow-hidden border rounded-lg shadow-sm bg-white"
    >
      {image && (
        <div className="overflow-hidden">
          <img
            src={image}
            alt={post.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-2">{excerpt}...</p>
        <h4 className="font-semibold text-lg">{post.title}</h4>
      </div>
    </Link>
  );
}

export default PostCard;
