import "./quotes.scss";
import { useParams, Link } from "react-router-dom";
import { LuSlidersHorizontal } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { memo, useState } from "react";
import { useQuotesPageData } from "../../hooks/useQuotesPageData";

import QuotesCards from "./elements/quotes_cards";
import RightPosts from "../rightPosts/rightposts";

const MemoizedRightPosts = memo(RightPosts);

const Quotes = () => {
    const { slug } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    const [inputValue, setInputValue] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(inputValue.trim());
        setCurrentPage(1);
    };

    const handleTagChange = (tag) => {
        setSelectedTags((prevTags) => {
            if (tag === "all") return [];
            if (prevTags.includes(tag)) {
                return prevTags.filter((t) => t !== tag);
            } else {
                return prevTags.length >= 3 ? prevTags : [...prevTags, tag];
            }
        });
        setCurrentPage(1);
    };

    const {
        tags,
        quotes,
        randomPost,
        latestPost,
        pagination,
        loading: homeLoading,
        error: homeError,
    } = useQuotesPageData(currentPage, searchQuery, selectedTags);

    return (
        <section className="main-section quotes-page">
            <div className="left">
                <div className="search-filterbar">
                    <div className="search-filter-bar">
                        <form className="search-form" onSubmit={handleSearchSubmit}>
                            <input
                                type="search"
                                placeholder="Qidirish..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
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
                </div>

                <QuotesCards quotes={quotes}/>
            </div>
            <div className="right">
                <MemoizedRightPosts randomPost={randomPost} lastPost={latestPost} />
            </div>

            {/* Filter Drawer */}
            {drawerOpen && (
                <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />
            )}
            <div className={`tag-drawer ${drawerOpen ? "open" : ""}`}>
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
                    {tags && tags.length > 0 && tags.map((tag, i) => {
                        const tagName = tag.name || tag;
                        const tagKey = tag.id || tagName || i;
                        return (
                            <button
                                key={tagKey}
                                className={`drawer-tag-btn ${selectedTags.includes(tagName) ? "active" : ""}`}
                                onClick={() => handleTagChange(tagName)}
                            >
                                {tagName}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Quotes;
