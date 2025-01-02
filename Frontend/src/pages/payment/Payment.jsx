import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../CSS/Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, totalPrice } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleEsewaPayment = () => {
    window.location.href = `https://esewa.com.np/epay/main?amt=${totalPrice}&pid=${product._id}&scd=YOUR_ESEWA_MERCHANT_CODE&su=http://localhost:5000/api/payment/success&fu=http://localhost:5000/api/payment/failure`;
  };

  const handleKhaltiPayment = () => {
    const config = {
      publicKey: "YOUR_KHALTI_PUBLIC_KEY",
      productIdentity: product._id,
      productName: product.productName,
      productUrl: window.location.href,
      paymentPreference: ["MOBILE_BANKING", "KHALTI"],
      eventHandler: {
        onSuccess(payload) {
          alert("Payment Successful!");
          navigate("/complete");
        },
        onError(error) {
          console.error("Khalti Payment Error:", error);
        },
      },
    };

    const khaltiCheckout = new window.KhaltiCheckout(config);
    khaltiCheckout.show({ amount: totalPrice * 100 });
  };

  return (
    <div className="payment-container">
      <h2>Payment Options</h2>
      <p>Total Amount: Rs. {totalPrice}</p>
      <div className="payment-methods">
        <button onClick={handleEsewaPayment} className="payment-btn esewa-btn">
          Pay with eSewa
        </button>
        <button onClick={handleKhaltiPayment} className="payment-btn khalti-btn">
          Pay with Khalti
        </button>
      </div>
    </div>
  );
};

export default Payment;
