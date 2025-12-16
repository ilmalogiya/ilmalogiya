// components/main-section/main_section.jsx
import { useState, useEffect, useCallback, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSidebarData } from "../../hooks/useSideBarData";
import { usePostsQuery } from "../../hooks/usePostsQuery";
import { useGetOneQuery } from "../../hooks/useGetOneQuery";
import "./main_section.scss";
import "../rightPosts/rightposts.scss";
import Tags from "../tags/tags";
import Posts from "../posts/posts";
import PostDetail from "../postDetail/postDetail";
import Pagination from "../pagination/pagination";
import RightPosts from "../rightPosts/rightposts";
import Loader from "../loader/loader";
import Postloading from "../postloading/postloading.jsx"; // 🔹 qo‘shildi

const MemoizedTags = memo(Tags);
const MemoizedRightPosts = memo(RightPosts);

const onLoad = () => {
  return (
    <div className="onload rightposts">
      <div className="onload-telegram telegram">
        <div className="h2"></div>
        <p></p>
        <p className="p"></p>
        <div className="link"></div>
      </div>
      <div className="randompost">
        <div className="h2"></div>
        <div className="img"></div>
        <div className="title"></div>
        <p></p>
        <p></p>
        <p className="p"></p>
      </div>
      <div className="randompost">
        <div className="h2"></div>
        <div className="img"></div>
        <div className="title"></div>
        <p></p>
        <p></p>
        <p className="p"></p>
      </div>
    </div>
  );
};

const MainSection = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const {
    posts: allPosts,
    loading: postsLoading,
    error: postsError,
    pagination,
  } = usePostsQuery(currentPage, searchQuery, selectedTag);

  console.log(allPosts)

  const {
    post: detailedPost,
    loading: detailLoading,
    error: detailError,
  } = useGetOneQuery(slug);

  const { randomPost, lastPost, loading, error } = useSidebarData();
  console.log(randomPost, lastPost)

  const handleTagChange = useCallback(
    (tag) => {
      setSelectedTag(tag);
      setCurrentPage(1);
      navigate("/");
    },
    [navigate]
  );

  useEffect(() => {
    const handleSearch = () => {
      setSearchQuery(localStorage.getItem("searchQuery") || "");
      setCurrentPage(1);
    };
    window.addEventListener("searchChanged", handleSearch);
    return () => window.removeEventListener("searchChanged", handleSearch);
  }, []);

  if (postsError)
    return <div className="error">Xatolik: {postsError}</div>;

  return (
    <section className="main-section">
      <div className="left">
        {/* === Agar id bo‘lsa (ya’ni post detal sahifasi ochilgan bo‘lsa) === */}
        {slug ? (
          detailLoading ? (
            <Loader />
          ) : detailError ? (
            <div className="error">{detailError}</div>
          ) : detailedPost ? (
            <PostDetail post={detailedPost} />
          ) : (
            <p>Post topilmadi</p>
          )
        ) : (
          <>
            <MemoizedTags
              selectedTag={selectedTag}
              onTagChange={handleTagChange}
            />

            {/* === Asosiy o‘zgarish shu yerda === */}
            {postsLoading ? (
              <Postloading /> // ✅ Yuklanayotgan holatda Postloading chiqadi
            ) : allPosts.length === 0 ? (
              <h1 className="postloading-message">
                Hech qanday post topilmadi
              </h1>
            ) : (
              <>
                <Posts
                  allPosts={allPosts}
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
        {error ? (
          <div className="error p-4 bg-red-100 text-red-700 rounded">
            <strong>Sidebar xato:</strong> {error}
            <br />
            <small>
              Backendda /posts/random/ yoki /posts/latest/ ishlamayapti
            </small>
          </div>
        ) : loading ? (
          <div className="text-center py-8">{onLoad()}</div>
        ) : (
          <MemoizedRightPosts randomPost={randomPost} lastPost={lastPost} />
        )}
      </div>
    </section>
  );
};

export default MainSection;