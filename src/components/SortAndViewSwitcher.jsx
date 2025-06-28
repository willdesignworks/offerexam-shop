import { useDispatch, useSelector } from "react-redux";
import { setViewMode, setSortOrder } from "../stores/uiSlice";
import { setLoading } from "../stores/loadingSlice";

function SortAndViewSwitcher() {
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.ui.viewMode);
  const sortOrder = useSelector((state) => state.ui.sortOrder);

  const toggleSort = (field) => {
    dispatch(setLoading(true));
    const isCurrent = sortOrder.field === field;
    const newOrder = isCurrent && sortOrder.order === "asc" ? "desc" : "asc";
    dispatch(setSortOrder({ field, order: newOrder }));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 100);
  };

  return (
    <div className="mb-3 d-flex justify-content-between align-items-center">
      {/* 排序按鈕 */}
      <div className="gap-2 d-flex">
        <button
          className="btn btn-outline-primary"
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
          className="btn btn-outline-primary me-2"
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
          onClick={() => dispatch(setViewMode("card"))}
          title="卡片模式"
        >
          <i className="bi bi-grid-fill fs-5"></i>
        </button>
        <button
          className={`btn ${
            viewMode === "list" ? "text-primary" : "text-secondary"
          }`}
          onClick={() => dispatch(setViewMode("list"))}
          title="條列模式"
        >
          <i className="bi bi-list-ul fs-5"></i>
        </button>
      </div>
    </div>
  );
}

export default SortAndViewSwitcher;
