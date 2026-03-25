import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuoteQuery } from '../../hooks/useQuoteQuery';

const SingleQuote = () => {
    const { slug } = useParams();
    const { quote, loading, error } = useQuoteQuery(slug);

    if (loading) return <div>Yuklanmoqda...</div>;
    if (error) return <div>Xatolik: {error}</div>;
    if (!quote) return <div>Hikmatli so'z topilmadi</div>;

    return (
        <div className="single-quote-page">
            <q>{quote.text}</q>
            <p>— {quote.author_name}</p>
        </div>
    );
};

export default SingleQuote;
