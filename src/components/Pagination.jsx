import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
  // 產生應該顯示的頁碼陣列（包含「...」的省略符）
  const getPageNumbers = () => {
    const pages = [];

    // 若總頁數 <= 5，則直接列出所有頁碼
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 第一頁一定要顯示
      pages.push(1);

      // 若目前頁面 > 4，則在第一頁與目前頁碼之間顯示「...」
      if (currentPage > 4) {
        pages.push("...");
      }

      // 中間頁碼顯示目前頁的前 1 個、後 3 個（可依需求調整）
      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // 若目前頁小於倒數第 3 頁，則在尾頁之前加上「...」
      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      // 最後一頁一定要顯示
      pages.push(totalPages);
    }

    return pages;
  };

  // 📦 呼叫函式取得實際要顯示的頁碼陣列
  const pages = getPageNumbers();

  return (
    <nav className="mt-4 d-flex justify-content-center">
      <ul
        className="flex-wrap gap-2 pagination d-flex justify-content-center"
        style={{ maxWidth: "100%", overflowX: "auto" }} //  超出時可橫向滾動，適合小螢幕
      >
        {/* 上一頁按鈕 */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className={`page-link text-nowrap ${
              currentPage === 1 ? "bg-secondary text-white border-0" : ""
            }`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            上一頁
          </button>
        </li>

        {/* 省略號 */}
        {pages.map((page, i) =>
          page === "..." ? (
            // 若為省略符號，顯示為 disabled 的 span
            <li key={`ellipsis-${i}`} className="page-item disabled">
              <span className="page-link">…</span>
            </li>
          ) : (
            // 一般數字頁碼按鈕
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link text-nowrap"
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          )
        )}

        {/* 下一頁按鈕 */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className={`page-link text-nowrap ${
              currentPage === totalPages
                ? "bg-secondary text-white border-0"
                : ""
            }`}
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
