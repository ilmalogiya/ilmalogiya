import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useQuoteQuery = (slug) => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setQuote(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchQuote = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${BASE_URL}/quotes/${slug}/`);
        if (!res.ok) throw new Error("Hikmatli so'z topilmadi");

        const data = await res.json();
        setQuote(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [slug]);

  return { quote, loading, error };
};
