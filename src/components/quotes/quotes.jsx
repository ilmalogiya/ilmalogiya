import "./quotes.scss";
import { useParams, Link } from "react-router-dom";
import { LuSlidersHorizontal } from "react-icons/lu";
import { memo, useState } from "react";
import { useHomeData } from "../../hooks/useHomeData";

import QuotesCards from "./elements/quotes_cards";
import RightPosts from "../rightPosts/rightposts";

const MemoizedRightPosts = memo(RightPosts);

const Quotes = () => {
    const { slug } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    const {
        posts,
        randomPost,
        latestPost,
        pagination,
        loading: homeLoading,
        error: homeError,
    } = useHomeData(currentPage, searchQuery, selectedTags);

    console.log(randomPost, latestPost)


    return (
        <section className="main-section quotes-page">
            <div className="left">
                <div className="search-filterbar">
                    <div className="search-filter-bar">
                        <form className="search-form">
                            <input
                                type="search"
                                placeholder="Qidirish..."
                            />

                            {/* <ul className="search-dropdown">
                                <li>
                                    <Link
                                        to={`/posts/${slug}`}
                                    >
                                        <span className="idx">1.</span>
                                    </Link>
                                </li>
                            </ul> */}
                        </form>

                        <button
                            className={`filter-btn`}
                            title="Teglar bo'yicha filter"
                        >
                            <LuSlidersHorizontal />
                            {/* {selectedTags.length > 0 && (
                                <span className="filter-badge">{selectedTags.length}</span>
                            )} */}
                        </button>
                    </div>
                </div>

                <QuotesCards />
            </div>
            <div className="right">
                <MemoizedRightPosts randomPost={randomPost} lastPost={latestPost} />
            </div>
        </section>
    );
};

export default Quotes;
