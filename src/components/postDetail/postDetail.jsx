import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import "./postDetail.scss";

const PostDetail = ({ post }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Ilmalogiya`;
    } else {
      document.title = "Post topilmadi | Ilmalogiya";
    }
    return () => { document.title = "Ilmalogiya"; };
  }, [post]);

  useEffect(() => {
    if (isImageModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isImageModalOpen]);

  if (!post) return <p>Post topilmadi</p>;

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isVideo = post.file && /\.(mp4|webm|ogg)$/i.test(post.file);

  return (
    <>
      <div className="post-detail shadow-elegant">
        {/* Rasm yoki Video — oddiy! */}
        {post.file && (
          <div className="post-img">
            {isVideo ? (
              <video controls autoPlay muted preload="metadata">
                <source src={post.file} type="video/mp4" />
                Video yuklanmadi
              </video>
            ) : (
              <img 
                src={post.file} 
                alt={post.title} 
                loading="lazy"
                onClick={() => setIsImageModalOpen(true)}
                style={{ cursor: "pointer" }}
              />
            )}
            {post.imgdesc && <span className="img-caption">{post.imgdesc}</span>}
          </div>
        )}

        {/* Taglar */}
        <div className="post_tags">
          {post.tags?.map((tag) => (
            <button key={tag}>{tag}</button>
          ))}
        </div>

        {/* Sarlavha */}
        <div className="post-title">
          <h1>{post.title}</h1>
        </div>

        {/* Sana va ko'rishlar */}
        <div className="post-date">
          <p className="published">
            <MdOutlineDateRange /> {formatDateTime(post.publishedDate)}
          </p>
          {post.modifiedDate && new Date(post.publishedDate) < new Date(post.modifiedDate) && (
            <p className="modified">
              <FaRegEdit /> {formatDateTime(post.modifiedDate)}
            </p>
          )}
          <p className="views">
            <FaRegEye /> {post.views || 0}
          </p>
        </div>

        {/* Tavsif */}
        <div
          className="post-description"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />

        {/* Orqaga tugmasi */}
        <Link to="/" className="back-btn">
          <FaArrowLeftLong /> Bosh sahifaga qaytish
        </Link>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && !isVideo && post.file && (
        <div 
          className="image-modal-overlay"
          onClick={() => setIsImageModalOpen(false)}
        >
          <button 
            className="image-modal-close"
            onClick={() => setIsImageModalOpen(false)}
            aria-label="Yopish"
          >
            <IoClose />
          </button>
          <div 
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={post.file} alt={post.title} />
            {post.imgdesc && (
              <div className="image-modal-caption">{post.imgdesc}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;