import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { filterSide } from "../../Constants/Index";
import "./Product.css";
import ProductCard from "./ProductCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import { useSelector } from "react-redux";
const ProductList = () => {
  const [sortOption, setSortOption] = useState("price_low_to_high");
  const { product, loading, error } = useSelector(
    (state) => state.productSlice
  );
  const { catId } = useParams();

  const [products, setproducts] = useState([]);

  const filterCategory = (name, product) => {
    let res = product.filter((product) => {
      return name === product.category;
    });
    setproducts(sort(res));
  };

  useEffect(() => {
    filterCategory(catId, product);
  }, [catId, product, sortOption]);

  // useEffect(() => {
  //   filterCategory(catId, product);
  // }, [catId, sortOption, loading, product]);

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const sort = (products) => {
    return [...products].sort((a, b) => {
      if (sortOption === "price_low_to_high") {
        return a.price - b.price;
      } else if (sortOption === "price_high_to_low") {
        return b.price - a.price;
      }
    });
  };

  const renderProducts = (
    <div className="container">
      {error.length > 0 && <div className="alert alert-danger"> {error}</div>}
      <div className="row">
        <div className="col-lg-3">
          <h2 className="subcategory-heading text-center">{filterSide}</h2>
          <ul className="list-group subcategory">
            <li className="list-group-item">
              <span className="sort-by-heading">Sort by</span>
            </li>
            <li className="list-group-item">
              <span className="sort-by-item">
                <input
                  type="radio"
                  id="lth"
                  name="sortOption"
                  value="price_low_to_high"
                  checked={sortOption === "price_low_to_high"}
                  onChange={handleSortOptionChange}
                />
                <label htmlFor="lth"> Price low to high </label>
              </span>
              <span className="sort-by-item">
                <input
                  type="radio"
                  id="htl"
                  name="sortOption"
                  value="price_high_to_low"
                  checked={sortOption === "price_high_to_low"}
                  onChange={handleSortOptionChange}
                />
                <label htmlFor="htl"> Price high to low </label>
              </span>
            </li>
          </ul>
        </div>
        <div className="col-lg-9">
          <h1 className="text-center all-product-heading">{catId}</h1>
          <div className="row">
            {products.length ? (
              products.map((product) => (
                <ProductCard data={product} key={product.id} />
              ))
            ) : (
              <div className="col-sm-12">
                <div className="alert alert-danger">
                  <strong>Not Found!</strong> No Product found in this category.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return <div>{loading ? <LoadingSpinner /> : renderProducts}</div>;
};

export default ProductList;
