import React, { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/main.scss";
import { AddProductForm } from "./components/add-product-form";
import { InventoryList } from "./components/inventory-list";
import { OutOfStockList } from "./components/out-of-stock-list";
import { Sidebar } from "./components/sidebar";

const App: FC = () => {
  return (
    <Router>
      <div className="app container">
        <Sidebar />
        <main className="app__main-content">
          <Routes>
            <Route path="/" element={<InventoryList />} />
            <Route path="/add-product" element={<AddProductForm />} />
            <Route path="/out-of-stock" element={<OutOfStockList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
