import React, { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AppPayment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [focus, setFocus] = useState(false);

  const validate = searchParams.get("validate");
  const email = searchParams.get("email");
  const amount = searchParams.get("amount");

  const postRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL2,
    headers: { token: `Bearer ${validate}` },
  });

  const config = {
    email: email,

    amount: amount,

    // metadata: {
    //   name: name,
    //   phone: phone,
    // },

    publicKey: process.env.REACT_APP_PAYSTACK_KEY,

    channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
  };

  const handleInvoice = async () => {
    try {
      const res = await postRequest.post("/payment/make-payment", {
        amount: amount / 100,
      });
      alert(res.data);

      window.close();
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    const onSuccess = () => {
      handleInvoice();
    };

    const onClose = () => {
      window.close();
    };

    initializePayment(onSuccess, onClose);
  };

  useEffect(() => {
    setFocus(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handlePayment();
    }, 1000);
  }, [focus]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button onClick={handlePayment} style={{ padding: "10px" }}>
        Continue with payment
      </button>
    </div>
  );
};

export default AppPayment;
