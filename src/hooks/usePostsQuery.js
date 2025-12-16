import { useState, useEffect } from "react";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function usePostsQuery(page = 1, search = "", tag = "all") {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let url = `${BASE_URL}/posts/?page=${page}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (tag && tag !== "all") url += `&tag=${encodeURIComponent(tag)}`;

        const res = await fetch(url); 
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setPosts(data.results || []);
        setPagination({
          count: data.count,
          next: data.next,
          previous: data.previous,
          totalPages: data.count ? Math.ceil(data.count / 10) : 1,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, search, tag]);

  return { posts, pagination, loading, error };
}