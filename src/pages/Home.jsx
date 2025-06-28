import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// 各個元件導入
import FilterBar from "../components/FilterBar"; // 篩選條件區塊（包含搜尋欄、類別多選、價格區間、庫存）
import SortAndViewSwitcher from "../components/SortAndViewSwitcher"; // 排序按鈕與視圖切換按鈕
import ProductCard from "../components/ProductCard"; // 商品卡片樣式
import ProductRow from "../components/ProductRow"; // 商品列表樣式（表格列）
import Pagination from "../components/Pagination"; // 分頁元件

import Loading from "../components/Loading"; // 讀取元件
import { setLoading } from "../stores/loading"; // 讀取元件-Redux

function Home() {
  // 原始資料與篩選後資料
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  // 讀取元件
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  // 分類相關
  const [allCategories, setAllCategories] = useState([]); // 所有分類
  const [selectedCategories, setSelectedCategories] = useState([]); // 使用者勾選的分類
  const [categoryKeyword, setCategoryKeyword] = useState(""); // 關鍵字搜尋

  // 篩選條件：庫存
  const [inStockOnly, setInStockOnly] = useState(false);

  // 篩選條件：價格
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceFilterFailed, setPriceFilterFailed] = useState(false);

  // 排序條件
  const [sortOrder, setSortOrder] = useState({ field: null, order: null });

  // 顯示模式：卡片/列表
  const [viewMode, setViewMode] = useState("card");

  // 分頁狀態
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 每頁顯示數量

  // 第一次載入時從 items.json 取得商品資料
  useEffect(() => {
    const fetchItems = async () => {
      dispatch(setLoading(true)); // 讀取元件-載入
      try {
        const res = await axios.get("/items.json");
        const products = res.data;
        setItems(products);
        setFilteredItems(products);
        // 自動萃取所有分類（用 Set 去除重複）
        const categories = [...new Set(products.map((item) => item.category))];
        setAllCategories(categories);
      } catch (error) {
        console.error("載入失敗：", error);
      } finally {
        dispatch(setLoading(false)); // 讀取元件-完成
      }
    };
    fetchItems();
  }, [dispatch]);

  // 當篩選條件導致資料變動時，重設分頁為第一頁
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredItems.length]);

  // 切換分類勾選
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // 篩選商品邏輯
  const handleFilter = () => {
    dispatch(setLoading(true)); // 讀取元件-載入
    let filtered = [...items];

    // 關鍵字搜尋
    if (categoryKeyword.trim() !== "") {
      const keyword = categoryKeyword.trim().toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          item.category.toLowerCase().includes(keyword)
      );
    }

    // 分類勾選
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    // 價格篩選
    if (minPrice !== "") {
      filtered = filtered.filter((item) => item.price >= parseInt(minPrice));
    }
    if (maxPrice !== "") {
      filtered = filtered.filter((item) => item.price <= parseInt(maxPrice));
    }
    // 是否有價格範圍篩選失敗
    const priceFiltered = minPrice !== "" || maxPrice !== "";
    const isPriceFail = priceFiltered && filtered.length === 0;

    // 僅顯示有庫存
    if (inStockOnly) {
      filtered = filtered.filter((item) => item.inStock === true);
    }

    setTimeout(() => {
      setFilteredItems(filtered);
      setPriceFilterFailed(isPriceFail); // 價格失敗
      dispatch(setLoading(false)); // 讀取元件-完成
    }, 100); // 讀取元件-延遲
  };

  // 排序邏輯（可切換升序或降序）
  const toggleSort = (field) => {
    dispatch(setLoading(true));
    const isCurrent = sortOrder.field === field;
    const newOrder = isCurrent && sortOrder.order === "asc" ? "desc" : "asc";
    const sorted = [...filteredItems].sort((a, b) =>
      newOrder === "asc"
        ? a[field].toString().localeCompare(b[field].toString(), undefined, {
            numeric: field === "price",
          })
        : b[field].toString().localeCompare(a[field].toString(), undefined, {
            numeric: field === "price",
          })
    );
    setSortOrder({ field, order: newOrder });
    setFilteredItems(sorted);
    setTimeout(() => {
      dispatch(setLoading(false)); // 讀取元件-完成
    }, 100); // 讀取元件-延遲
  };

  // 分頁邏輯
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // 顯示模式
  const handlePageChange = (pageNumber) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      setCurrentPage(pageNumber); // 正確：切換分頁
      dispatch(setLoading(false));
    }, 100);
  };

  return (
    <div className="container py-4">
      {/* 篩選條件區塊 */}
      <FilterBar
        categoryKeyword={categoryKeyword}
        setCategoryKeyword={setCategoryKeyword}
        allCategories={allCategories}
        selectedCategories={selectedCategories}
        handleCategoryChange={handleCategoryChange}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        handleFilter={handleFilter}
      />

      {/* 排序與模式切換 */}
      <SortAndViewSwitcher
        sortOrder={sortOrder}
        toggleSort={toggleSort}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* 商品列表呈現（卡片或列表） */}
      {loading ? (
        <Loading />
      ) : filteredItems.length === 0 ? (
        <div className="text-center alert alert-warning w-100">
          {priceFilterFailed
            ? "查無符合的價格區間，請重新調整價格範圍"
            : "查無符合條件的商品"}
        </div>
      ) : viewMode === "card" ? (
        <div className="row g-3">
          {currentItems.map((item) => (
            <ProductCard key={item.name} item={item} />
          ))}
        </div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>商品名稱</th>
              <th>價格</th>
              <th>分類</th>
              <th>庫存</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <ProductRow key={item.name} item={item} />
            ))}
          </tbody>
        </table>
      )}

      {/* 分頁區塊 */}
      {!loading && filteredItems.length > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Home;
