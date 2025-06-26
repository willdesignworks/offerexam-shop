import React from "react";

function ProductRow({ item }) {
  return (
    <tr>
      <td>{item.name}</td>
      <td>${item.price.toLocaleString()}</td>
      <td>{item.category}</td>
      <td>
        {item.inStock ? (
          <span className="badge bg-success">有貨</span>
        ) : (
          <span className="badge bg-secondary">缺貨</span>
        )}
      </td>
    </tr>
  );
}

export default ProductRow;
