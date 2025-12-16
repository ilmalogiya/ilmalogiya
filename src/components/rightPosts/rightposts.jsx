import { Link } from "react-router-dom";
import { BsTelegram } from "react-icons/bs";
import "./rightposts.scss";
import { stripHTML } from "../../utils/stripHTML";
import { memo } from "react";
import { IoLogoInstagram } from "react-icons/io5";

const RightPosts = ({ randomPost, lastPost }) => {
  const cleanRandomDesc = stripHTML(randomPost.description || "");
  const cleanLastDesc = stripHTML(lastPost.description || "");

  return (
    <div className="rightposts">
      <div className="telegram shadow-elegant">
        <div className="top">
          <h2>Kanalimizga Qo'shiling!</h2>
        </div>
        <div className="text">
          <p>
            Eng so‘nggi yangiliklar, maqolalar va texnologiyalar haqida birinchi
            bo‘lib xabardor bo‘ling!
          </p>
        </div>
        <div className="link">
          <a
            href="https://t.me/ilmalogiya"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsTelegram /> Kanalga qo‘shilish
          </a>
          <a
            href="https://www.instagram.com/ilmalogiya/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoInstagram /> Instagram
          </a>
        </div>
      </div>

      <div className="randompost shadow-elegant">
        <div className="top">
          <h2>Random Post</h2>
        </div>
        {randomPost.file && (
          <div className="img">
            <img src={randomPost.file} alt={randomPost.title} />
          </div>
        )}
        <div className="title">
          <Link to={`/posts/${randomPost.slug}`}>
            <h3>{randomPost.title}</h3>
          </Link>
        </div>
        <div className="text">
          <p>
            {cleanRandomDesc.length > 200
              ? cleanRandomDesc.slice(0, 200) + "..."
              : cleanRandomDesc}
          </p>
        </div>
      </div>

      <div className="lastpost shadow-elegant">
        <div className="top">
          <h2>Oxirgi Post</h2>
        </div>
        {lastPost.file && (
          <div className="img">
            <img src={lastPost.file} alt={lastPost.title} />
          </div>
        )}
        <div className="title">
          <Link to={`/posts/${lastPost.slug}`}>
            <h3>{lastPost.title}</h3>
          </Link>
        </div>
        <div className="text">
          <p>
            {cleanLastDesc.length > 200
              ? cleanLastDesc.slice(0, 200) + "..."
              : cleanLastDesc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(RightPosts);