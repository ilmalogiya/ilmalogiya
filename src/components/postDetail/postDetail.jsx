import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegEdit, FaRegEye, FaTelegramPlane, FaFacebookF, FaShareAlt, FaCheck } from "react-icons/fa";
import { FaArrowLeftLong, FaXTwitter } from "react-icons/fa6";
import { IoClose, IoLinkOutline } from "react-icons/io5";
import "./postDetail.scss";

const PostDetail = ({ post }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const pageUrl = window.location.href;
  const pageTitle = post?.title || "Ilmalogiya";

  const shareItems = [
    {
      id: "telegram",
      label: "Telegram",
      icon: <FaTelegramPlane />,
      color: "#26A5E4",
      href: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`,
    },
    {
      id: "twitter",
      label: "X (Twitter)",
      icon: <FaXTwitter />,
      color: "#000",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`,
    },
    {
      id: "facebook",
      label: "Facebook",
      icon: <FaFacebookF />,
      color: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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

        {/* Inline Share tugmalari — post oxirida */}
        <div className="share-section">
          <h4>Ulashish</h4>
          <div className="share-options">
            {shareItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="share-social-btn"
                style={{ "--share-color": item.color }}
                title={item.label}
              >
                <span className="share-icon">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}

            <button
              className={`share-social-btn copy-link-btn ${copied ? "copied" : ""}`}
              onClick={handleCopyLink}
              title="Havolani nusxalash"
            >
              <span className="share-icon">
                {copied ? <FaCheck /> : <IoLinkOutline />}
              </span>
              <span>{copied ? "Nusxalandi!" : "Havolani nusxalash"}</span>
            </button>
          </div>
        </div>

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