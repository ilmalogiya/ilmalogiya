import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useSidebarData() {
  const [randomPost, setRandomPost] = useState(null);
  const [lastPost, setLastPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // YANGI: xatoni saqlash uchun

  useEffect(() => {
    const fetchSidebar = async () => {
      try {
        const [randomRes, lastRes] = await Promise.all([
          fetch(`${BASE_URL}/posts/random/`),
          fetch(`${BASE_URL}/posts/latest/`)
        ]);

        // 1. HAR BIR RES uchun statusni tekshirish
        if (!randomRes.ok) {
          const text = await randomRes.text();
          console.error("Random post xato:", randomRes.status, text);
          throw new Error(`Random post: ${randomRes.status} ${randomRes.statusText}`);
        }
        if (!lastRes.ok) {
          const text = await lastRes.text();
          console.error("Latest post xato:", lastRes.status, text);
          throw new Error(`Latest post: ${lastRes.status} ${lastRes.statusText}`);
        }

        // 2. Content-Type ni tekshirish
        const randomContentType = randomRes.headers.get("content-type");
        const lastContentType = lastRes.headers.get("content-type");

        if (!randomContentType?.includes("application/json")) {
          const text = await randomRes.text();
          console.error("Random post JSON emas:", text);
          throw new Error("Random post: JSON emas, HTML qaytdi");
        }
        if (!lastContentType?.includes("application/json")) {
          const text = await lastRes.text();
          console.error("Latest post JSON emas:", text);
          throw new Error("Latest post: JSON emas");
        }

        // 3. Endi xavfsiz .json() chaqiramiz
        const randomData = await randomRes.json();
        const lastData = await lastRes.json();

        setRandomPost(randomData);
        setLastPost(Array.isArray(lastData) ? lastData[0] : lastData);

      } catch (err) {
        console.error("Sidebar yuklashda xato:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSidebar();
  }, []);

  return { randomPost, lastPost, loading, error }; // error qaytaramiz
}