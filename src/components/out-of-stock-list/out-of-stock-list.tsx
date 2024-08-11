import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Product } from "../inventory-list/inventory-list.interface";

export const OutOfStockList: React.FC = () => {
  const [outOfStockProducts, setOutOfStockProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsData: Product[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.stock === 0) {
          productsData.push({
            id: doc.id,
            name: data.name,
            stock: data.stock,
            sold: data.sold,
            imageURL: data.imageURL,
            price: data.price,
          });
        }
      });
      setOutOfStockProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Productos fuera de stock</h2>
      <table className="product-list__table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Demand</th>
          </tr>
        </thead>
        <tbody>
          {outOfStockProducts.map((product) => (
            <tr key={product.id}>
              <td>
                {product.imageURL && (
                  <img
                    className="product-list__image"
                    src={product.imageURL}
                    alt={product.name}
                  />
                )}
                <strong>{product.name}</strong>
              </td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
