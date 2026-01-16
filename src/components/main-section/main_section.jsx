import { useState, useEffect, useCallback, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Yangi hookni import qilamiz
import { useHomeData } from "../../hooks/useHomeData"; 
import { useGetOneQuery } from "../../hooks/useGetOneQuery";
import "./main_section.scss";
import "../rightPosts/rightposts.scss";
import Tags from "../tags/tags";
import Posts from "../posts/posts";
import PostDetail from "../postDetail/postDetail";
import Pagination from "../pagination/pagination";
import RightPosts from "../rightPosts/rightposts";
import Loader from "../loader/loader";
import Postloading from "../postloading/postloading.jsx";

const MemoizedTags = memo(Tags);
const MemoizedRightPosts = memo(RightPosts);

const onLoad = () => (
  <div className="onload rightposts">
    <div className="onload-telegram telegram">
      <div className="h2"></div><p></p><p className="p"></p><div className="link"></div>
    </div>
    {[1, 2].map((i) => (
      <div key={i} className="randompost">
        <div className="h2"></div><div className="img"></div><div className="title"></div><p></p><p></p><p className="p"></p>
      </div>
    ))}
  </div>
);

const MainSection = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const { 
    tags, 
    posts, 
    randomPost, 
    latestPost,   
    pagination, 
    loading: homeLoading, 
    error: homeError 
  } = useHomeData(currentPage);

  const {
    post: detailedPost,
    loading: detailLoading,
    error: detailError,
  } = useGetOneQuery(slug);

  const handleTagChange = useCallback((tag) => {
    setSelectedTag(tag);
    setCurrentPage(1);
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const handleSearch = () => {
      setSearchQuery(localStorage.getItem("searchQuery") || "");
      setCurrentPage(1);
    };
    window.addEventListener("searchChanged", handleSearch);
    return () => window.removeEventListener("searchChanged", handleSearch);
  }, []);

  if (homeError) return <div className="error">Xatolik: {homeError}</div>;

  return (
    <section className="main-section">
      <div className="left">
        {slug ? (
          detailLoading ? <Loader /> : detailError ? <div className="error">{detailError}</div> : <PostDetail post={detailedPost} />
        ) : (
          <>
            <MemoizedTags 
              tags={tags} 
              selectedTag={selectedTag} 
              onTagChange={handleTagChange} 
            />

            {homeLoading ? (
              <Postloading />
            ) : posts.length === 0 ? (
              <h1 className="postloading-message">Hech qanday post topilmadi</h1>
            ) : (
              <>
                <Posts 
                  allPosts={posts} 
                  selectedTag={selectedTag} 
                  searchQuery={searchQuery} 
                  handleTagClick={handleTagChange} 
                />
                <Pagination 
                  pagination={pagination} 
                  currentPage={currentPage} 
                  onPageChange={setCurrentPage} 
                />
              </>
            )}
          </>
        )}
      </div>

      <div className="right">
        {homeLoading ? (
          <div className="text-center py-8">{onLoad()}</div>
        ) : (
          <MemoizedRightPosts 
            randomPost={randomPost} 
            lastPost={latestPost} 
          />
        )}
      </div>
    </section>
  );
};

export default MainSection;