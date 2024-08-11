import { Product } from "../inventory-list/inventory-list.interface";

export const TopSoldProducts = ({
  topSoldProducts,
}: {
  topSoldProducts: any;
}) => {
  return (
    <div className="top-sold-products">
      <h3 className="top-sold-products__title">Top 3 Best Selling Products </h3>
      <ol className="top-sold-products__list-wrapper">
        {topSoldProducts?.map((product: Product) => (
          <li key={product.id}>
            <div className="top-sold-products__list">
              <span className="top-sold-products__list-title">
                {product.name}
              </span>
              <span className="top-sold-products__number"> {product.sold}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
