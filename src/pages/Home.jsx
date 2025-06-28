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
import FilterBar from "../components/FilterBar";
import SortAndViewSwitcher from "../components/SortAndViewSwitcher";
import ProductCard from "../components/ProductCard";
import ProductRow from "../components/ProductRow";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

function Home() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loading);
  const items = useSelector((state) => state.products.items);
  const filteredItems = useSelector((state) => state.products.filteredItems);
  const categoryKeyword = useSelector((state) => state.filters.categoryKeyword);
  const selectedCategories = useSelector(
    (state) => state.filters.selectedCategories
  );
  const inStockOnly = useSelector((state) => state.filters.inStockOnly);
  const minPrice = useSelector((state) => state.filters.minPrice);
  const maxPrice = useSelector((state) => state.filters.maxPrice);
  const sortOrder = useSelector((state) => state.ui.sortOrder);
  const viewMode = useSelector((state) => state.ui.viewMode);

  const [allCategories, setAllCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilterFailed, setPriceFilterFailed] = useState(false);
  const itemsPerPage = 3;

  // 初始載入資料
  useEffect(() => {
    const fetchItems = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get("/items.json");
        const data = res.data;
        dispatch(setItems(data));
        dispatch(setFilteredItems(data));

        const categories = [...new Set(data.map((item) => item.category))];
        setAllCategories(categories);
      } catch (err) {
        console.error("載入失敗", err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchItems();
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredItems.length]);

  // 篩選商品
  const handleFilter = () => {
    dispatch(setLoading(true));
    let filtered = [...items];

    // 關鍵字
    if (categoryKeyword.trim()) {
      const keyword = categoryKeyword.trim().toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          item.category.toLowerCase().includes(keyword)
      );
    }

    // 類別
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    // 價格
    if (minPrice !== "") {
      filtered = filtered.filter((item) => item.price >= parseInt(minPrice));
    }
    if (maxPrice !== "") {
      filtered = filtered.filter((item) => item.price <= parseInt(maxPrice));
    }

    // 價格失敗
    const priceFiltered = minPrice !== "" || maxPrice !== "";
    const isPriceFail = priceFiltered && filtered.length === 0;

    // 庫存
    if (inStockOnly) {
      filtered = filtered.filter((item) => item.inStock === true);
    }

    // 排序
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
