import React from "react";
import { ProductListProp } from "./product-list.interface";
import { FaDollarSign, FaEdit, FaTrashAlt, FaUndo } from "react-icons/fa";

export const ProductList = ({
  product,
  handleReduceStock,
  handleDeleteProduct,
  openEditModal,
  handleUndo,
  lastAction,
}: ProductListProp) => {
  return (
    <tr key={product?.id} className="product-list">
      <td className="product-list__image-cell">
        {product.imageURL && (
          <img
            className="product-list__image"
            src={product.imageURL}
            alt={product.name}
          />
        )}
        <div className="product-list__name">{product.name}</div>
      </td>
      <td>${product.price.toFixed(2)}</td>
      <td>{product.stock}</td>
      <td>{product.sold}</td>
      <td style={{ width: "150px" }}>
        <button
          className="product-list__button-edit"
          onClick={() => openEditModal(product)}
        >
          <FaEdit />
        </button>
        <button
          className="product-list__button-delete"
          onClick={() => handleDeleteProduct(product.id)}
        >
          <FaTrashAlt />
        </button>
      </td>
      <td>
        <div className="product-list__button-wrapper">
          <button
            className="product-list__button-sell"
            onClick={() =>
              handleReduceStock(product.id, product.stock, product.sold)
            }
          >
            SELL ONE <FaDollarSign />
          </button>
          <button
            className="product-list__button-undo"
            onClick={handleUndo}
            disabled={!lastAction || lastAction.id !== product.id}
          >
            <FaUndo />
          </button>
        </div>
      </td>
    </tr>
  );
};
