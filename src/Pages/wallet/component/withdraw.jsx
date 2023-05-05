import React, { useState } from "react";
import "./withdraw.css"; // import the CSS file for styling

const WithdrawForm = ({ ISOpen }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionPin, setTransactionPin] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here
  };

  return (
    <form
      className="withdraw-form"
      onSubmit={handleSubmit}
      style={{
        display: !dropdownOpen ? "flex" : "none",
      }}
      id="form1">
      <div className="form-group">
        <button
          id="btn3"
          type="submit"
          style={{
            float: "left",
          }}
          onClick={() => setDropdownOpen(!dropdownOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="currentColor"
              d="M19.06 4.94l-1.41-1.41L12 10.59 6.35 4.94 4.94 6.35 10.59 12l-5.65 5.65 1.41 1.41L12 13.41l5.65 5.65 1.41-1.41L13.41 12l5.65-5.65z"
            />
          </svg>
        </button>
        {}
        <label className="withdraw-label" htmlFor="account-number">
          Account Number:
        </label>

        <input
          className="withdraw-input"
          type="text"
          id="account-number"
          value={accountNumber}
          onChange={(event) => setAccountNumber(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="withdraw-label" htmlFor="account-name">
          Account Name:
        </label>
        <input
          className="withdraw-input"
          type="text"
          id="account-name"
          value={accountName}
          onChange={(event) => setAccountName(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="withdraw-label" htmlFor="bank-name">
          Bank Name:
        </label>
        <input
          className="withdraw-input"
          type="text"
          id="bank-name"
          value={bankName}
          onChange={(event) => setBankName(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="withdraw-label" htmlFor="amount">
          Amount to Withdraw:
        </label>
        <input
          className="withdraw-input"
          type="number"
          id="amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="withdraw-label" htmlFor="transaction-pin">
          Transaction PIN:
        </label>
        <input
          className="withdraw-input"
          type="password"
          id="transaction-pin"
          value={transactionPin}
          onChange={(event) => setTransactionPin(event.target.value)}
          required
        />
      </div>
      <button className="withdraw-button" id="btn3" type="submit">
        Withdraw
      </button>
    </form>
  );
};

export default WithdrawForm;
