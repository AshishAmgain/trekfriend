import React from "react";

const Esewa = ({ amount }) => {
  const handleEsewaPayment = () => {
    const pid = `TEST_${Date.now()}`;
    const totalAmount = Number(amount);
    
    if (isNaN(totalAmount) || totalAmount <= 0) {
      alert("Invalid amount");
      return;
    }

    var path = "https://uat.esewa.com.np/epay/main";
    var params = {
      amt: totalAmount,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: totalAmount,
      pid: pid,
      scd: "EPAYTEST",
      su: "http://localhost:3000/payment/success",
      fu: "http://localhost:3000/payment/failure"
    };

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <button 
      onClick={handleEsewaPayment}
      className="btn-esewa"
    >
      Pay with eSewa
    </button>
  );
};

export default Esewa;
