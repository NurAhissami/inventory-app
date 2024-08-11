import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Modal from "react-modal";
import { Product } from "./inventory-list.interface";
import { ProductList } from "../product-list/product-list";
import { TotalSold } from "../total-sold";
import { Stock } from "../stock";
import { TopSoldProducts } from "../top-sold-products";
import {
  FaSearch,
  FaSort,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";

Modal.setAppElement("#root");

export const InventoryList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState("");
  const [editStock, setEditStock] = useState(0);
  const [editPrice, setEditPrice] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<string>("");
  const [lastAction, setLastAction] = useState<{
    id: string;
    previousStock: number;
    previousSold: number;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsData: Product[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        productsData.push({
          id: doc.id,
          name: data.name,
          stock: data.stock,
          sold: data.sold,
          imageURL: data.imageURL,
          price: data.price,
        });
      });
      setProducts(productsData);
      setFilteredProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSortBy = (type: string, direction: string) => {
    setSortType(type);
    setSortDirection(direction);

    let sortedProducts = [...filteredProducts];
    if (type === "name") {
      sortedProducts.sort((a, b) =>
        direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    } else if (type === "price") {
      sortedProducts.sort((a, b) =>
        direction === "asc" ? a.price - b.price : b.price - a.price
      );
    } else if (type === "stock") {
      sortedProducts.sort((a, b) =>
        direction === "asc" ? a.stock - b.stock : b.stock - a.stock
      );
    } else if (type === "sold") {
      sortedProducts.sort((a, b) =>
        direction === "asc" ? a.sold - b.sold : b.sold - a.sold
      );
    }
    setFilteredProducts(sortedProducts);
  };

  const handleReduceStock = async (
    id: string,
    currentStock: number,
    sold: number
  ) => {
    if (currentStock > 0) {
      try {
        const productDoc = doc(db, "products", id);
        await updateDoc(productDoc, {
          stock: currentStock - 1,
          sold: sold + 1,
        });
        setLastAction({ id, previousStock: currentStock, previousSold: sold });
      } catch (error) {
        console.error("Error al reducir el stock:", error);
      }
    } else {
      alert("No hay stock disponible para reducir");
    }
  };

  const handleUndo = async () => {
    if (lastAction) {
      const { id, previousStock, previousSold } = lastAction;
      try {
        const productDoc = doc(db, "products", id);
        await updateDoc(productDoc, {
          stock: previousStock,
          sold: previousSold,
        });
        setLastAction(null);
      } catch (error) {
        console.error("Error al deshacer la acción:", error);
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        const productDoc = doc(db, "products", id);
        await deleteDoc(productDoc);
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditStock(product.stock);
    setEditPrice(product.price);
    setModalIsOpen(true);
  };

  const closeEditModal = () => {
    setModalIsOpen(false);
    setEditingProduct(null);
  };

  const handleEditProduct = async () => {
    if (editingProduct) {
      const productDoc = doc(db, "products", editingProduct.id);
      try {
        await updateDoc(productDoc, {
          name: editName,
          stock: editStock,
          price: editPrice,
        });
        closeEditModal();
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
      }
    }
  };

  const totalSoldPrice = products.reduce((total, product) => {
    return total + product.sold * product.price;
  }, 0);

  const totalStock = products.reduce((total, product) => {
    return total + product.stock;
  }, 0);

  const outOfStockProducts = products.filter((product) => product.stock === 0);
  const outOfStockCount = outOfStockProducts.length;

  const handleToggleOutOfStock = () => {
    setShowOutOfStock(!showOutOfStock);
  };

  const topSoldProducts = products.sort((a, b) => b.sold - a.sold).slice(0, 3);

  return (
    <div className="inventory-list">
      <h1 className="inventory-list__title">Inventory</h1>
      <div className="inventory-list__boxes">
        <TotalSold totalSoldPrice={totalSoldPrice} />
        <Stock
          totalStock={totalStock}
          outOfStockCount={outOfStockCount}
          handleToggleOutOfStock={handleToggleOutOfStock}
          showOutOfStock={showOutOfStock}
          outOfStockProducts={outOfStockProducts}
        />
        {topSoldProducts.length > 0 && (
          <TopSoldProducts topSoldProducts={topSoldProducts} />
        )}
      </div>
      <div className="inventory-list__controls">
        <div className="inventory-list__search">
          <FaSearch />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="filter by"
          />
        </div>
        <div className="inventory-list__sort">
          <button className="inventory-list__sort-button">
            <span className="inventory-list__sort-button-title">
              {sortType ? `${sortType} (${sortDirection})` : "Order"}
            </span>
            <FaSort />
          </button>
          <div className="inventory-list__sort-menu">
            <button onClick={() => handleSortBy("name", "asc")}>
              Name asc
            </button>
            <button onClick={() => handleSortBy("name", "desc")}>
              Name desc
            </button>
            <button onClick={() => handleSortBy("price", "asc")}>
              price asc
            </button>
            <button onClick={() => handleSortBy("price", "desc")}>
              price desc
            </button>
            <button onClick={() => handleSortBy("stock", "asc")}>
              Stock asc
            </button>
            <button onClick={() => handleSortBy("stock", "desc")}>
              Stock desc
            </button>
            <button onClick={() => handleSortBy("sold", "asc")}>
              sold asc
            </button>
            <button onClick={() => handleSortBy("sold", "desc")}>
              sold desc
            </button>
          </div>
        </div>
      </div>
      <table className="product-list__table">
        <thead>
          <tr>
            <th className="product-list__title">Product</th>
            <th className="product-list__title">Stock</th>
            <th className="product-list__title">Sold</th>
            <th className="product-list__title">Price</th>
            <th className="product-list__title">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <ProductList
              key={product.id}
              product={product}
              handleReduceStock={handleReduceStock}
              handleDeleteProduct={handleDeleteProduct}
              openEditModal={openEditModal}
              handleUndo={handleUndo}
              lastAction={lastAction}
            />
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Product"
        className="product-modal"
        overlayClassName="product-modal-overlay"
      >
        <h2 className="product-modal__title">Edit Product</h2>
        <div className="product-modal__form">
          <label className="product-modal__label">Name:</label>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="product-modal__input"
          />
          <label className="product-modal__label">Stock:</label>
          <input
            type="number"
            value={editStock}
            onChange={(e) => setEditStock(parseInt(e.target.value))}
            className="product-modal__input"
          />
          <label className="product-modal__label">Price:</label>
          <input
            type="number"
            value={editPrice}
            onChange={(e) => setEditPrice(parseFloat(e.target.value))}
            className="product-modal__input"
          />
          <div className="product-modal__actions">
            <button
              onClick={handleEditProduct}
              className="product-modal__button"
            >
              Save
            </button>
            <button onClick={closeEditModal} className="product-modal__button">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
