// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../../CSS/ProductDescription.css";

// const ProductDescription = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { product, action } = location.state || {};

//   if (!product) {
//     return <p>No product selected.</p>;
//   }

//   const handleProceedToCheckout = () => {
//     navigate("/checkout", { state: { product, action } });
//   };

//   return (
//     <div className="product-description-container">
//       <div className="product-description-wrapper">
//         {/* Left Section: Product Images */}
//         <div className="product-images">
//           <img
//             src={`http://localhost:5000/products/${product.productImage}`}
//             alt={product.productName}
//             className="main-product-image"
//           />
//           <div className="thumbnail-images">
//             {[...Array(4)].map((_, index) => (
//               <img
//                 key={index}
//                 src={`http://localhost:5000/products/${product.productImage}`}
//                 alt={`${product.productName} Thumbnail ${index + 1}`}
//                 className="thumbnail"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Right Section: Product Information */}
//         <div className="product-info">
//           <h1 className="product-name">{product.productName}</h1>
//           <div className="product-rating">
//             <span>⭐ 4.9</span>
//             <span>Sold: 125</span>
//           </div>
//           <div className="product-stock-info">
//             <span>✅ In Stock</span>
//             <span>✔ Guaranteed</span>
//             <span>🚚 Free Delivery</span>
//           </div>

//           {/* Product Details */}
//           <div className="product-details">
//             <p><strong>Brand:</strong> Addidas</p>
//             {/* <p><strong>Size:</strong> 15 Ltr</p> */}
//           </div>

//           {/* Pricing */}
//           <div className="product-pricing">
//             <p className="current-price">Rs. {product.productPrice}</p>
//             {/* <p className="discount">-20%</p> */}
//             {/* <p className="original-price">Last Price: Rs. 1000</p> */}
//           </div>

//           {/* Action Buttons */}
//           <div className="action-buttons">
//             <button className="buy-now" onClick={handleProceedToCheckout}>
//               Proceed to {action === "buy" ? "Buy" : "Rent"} Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDescription;


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../CSS/ProductDescription.css";

const ProductDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, action } = location.state || {};

  if (!product) {
    return <p>No product selected.</p>;
  }

  const handleProceedToPayment = () => {
    // Navigate to payment page with product and total price
    navigate("/payment", { 
      state: { 
        product, 
        totalPrice: product.productPrice 
      } 
    });
  };

  return (
    <div className="product-description-container">
      <div className="product-description-wrapper">
        {/* Left Section: Product Images */}
        <div className="product-images">
          <img
            src={`http://localhost:5000/products/${product.productImage}`}
            alt={product.productName}
            className="main-product-image"
          />
          <div className="thumbnail-images">
            {[...Array(4)].map((_, index) => (
              <img
                key={index}
                src={`http://localhost:5000/products/${product.productImage}`}
                alt={`${product.productName} Thumbnail ${index + 1}`}
                className="thumbnail"
              />
            ))}
          </div>
        </div>

        {/* Right Section: Product Information */}
        <div className="product-info">
          <h1 className="product-name">{product.productName}</h1>
          <div className="product-rating">
            <span>⭐ 4.9</span>
            <span>Sold: 125</span>
          </div>
          <div className="product-stock-info">
            <span>✅ In Stock</span>
            <span>✔ Guaranteed</span>
            <span>🚚 Free Delivery</span>
          </div>

          {/* Product Details */}
          <div className="product-details">
            <p><strong>Brand:</strong> Addidas</p>
          </div>

          {/* Pricing */}
          <div className="product-pricing">
            <p className="current-price">Rs. {product.productPrice}</p>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="buy-now" onClick={handleProceedToPayment}>
              Proceed to {action === "buy" ? "Buy" : "Rent"} Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
