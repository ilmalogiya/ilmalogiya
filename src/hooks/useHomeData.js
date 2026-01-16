import { useState, useEffect } from "react";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function useHomeData(page = 1) {
  // Barcha turdagi ma'lumotlar uchun state
  const [data, setData] = useState({
    tags: [],
    posts: [],
    randomPost: null,
    latestPost: null,
  });
  
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Siz ko'rsatgan JSON /home/ endpointidan kelayotganini hisobga olsak:
        let url = `${BASE_URL}/home/?page=${page}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Xatolik yuz berdi: ${res.status}`);

        const result = await res.json();

        // Ma'lumotlarni state'ga joylaymiz
        setData({
          tags: result.tags || [],
          posts: result.posts?.results || [],
          randomPost: result.random_post || null,
          latestPost: result.latest_post || null,
        });

        // Pagination ma'lumotlari
        setPagination({
          count: result.posts?.count || 0,
          next: result.posts?.next,
          previous: result.posts?.previous,
          // Agar har bir sahifada 10 ta post bo'lsa:
          totalPages: result.posts?.count ? Math.ceil(result.posts.count / 10) : 1,
        });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [page]); // Sahifa o'zgarganda qayta chaqiriladi

  return { 
    tags: data.tags,
    posts: data.posts,
    randomPost: data.randomPost,
    latestPost: data.latestPost,
    pagination, 
    loading, 
    error 
  };
}