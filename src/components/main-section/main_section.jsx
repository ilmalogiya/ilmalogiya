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
import { MdOutlineArticle } from "react-icons/md";
import { FaQuoteRight } from "react-icons/fa";
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
  const [selectedTags, setSelectedTags] = useState([]);

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
  } = useHomeData(currentPage, searchQuery, selectedTags);

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
      setSelectedTags((prevTags) => {
        if (tag === "all") {
          return [];
        }
        
        let newTags;
        if (prevTags.includes(tag)) {
          newTags = prevTags.filter((t) => t !== tag);
        } else {
          if (prevTags.length >= 3) {
            newTags = prevTags; // Maximum 3 tags allowed
            // Optionally, we could show a toast here. For now, just ignore adding more.
          } else {
            newTags = [...prevTags, tag];
          }
        }
        return newTags;
      });
      setCurrentPage(1);
      // Removed setDrawerOpen(false) to allow selecting multiple tags without closing
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
                className={`filter-btn ${selectedTags.length > 0 ? "active" : ""}`}
                onClick={() => setDrawerOpen((prev) => !prev)}
                title="Teglar bo'yicha filter"
              >
                <LuSlidersHorizontal />
                {selectedTags.length > 0 && (
                  <span className="filter-badge">{selectedTags.length}</span>
                )}
              </button>
            </div>

            {/* Active tag indicator */}
            {selectedTags.length > 0 && (
              <div className="active-tag-indicator">
                <span style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  Teglar: 
                  {selectedTags.map((t) => (
                    <strong key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--background)', padding: '2px 8px', borderRadius: '50px' }}>
                      {t}
                      <IoClose 
                        style={{ cursor: 'pointer' }} 
                        onClick={(e) => { e.stopPropagation(); handleTagChange(t); }} 
                      />
                    </strong>
                  ))}
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
            className={`drawer-tag-btn ${selectedTags.length === 0 ? "active" : ""}`}
            onClick={() => { handleTagChange("all"); setDrawerOpen(false); }}
          >
            Hammasi
          </button>
          {!tagsLoading &&
            safeTags.map((tag) => (
              <button
                key={tag.id}
                className={`drawer-tag-btn ${selectedTags.includes(tag.name) ? "active" : ""}`}
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