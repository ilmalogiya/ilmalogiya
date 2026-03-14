import { useState, useEffect, useCallback, memo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHomeData } from "../../hooks/useHomeData";
import { useGetOneQuery } from "../../hooks/useGetOneQuery";
import { useTagsQuery } from "../../hooks/useTagsQuery";
import "./main_section.scss";
import "../rightPosts/rightposts.scss";
import Posts from "../posts/posts";
import PostDetail from "../postDetail/postDetail";
import Pagination from "../pagination/pagination";
import RightPosts from "../rightPosts/rightposts";
import Loader from "../loader/loader";
import Postloading from "../postloading/postloading.jsx";
import { IoSearchSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { LuSlidersHorizontal } from "react-icons/lu";
import { usePostsQuery } from "../../hooks/usePostsQuery";
import { Link } from "react-router-dom";

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

  // Search bar state
  const [inputValue, setInputValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Filter drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Tags for drawer
  const { tags: tagList, loading: tagsLoading } = useTagsQuery();
  const safeTags = Array.isArray(tagList)
    ? tagList
    : Array.isArray(tagList?.results)
    ? tagList.results
    : Array.isArray(tagList?.data)
    ? tagList.data
    : [];

  const {
    posts,
    randomPost,
    latestPost,
    pagination,
    loading: homeLoading,
    error: homeError,
  } = useHomeData(currentPage, searchQuery, selectedTag);

  const {
    post: detailedPost,
    loading: detailLoading,
    error: detailError,
  } = useGetOneQuery(slug);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(inputValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue]);

  // Live search results dropdown
  const { posts: searchResults } = usePostsQuery(1, debouncedSearch);

  // Apply search to main list
  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setSearchQuery(inputValue.trim());
      setCurrentPage(1);
      navigate("/");
    },
    [inputValue, navigate]
  );

  const handleTagChange = useCallback(
    (tag) => {
      setSelectedTag(tag);
      setCurrentPage(1);
      setDrawerOpen(false);
      navigate("/");
    },
    [navigate]
  );

  // Close drawer on outside click
  const drawerRef = useRef(null);

  if (homeError) return <div className="error">Xatolik: {homeError}</div>;

  return (
    <section className="main-section">
      <div className="left">
        {slug ? (
          detailLoading ? (
            <Loader />
          ) : detailError ? (
            <div className="error">{detailError}</div>
          ) : (
            <PostDetail post={detailedPost} />
          )
        ) : (
          <>
            {/* Search + Filter bar */}
            <div className="search-filter-bar">
              <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                  type="search"
                  placeholder="Qidirish..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />

                {inputValue.trim() !== "" && searchResults.length > 0 && (
                  <ul className="search-dropdown">
                    {searchResults.map((post, idx) => (
                      <li key={post.id}>
                        <Link
                          to={`/posts/${post.slug}`}
                          onClick={() => setInputValue("")}
                        >
                          <span className="idx">{idx + 1}.</span> {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </form>

              <button
                className={`filter-btn ${selectedTag !== "all" ? "active" : ""}`}
                onClick={() => setDrawerOpen(true)}
                title="Teglar bo' filter"
              >
                <LuSlidersHorizontal />
                {selectedTag !== "all" && (
                  <span className="filter-badge">1</span>
                )}
              </button>
            </div>

            {/* Active tag indicator */}
            {selectedTag !== "all" && (
              <div className="active-tag-indicator">
                <span>
                  Teg: <strong>{selectedTag}</strong>
                </span>
                <button onClick={() => handleTagChange("all")}>
                  <IoClose /> Tozalash
                </button>
              </div>
            )}

            {homeLoading ? (
              <Postloading />
            ) : posts.length === 0 ? (
              <h1 className="postloading-message">Hech qanday post topilmadi</h1>
            ) : (
              <>
                <Posts allPosts={posts} handleTagClick={handleTagChange} />
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
          <MemoizedRightPosts randomPost={randomPost} lastPost={latestPost} />
        )}
      </div>

      {/* Filter Drawer */}
      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />
      )}
      <div className={`tag-drawer ${drawerOpen ? "open" : ""}`} ref={drawerRef}>
        <div className="drawer-header">
          <h3>Teglar bo'yicha filter</h3>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)}>
            <IoClose />
          </button>
        </div>
        <div className="drawer-tags">
          <button
            className={`drawer-tag-btn ${selectedTag === "all" ? "active" : ""}`}
            onClick={() => handleTagChange("all")}
          >
            Hammasi
          </button>
          {!tagsLoading &&
            safeTags.map((tag) => (
              <button
                key={tag.id}
                className={`drawer-tag-btn ${selectedTag === tag.name ? "active" : ""}`}
                onClick={() => handleTagChange(tag.name)}
              >
                {tag.name}
              </button>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MainSection;