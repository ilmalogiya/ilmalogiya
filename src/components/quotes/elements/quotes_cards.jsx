import auther_img from "../../../assets/Dostoevsky.jpg"
import { FaRegCopyright } from "react-icons/fa";

const QuotesCards = () => {

    const quotes = [
        {
            id: 1,
            quote: "Mahbusni qochib ketishdan oldini olishni eng yaxshi yo'li bu uni mahbus emasligiga ishontirishdir.",
            author: "Fyodor Dostoevskiy",
            tags: ["Siyosat", "Falsafa"],
        },
        {
            id: 2,
            quote: "Mahbusni qochib ketishdan oldini olishni eng yaxshi yo'li bu uni mahbus emasligiga ishontirishdir.",
            author: "Fyodor Dostoevskiy",
            tags: ["Siyosat", "Falsafa"],
        },
        {
            id: 3,
            quote: "Mahbusni qochib ketishdan oldini olishni eng yaxshi yo'li bu uni mahbus emasligiga ishontirishdir.",
            author: "Fyodor Dostoevskiy",
            tags: ["Siyosat", "Falsafa"],
        },
    ]

    return (
        <div className="quotes-list">
            {quotes.map((quote) => (
                <div key={quote.id} className="quotes-card shadow-elegant">
                    <div className="quotes-left">
                        <img src={auther_img} alt="" />
                    </div>
                    <div className="quotes-right">
                        <div className="post_tags">
                            {quote.tags.map((tag) => (
                                <button key={tag}>
                                    {tag}
                                </button>
                            ))}
                        </div>
                        <q>{quote.quote}</q>
                        <p><FaRegCopyright /><a href="">{quote.author}</a></p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuotesCards;