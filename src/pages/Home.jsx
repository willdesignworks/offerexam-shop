import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// Redux slices
import { setLoading } from "../stores/loadingSlice";
import { setItems, setFilteredItems } from "../stores/productsSlice";
import {
  setCategoryKeyword,
  toggleCategory,
  setInStockOnly,
  setMinPrice,
  setMaxPrice,
} from "../stores/filtersSlice";

// Components
import FilterBar from "../components/FilterBar"; // 篩選列
import SortAndViewSwitcher from "../components/SortAndViewSwitcher"; // 排序,顯示模式
import ProductRow from "../components/ProductRow"; // 條列模式
import ProductCard from "../components/ProductCard"; // 商品
import Pagination from "../components/Pagination"; // 分頁
import Loading from "../components/Loading"; // loading

function Home() {
  // 狀態
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loading); // loading
  const items = useSelector((state) => state.products.items); // 商品資料
  const filteredItems = useSelector((state) => state.products.filteredItems); // 篩選後-商品資料
  const categoryKeyword = useSelector((state) => state.filters.categoryKeyword); // 關鍵字搜尋
  const selectedCategories = useSelector(
    (state) => state.filters.selectedCategories // 類別篩選
  );
  const minPrice = useSelector((state) => state.filters.minPrice); // 價格篩選
  const maxPrice = useSelector((state) => state.filters.maxPrice);
  const inStockOnly = useSelector((state) => state.filters.inStockOnly); // 庫存篩選
  const sortOrder = useSelector((state) => state.ui.sortOrder); // 排序條件
  const viewMode = useSelector((state) => state.ui.viewMode); // 顯示模式 卡片 card 條列 list

  // 畫面呈現,不需跨元件使用
  const [allCategories, setAllCategories] = useState([]); // 商品類別選單
  const [currentPage, setCurrentPage] = useState(1); // 當前頁數
  const [priceFilterFailed, setPriceFilterFailed] = useState(false); // 價格條件錯誤提示
  const itemsPerPage = 3; // 每頁顯示筆數

  // 初始載入資料
  useEffect(() => {
    const fetchItems = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get("/items.json");
        const data = res.data;
        dispatch(setItems(data)); // 資料存入 store
        dispatch(setFilteredItems(data)); // 篩選完的商品存進 Redux

        const categories = [...new Set(data.map((item) => item.category))];
        setAllCategories(categories); // 儲存類別
      } catch (err) {
        console.error("載入失敗", err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchItems();
  }, [dispatch]);

  // 篩選商品，回到第一頁
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredItems.length]);

  // 篩選商品
  const handleFilter = () => {
    dispatch(setLoading(true));
    let filtered = [...items];

    // 關鍵字搜尋
    if (categoryKeyword.trim()) {
      const keyword = categoryKeyword.trim().toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          item.category.toLowerCase().includes(keyword)
      );
    }

    // 類別篩選
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
    // 檢查價格條件
    const priceFiltered = minPrice !== "" || maxPrice !== "";
    const isPriceFail = priceFiltered && filtered.length === 0;

    // 庫存篩選
    if (inStockOnly) {
      filtered = filtered.filter((item) => item.inStock === true);
    }

    // 排序條件
    if (sortOrder.field) {
      filtered.sort((a, b) =>
        sortOrder.order === "asc"
          ? a[sortOrder.field]
              .toString()
              .localeCompare(b[sortOrder.field].toString(), undefined, {
                numeric: sortOrder.field === "price",
              })
          : b[sortOrder.field]
              .toString()
              .localeCompare(a[sortOrder.field].toString(), undefined, {
                numeric: sortOrder.field === "price",
              })
      );
    }

    // 更新篩選結果
    setTimeout(() => {
      dispatch(setFilteredItems(filtered));
      setPriceFilterFailed(isPriceFail);
      dispatch(setLoading(false));
    }, 100);
  };

  // 分頁
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (page) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      setCurrentPage(page);
      dispatch(setLoading(false));
    }, 100);
  };

  return (
    <div className="container py-4">
      {/* 篩選區塊 */}
      <FilterBar
        categoryKeyword={categoryKeyword}
        setCategoryKeyword={(val) => dispatch(setCategoryKeyword(val))}
        allCategories={allCategories}
        selectedCategories={selectedCategories}
        handleCategoryChange={(cat) => dispatch(toggleCategory(cat))}
        inStockOnly={inStockOnly}
        setInStockOnly={(val) => dispatch(setInStockOnly(val))}
        minPrice={minPrice}
        setMinPrice={(val) => dispatch(setMinPrice(val))}
        maxPrice={maxPrice}
        setMaxPrice={(val) => dispatch(setMaxPrice(val))}
        handleFilter={handleFilter}
      />

      {/* 排序與模式切換 */}
      <SortAndViewSwitcher />

      {/* 列表區塊 */}
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

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Home;
