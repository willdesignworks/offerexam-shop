import React from "react";

function FilterBar({
  categoryKeyword,
  setCategoryKeyword,
  allCategories,
  selectedCategories,
  handleCategoryChange,
  inStockOnly,
  setInStockOnly,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  handleFilter,
}) {
  return (
    <div className="mb-4 border rounded bg-light">
      <div className="row g-0 align-items-stretch">
        {/* 垂直標題 */}
        <div
          className="p-3 text-white bg-secondary d-flex justify-content-center align-items-center"
          style={{
            writingMode: "vertical-rl",
            WebkitWritingMode: "vertical-rl",
            textOrientation: "upright",
            width: "auto",
            fontWeight: "bold",
          }}
        >
          篩選條件
        </div>

        {/* 右側主體區塊 */}
        <div className="p-3 col">
          <div className="row g-3 align-items-center">
            <div className="gap-2 col-md-12 d-flex align-items-center">
              {/* 關鍵字 */}
              <span>搜尋商品：</span>
              <div className="gap-2 col-md-5 d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="搜尋商品名稱或類別"
                  value={categoryKeyword}
                  onChange={(e) => setCategoryKeyword(e.target.value)}
                />
              </div>
            </div>

            {/* 價格範圍 */}
            <div className="flex-wrap gap-2 col-md-12 d-flex align-items-center">
              <div>價錢區間：</div>
              <div className="gap-2 col-md-5 d-flex">
                <input
                  type="number"
                  className="form-control"
                  placeholder="最低價"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span>–</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="最高價"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            {/* 類別多選 */}
            <div className="gap-2 d-flex flex-column flex-md-row align-items-start col-md-6">
              <span>僅顯示類別：</span>
              <div className="gap-2 d-flex flex-md-row align-items-start">
                {allCategories.map((cat, i) => (
                  <div className="form-check" key={i}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`cat-${i}`}
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    <label className="form-check-label" htmlFor={`cat-${i}`}>
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* 庫存與按鈕 */}
            <div className="gap-2 col-md-6 d-flex justify-content-end align-items-center">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="inStockOnly"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="inStockOnly">
                  僅顯示有庫存
                </label>
              </div>
              <button className="btn btn-primary" onClick={handleFilter}>
                確定篩選
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
