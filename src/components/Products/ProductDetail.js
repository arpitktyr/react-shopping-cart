import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetailCard from "./ProductDetailCard";
import { getWrapper } from "../../Utils/index";
import { Constants } from "../../Constants/Index";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const ProductDetail = () => {
  const [error, SetError] = useState({});
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { pid } = useParams();
  useEffect(() => {
    fetchProductById();
  }, []);

  const fetchProductById = async () => {
    setIsLoading(true);
    try {
      SetError("");
      let apiRes = await getWrapper(
        Constants.apiUrl + Constants.SINGLE_PRODUCT + pid
      );
      setIsLoading(false);
     
      setProduct(apiRes.data);
    } catch (err) {
      SetError(err.message);
      setIsLoading(false);
    }
  };
  const productRender = (
    <div>
      {error.length > 0 && (
        <div className="alert alert-danger">
          <b>Error: </b> {error}
        </div>
      )}
      <h3 style={{ textAlign: "center", padding: "10px", marginTop: "25px" }}>
        {product.productName}
      </h3>
      <ProductDetailCard data={product} />
    </div>
  );
  return <>{isLoading ? <LoadingSpinner /> : productRender}</>;
};
export default ProductDetail;
