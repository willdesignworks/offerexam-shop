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
    <div className="p-3 mb-4 border rounded bg-light">
      <div className="row g-3 align-items-center">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="搜尋商品名稱或類別"
            value={categoryKeyword}
            onChange={(e) => setCategoryKeyword(e.target.value)}
          />
        </div>

        <div className="flex-wrap gap-2 col-md-6 d-flex">
          類別:
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

        <div className="col-md-3 d-flex align-items-center">
          <div className="form-check me-2">
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
        </div>

        <div className="gap-2 col-md-3 d-flex">
          <input
            type="number"
            className="form-control"
            placeholder="最低價"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            className="form-control"
            placeholder="最高價"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleFilter}>
            確定篩選
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
