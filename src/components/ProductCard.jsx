import React from "react";

function ProductCard({ item }) {
  return (
    <div className="col-12">
      <div className="shadow-sm card h-100 d-flex flex-column flex-lg-row">
        {/* 商品圖片區塊 */}
        <div
          className="text-white bg-secondary d-flex align-items-center justify-content-center"
          style={{ width: "100%", height: "160px", flex: "0 0 160px" }}
        >
          商品圖片
        </div>

        {/* 商品資訊區塊 */}
        <div className="card-body d-flex flex-column flex-lg-row justify-content-between">
          <div className="mb-3 mb-lg-0 me-lg-3 flex-grow-1">
            <h6 className="card-title text-truncate fs-5">{item.name}</h6>
            <p className="text-danger fw-bold fs-5">
              ${item.price.toLocaleString()}
            </p>
          </div>

          <div className="flex-grow-1">
            <p className="mb-1">
              <span className="badge bg-warning text-dark">
                類別：{item.category}
              </span>
            </p>
            <p className="mb-0 text-muted small">
              庫存：
              {item.inStock ? (
                <span className="badge bg-success">有貨</span>
              ) : (
                <span className="badge bg-secondary">缺貨</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
