import { useState, useEffect } from "react";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function useTagsQuery() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/tags/`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setTags(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return { tags, loading, error };
}