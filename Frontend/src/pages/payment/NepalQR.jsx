import React from "react";

const NepalQR = ({ amount }) => {
  const handleQRPayment = () => {
    // Generate a unique transaction ID
    const transactionId = `TF_${Date.now()}`;
    
    // NepalQR parameters
    const params = {
      amount: amount,
      merchantId: "TREKFRIEND", // Your merchant ID
      merchantName: "Trek Friend",
      transactionId: transactionId,
      remarks: "Trek Friend Order Payment"
    };

    // Create form and submit
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "https://nepalpayqr.com/api/v1/qr"); // NepalQR endpoint

    for (const key in params) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <button onClick={handleQRPayment} className="btn-nepalqr">
      Pay with NepalQR
    </button>
  );
};

export default NepalQR; 