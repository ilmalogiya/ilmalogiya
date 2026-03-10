import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { usePostsQuery } from '../../hooks/usePostsQuery';

import './searchbar.scss';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const navigate = useNavigate();

    // Debounce query
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(handler);
    }, [query]);

    // Fetch results based on debounced query
    const { posts: results } = usePostsQuery(1, debouncedQuery);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            localStorage.setItem('searchQuery', query.trim());
            window.dispatchEvent(new CustomEvent('searchChanged'));
            navigate('/');
        }
    };

    return (
        <form className="search" onSubmit={handleSearchSubmit}>
            <input
                type="search"
                placeholder='Qidirish...'
                value={query}
                onChange={handleInputChange}
            />
            <button type='submit'>
                <IoSearchSharp />
            </button>
            {query.trim() !== '' && results.length > 0 && (
                <ul className="search-results">
                    {results.map((post, idx) => (
                        <li key={post.id}>
                            <Link to={`/posts/${post.id}`}>
                                <p>{idx + 1}. {post.title}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
}

export default SearchBar;