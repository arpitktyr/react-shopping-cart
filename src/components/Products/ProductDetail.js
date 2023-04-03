import React from "react";
import { useParams, Link } from "react-router-dom";
import ProductDetailCard from "./ProductDetailCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const { pid } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productSlice
  );
  const products = product.find((item) => item.id == pid);
  const productRender = (
    <div className="container">
      <div>
        {error.length > 0 && (
          <div className="alert alert-danger">
            <b>Error: </b> {error}
          </div>
        )}
        <br />
        {products && (
          <>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to={`/products/${products.category}`}>
                    {products.category}
                  </Link>
                </li>
                <li>Italy</li>
              </ul>
            </nav>
            <ProductDetailCard data={products} />
          </>
        )}
      </div>
    </div>
  );
  return <>{loading ? <LoadingSpinner /> : productRender}</>;
};
export default ProductDetail;
