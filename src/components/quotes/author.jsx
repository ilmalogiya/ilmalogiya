import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuthorQuery } from '../../hooks/useAuthorQuery';

const Author = () => {
    const { slug } = useParams();
    const { author, loading, error } = useAuthorQuery(slug);

    if (loading) return <div>Yuklanmoqda...</div>;
    if (error) return <div>Xatolik: {error}</div>;
    if (!author) return <div>Muallif topilmadi</div>;

    return (
        <div>
            <h1>{author.name}</h1>
            <p>author page</p>
        </div>
    );
};

export default Author;
