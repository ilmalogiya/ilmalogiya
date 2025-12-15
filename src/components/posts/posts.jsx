import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import "./posts.scss";
import { stripHTML } from "../../utils/stripHTML.jsx";
import { useMemo } from "react";

const Posts = ({
  allPosts = [],
  selectedTag = "all",
  searchQuery = "",
  handleTagClick,
  loading = false,
}) => {
  const filteredPosts = useMemo(() => {
    let filtered = allPosts;

    if (selectedTag !== "all") {
      filtered = filtered.filter((post) =>
        post.tags?.includes(selectedTag)
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((post) => {
        const title = post.title?.toLowerCase() || "";
        const desc = stripHTML(post.description || "").toLowerCase();
        return title.includes(query) || desc.includes(query);
      });
    }

    return filtered;
  }, [allPosts, selectedTag, searchQuery]);

  if (!Array.isArray(filteredPosts) || filteredPosts.length === 0) {
    return <h1 className="postloading-message">Hech qanday post topilmadi</h1>;
  }

  return (
    <div className="posts">
      {filteredPosts.map((post) => {
        const hasFile = !!post.file;
        const isVideo = hasFile && /\.(mp4|webm|ogg)$/i.test(post.file);
        const cleanDescription = stripHTML(post.description || "");

        const postLink = post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`;

        return (
          <div
            className={`post_item${hasFile ? "" : " post_item--noimg"} shadow-elegant`}
            key={post.id}
          >
            {hasFile && (
              <div className="post_left">
                <Link to={postLink}>
                  {isVideo ? (
                    <video muted preload="metadata" playsInline>
                      <source src={post.file} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={post.file}
                      alt={post.title}
                      loading="lazy"
                    />
                  )}
                </Link>
              </div>
            )}

            <div className="post_right">
              <div className="post_tags">
                {post.tags?.map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTagClick?.(tag);
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="post_text">
                <Link to={postLink}>
                  <h1>{post.title}</h1>
                </Link>
                <p>
                  {cleanDescription.length > 380
                    ? cleanDescription.slice(0, 380) + "..."
                    : cleanDescription}
                </p>
              </div>

              <div className="post_link">
                <Link to={postLink}>
                  To'liq o'qish <FaArrowRightLong />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;