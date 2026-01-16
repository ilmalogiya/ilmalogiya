import "./pagination.scss";

const Pagination = ({ pagination, currentPage, onPageChange }) => {
  const totalPages = pagination.totalPages || 
                    (pagination.count ? Math.ceil(pagination.count / 10) : 1);

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  // Agar 1 sahifa bo‘lsa — pagination ko‘rsatmaslik
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="dots">...</span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;