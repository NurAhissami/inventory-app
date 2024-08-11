import { Product } from "../inventory-list/inventory-list.interface";
import { StockProp } from "./stock.interface";

export const Stock = ({
  totalStock,
  outOfStockCount,
  handleToggleOutOfStock,
  showOutOfStock,
  outOfStockProducts,
}: StockProp) => {
  return (
    <div className="stock">
      <div className="stock__wrapper">
        <h3 className="stock__title">Stock </h3>
        <div className="stock__number">{totalStock}</div>
      </div>
      <div className="stock__wrapper">
        <h4 className="stock__title">Out of stock</h4>
        <div className="stock__number">{outOfStockCount}</div>
      </div>
    </div>
  );
};
