
import Categories from "./Categories";

import { categoriesHeading } from "../../Constants/Index";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";



const Categorieslist = () => {
  
  const {category,loading, error } = useSelector((state) => state.productSlice);

  let headingStyle={
    margin:"20px 0",
    fontSize:"25px"

  }

  return (
    <div className="main-section">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="container">
          {error.length > 0 && (
            <div className="alert alert-danger"> {error}</div>
          )}
          <h1 className="text-center" style={headingStyle}>{categoriesHeading}</h1>
          <div className="row">
            {category.map((categories) => (<Categories key={categories} catName={categories} />))}
             </div>
        </div>
      )}
    </div>

    
  );
};


export default Categorieslist;
