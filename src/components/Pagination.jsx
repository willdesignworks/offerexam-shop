import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
  // 取得應顯示的頁碼陣列（包含省略符號 "..."）
  const getPageNumbers = () => {
    const pages = [];

    // 若總頁數小於等於 5，則直接顯示所有頁碼
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // 顯示第一頁

      // 當前頁面 > 4 時，中間加上省略符號
      if (currentPage > 4) {
        pages.push("...");
      }

      // 顯示當前頁的前後各一頁（確保在第一頁與最後一頁範圍內）
      const start = Math.max(2, currentPage - 5);
      const end = Math.min(totalPages - 1, currentPage + 5);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // 若當前頁小於倒數第 3 頁，再加省略符號
      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      pages.push(totalPages); // 顯示最後一頁
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav className="mt-4 d-flex justify-content-center">
      <ul className="gap-3 pagination">
        {/* 上一頁按鈕：若已在第一頁則禁用 */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            上一頁
          </button>
        </li>

        {/* 顯示頁碼區塊，包括數字與省略符號 */}
        {pages.map((page, i) =>
          page === "..." ? (
            // 若為 "..." 則顯示為 disabled 的 li
            <li key={`ellipsis-${i}`} className="page-item disabled">
              <span className="page-link">…</span>
            </li>
          ) : (
            // 正常頁碼按鈕：當前頁加上 active 樣式
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          )
        )}

        {/* 下一頁按鈕：若已在最後一頁則禁用 */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            下一頁
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
