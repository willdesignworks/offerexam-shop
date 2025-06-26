import React from "react";

function SortAndViewSwitcher({ sortOrder, toggleSort, viewMode, setViewMode }) {
  return (
    <div className="mb-3 d-flex justify-content-between align-items-center">
      {/* 排序按鈕 */}
      <div className="gap-2 d-flex">
        <button
          className="gap-1 btn btn-outline-primary d-flex align-items-center"
          onClick={() => toggleSort("name")}
        >
          名稱
          <i
            className={`bi ${
              sortOrder.field === "name"
                ? sortOrder.order === "asc"
                  ? "bi-chevron-up"
                  : "bi-chevron-down"
                : "bi-chevron-expand"
            }`}
          ></i>
        </button>

        <button
          className="gap-1 btn btn-outline-primary d-flex align-items-center"
          onClick={() => toggleSort("price")}
        >
          價格
          <i
            className={`bi ${
              sortOrder.field === "price"
                ? sortOrder.order === "asc"
                  ? "bi-chevron-up"
                  : "bi-chevron-down"
                : "bi-chevron-expand"
            }`}
          ></i>
        </button>
      </div>

      {/* 顯示模式切換 */}
      <div className="gap-2 d-flex">
        <button
          className={`btn ${
            viewMode === "card" ? "text-primary" : "text-secondary"
          }`}
          onClick={() => setViewMode("card")}
          title="卡片模式"
        >
          <i className="bi bi-grid-fill fs-5"></i>
        </button>
        <button
          className={`btn ${
            viewMode === "list" ? "text-primary" : "text-secondary"
          }`}
          onClick={() => setViewMode("list")}
          title="條列模式"
        >
          <i className="bi bi-list-ul fs-5"></i>
        </button>
      </div>
    </div>
  );
}

export default SortAndViewSwitcher;
