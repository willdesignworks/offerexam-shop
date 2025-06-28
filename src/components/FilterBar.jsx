import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryKeyword,
  toggleCategory,
  setMinPrice,
  setMaxPrice,
  setInStockOnly,
} from "../stores/filtersSlice";

function FilterBar({ allCategories, handleFilter }) {
  const dispatch = useDispatch();
  const {
    categoryKeyword,
    selectedCategories,
    inStockOnly,
    minPrice,
    maxPrice,
  } = useSelector((state) => state.filters);

  return (
    <div className="mb-4 border rounded bg-light">
      <div className="row g-0 align-items-stretch">
        {/* 垂直標題 */}
        <div className="text-white bg-secondary fw-bold col-md-1 d-md-flex justify-content-center align-items-stretch">
          <div className="py-2 text-center d-block d-md-none w-100">
            篩選條件
          </div>
          <div
            className="px-3 d-none d-md-flex justify-content-center align-items-center"
            style={{
              writingMode: "vertical-rl",
              WebkitWritingMode: "vertical-rl",
              textOrientation: "upright",
              width: "auto",
              fontWeight: "bold",
            }}
          >
            <div className="">篩選條件</div>
          </div>
        </div>
        {/* 右側主體區塊 */}
        <div className="p-3 col-md-11">
          <div className="row g-3 align-items-center">
            <div className="gap-2 col-md-12 d-flex align-items-center">
              {/* 關鍵字搜尋 */}
              <span>搜尋商品：</span>
              <div className="gap-2 col-md-5 d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="輸入關鍵字搜尋"
                  value={categoryKeyword}
                  onChange={(e) => dispatch(setCategoryKeyword(e.target.value))}
                />
              </div>
            </div>

            {/* 價格區間 */}
            <div className="flex-wrap gap-2 col-md-12 d-flex align-items-center">
              <div>價錢區間：</div>
              <div className="gap-2 col-md-5 d-flex">
                <input
                  type="number"
                  className="form-control"
                  placeholder="最低價"
                  value={minPrice}
                  onChange={(e) => dispatch(setMinPrice(e.target.value))}
                />
                <span>–</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="最高價"
                  value={maxPrice}
                  onChange={(e) => dispatch(setMaxPrice(e.target.value))}
                />
              </div>
            </div>

            {/* 類別多選 */}
            <div className="gap-2 d-flex flex-column flex-md-row align-items-center align-items-md-start col-md-6">
              <span>僅顯示類別：</span>
              <div className="gap-2 d-flex flex-column flex-lg-row">
                {allCategories.map((cat) => (
                  <div className="form-check form-check-inline" key={cat}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => dispatch(toggleCategory(cat))}
                      id={`cat-${cat}`}
                    />
                    <label className="form-check-label" htmlFor={`cat-${cat}`}>
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* 庫存與按鈕 */}
            <div className="gap-2 col-md-6 d-flex flex-column flex-md-row justify-content-end align-items-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => dispatch(setInStockOnly(e.target.checked))}
                  id="inStockOnly"
                />
                <label className="form-check-label" htmlFor="inStockOnly">
                  僅顯示有庫存商品
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
