import TagsLoading from "../../tagsLoading/tagsLoading"

import "./elements.scss";

function QuotesLoading() {
    return (
        <div className="quotes-loading quotes-list">
            {[...Array(10)].map((_, i) => (
            <div className="quotes-card">
                <div className="quotes-left">
                    <div className="img"></div>
                </div>
                <div className="quotes-right">
                    <TagsLoading count={3} />
                    <div className="quote-text">
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
                    <div className="quote-author"></div>
                </div>
            </div>
            ))}
        </div>
    );
}

export default QuotesLoading;