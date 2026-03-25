import { FaRegCopyright } from "react-icons/fa";
import { Link } from "react-router-dom";

import QuotesLoading from "./quotesLoading";

const QuotesCards = ({quotes}) => {
    if (!quotes || quotes.length === 0) {
        return <QuotesLoading />;
    }

    return (
        <div className="quotes-list">
            {quotes.map((quote) =>{

                return (
                <div key={quote.id} className="quotes-card shadow-elegant">
                    <div className="quotes-left">
                        <img src={quote.author_photo} alt={quote.author_name} />
                    </div>
                    <div className="quotes-right">
                        <div className="post_tags">
                            {quote.tags && quote.tags.map((tag) => (
                                <button key={tag}>
                                    {tag}
                                </button>
                            ))}
                        </div>
                        <Link to={`#`}>
                            <q>{quote.text}</q>
                        </Link>
                        <p>
                            <FaRegCopyright />
                            <Link to={`#`}>
                                {quote.author_name}
                            </Link>
                        </p>
                    </div>
                </div>
            )})}
        </div>
    );
};

export default QuotesCards;