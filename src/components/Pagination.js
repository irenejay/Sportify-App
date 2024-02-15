import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesToShow = 3; // Adjust the number of pages to show as needed

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);

    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: smooth scrolling animation
    });
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      {currentPage > 1 && (
        <button
          className="btn btn-light"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}

      {generatePageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={`btn ${currentPage === pageNumber ? 'btn-primary' : 'btn-light'}`}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          className="btn btn-light"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
