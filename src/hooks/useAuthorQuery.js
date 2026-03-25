import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuthorQuery = (slug) => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setAuthor(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchAuthor = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${BASE_URL}/authors/${slug}/`);
        if (!res.ok) throw new Error("Muallif topilmadi");

        const data = await res.json();
        setAuthor(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [slug]);

  return { author, loading, error };
};
