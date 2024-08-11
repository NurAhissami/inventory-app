import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaExclamationCircle } from "react-icons/fa";

export const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li className="icon-link">
          <Link to="/">
            <FaHome className="icon" />
          </Link>
        </li>
        <li className="icon-link">
          <Link to="/add-product">
            <FaPlus className="icon" />
          </Link>
        </li>
        <li className="icon-link">
          <Link to="/out-of-stock">
            <FaExclamationCircle className="icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
