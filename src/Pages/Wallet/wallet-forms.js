import { useEffect, useState } from "react";
import "./wallet-forms.css";
import { NavLink } from "react-router-dom";

function SendForm({ handleForm, time, date }) {
  const [payModel, setPayModel] = useState({
    id: "",
    type: "credit",
    senderAvatar: "",
    senderName: "",
    senderBrand: "",
    receiverAvatar: "",
    receiverName: "",
    receiverId: "",
    amount: "",
    remark: "",
    pin: "",
    transactionDate: "",
    transactionTime: "",
  });

  const [viewPin, setViewPin] = useState(false);

  useEffect(() => {
    setPayModel((prev) => ({ ...prev, transactionDate: date, transactionTime: time }));
  }, [time, date]);

  function handlePayModel(e) {
    const { name, value } = e.target;

    setPayModel((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(payModel);
        setPayModel({
          walletName: "",
          walletId: "",
          amount: "",
          remark: "",
          pin: "",
          transactionDate: "",
          transactionTime: "",
          senderName: "",
          senderBrand: "",
        });
        handleForm("");
      }}
      className="wallet-form">
      <div className="wallet-form-top-text">
        <i onClick={() => handleForm("")} className="fa-solid fa-angle-left"></i>
        <h3>Pay model</h3>
      </div>

      {/* Amount */}

      <fieldset>
        <legend>Amount</legend>
        <label className="label-1" htmlFor="amount">
          <input
            name="amount"
            value={payModel.amount}
            onChange={(e) => handlePayModel(e)}
            type="number"
            id="amount"
            placeholder="Amount..."
          />
          <span className="label-1-text">NGN</span>
        </label>
      </fieldset>

      {/* Account details */}

      <fieldset>
        <legend>Wallet details</legend>
        <div className="label-2">
          <label htmlFor="acct-num">Wallet Id:</label>
          <input
            name="walletId"
            value={payModel.walletId}
            onChange={(e) => handlePayModel(e)}
            type="number"
            id="acct-num"
            placeholder="Account no..."
          />
        </div>
        <div className="label-2">
          <label htmlFor="acct-name">Wallet name:</label>
          <input
            name="walletName"
            value={payModel.walletName}
            onChange={(e) => handlePayModel(e)}
            type="text"
            id="acct-name"
            placeholder="Account name..."
          />
        </div>
      </fieldset>

      {/* Comment or Remark */}

      <fieldset>
        <legend>Remarks</legend>{" "}
        <textarea
          className="remark btm-margin"
          name="remark"
          value={payModel.remark}
          onChange={(e) => handlePayModel(e)}
          id="remark"
          cols="30"
          rows="2"
          placeholder="Transaction purpose..."></textarea>
      </fieldset>

      {/* Transaction pin  */}

      <fieldset>
        <legend>Transaction pin</legend>
        <label className="label-1" htmlFor="transaction-pin">
          <input
            name="pin"
            value={payModel.pin}
            onChange={(e) => handlePayModel(e)}
            type={viewPin ? "text" : "password"}
            id="transaction-pin"
            placeholder="Transaction pin..."
          />

          {viewPin ? (
            <i
              onClick={() => setViewPin((prev) => !prev)}
              className="fa-solid fa-eye label-1-text"></i>
          ) : (
            <i
              onClick={() => setViewPin((prev) => !prev)}
              className="fa-solid fa-eye-slash label-1-text"></i>
          )}
        </label>
      </fieldset>

      {/* button */}

      <div className="button-container">
        <button className="send-button">Send</button>
        <p>
          Do you need help?
          <NavLink className="contact-link" to={"/contact"}>
            Contact Us
          </NavLink>
        </p>
      </div>
    </form>
  );
}

//withdraw form section

function WithdrawForm({ handleForm, time, date }) {
  let NigeriaNGN = Intl.NumberFormat("en-US");
  let balance = 10000.46;

  const [logo, setLogo] = useState("");
  const [withdraw, setWithdraw] = useState({
    bank: "",
    accountNum: "",
    amount: "",
    pin: "",
    userName: "",
    userBrand: "",
    transactionDate: "",
    transactionTime: "",
    transactionId: "",
  });
  const [viewPin, setViewPin] = useState(false);

  useEffect(() => {
    setWithdraw((prev) => ({ ...prev, transactionDate: date, transactionTime: time }));
  }, [time, date]);

  let banks = [
    "Access Bank",
    "Eco Bank",
    "FCMB",
    "Fidelity Bank",
    "First Bank",
    "GT Bank",
    "Key Stone",
    "Kuda",
    "Money Point",
    "Opay",
    "Palm Pay",
    "Polaris Bank",
    "Stanbic Bank",
    "Sterling Bank",
    "UBA",
    "Union Bank",
    "Wema Bank",
    "Zenith Bank",
  ];

  function handleWithdraw(e) {
    const { name, value } = e.target;
    setWithdraw((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(withdraw);
        setWithdraw({
          bank: "",
          accountNum: "",
          amount: "",
          pin: "",
          userName: "",
          userBrand: "",
          transactionDate: "",
          transactionTime: "",
          transactionId: "",
        });
        setLogo("");
        handleForm("");
      }}
      className="wallet-form">
      <div className="wallet-form-top-text">
        <i onClick={() => handleForm("")} className="fa-solid fa-angle-left"></i>
        <h3>Withdraw</h3>
      </div>

      {/* Balanec section */}

      <div className="withdraw-balance">
        <h4>Wallet Balance</h4>
        <p className=""> &#8358;{NigeriaNGN.format(balance || "0")}</p>
      </div>

      {/* Account details */}

      <fieldset>
        <legend>Account details</legend>
        <div className="label-2">
          <label htmlFor="bank">Bank:</label>
          <div className="bank-option">
            <select
              onChange={(e) => {
                setLogo(e.target.value);
                handleWithdraw(e);
              }}
              name="bank"
              value={withdraw.bank}
              id="bank">
              <option value="">Select Bank...</option>
              {banks.map((item) => (
                <option key={item} className="option-list" value={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className="bank-avatar">
              <img src={`/images/banks/${logo || "bank"}.png`} alt="" />
            </div>
          </div>
        </div>
        <div className="label-2">
          <label htmlFor="acct-num">Account no:</label>
          <input
            name="accountNum"
            value={withdraw.accountNum}
            onChange={(e) => handleWithdraw(e)}
            type="number"
            id="acct-num"
            placeholder="Account no..."
          />
        </div>
      </fieldset>

      {/* Amount */}

      <fieldset>
        <legend>Amount</legend>
        <label className="label-1" htmlFor="amount">
          <input
            name="amount"
            value={withdraw.amount}
            onChange={(e) => handleWithdraw(e)}
            type="number"
            id="amount"
            placeholder="Amount..."
          />
          <span className="label-1-text">NGN</span>
        </label>
      </fieldset>

      {/* Transaction pin  */}

      <fieldset>
        <legend>Transaction pin</legend>
        <label className="label-1" htmlFor="transaction-pin">
          <input
            name="pin"
            value={withdraw.pin}
            onChange={(e) => handleWithdraw(e)}
            type={viewPin ? "text" : "password"}
            id="transaction-pin"
            placeholder="Transaction pin..."
          />
          {viewPin ? (
            <i
              onClick={() => setViewPin((prev) => !prev)}
              className="fa-solid fa-eye label-1-text"></i>
          ) : (
            <i
              onClick={() => setViewPin((prev) => !prev)}
              className="fa-solid fa-eye-slash  label-1-text"></i>
          )}
        </label>
      </fieldset>

      {/* button */}

      <div className="button-container">
        <button className="send-button">Withdraw</button>
        <p>
          Do you need help?
          <NavLink className="contact-link" to={"/contact"}>
            Contact Us
          </NavLink>
        </p>
      </div>
    </form>
  );
}

//fund wallet form section

function FundForm({ handleForm, time, date }) {
  let NigeriaNGN = Intl.NumberFormat("en-US");
  let balance = 10000.46;

  const [fund, setFund] = useState({
    id: "",
    amount: "",
    transactionDate: "",
    transactionTime: "",
  });

  useEffect(() => {
    setFund((prev) => ({ ...prev, transactionDate: date, transactionTime: time }));
  }, [time, date]);

  function handleWithdraw(e) {
    const { name, value } = e.target;
    setFund((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(fund);
        setFund({
          id: "",
          amount: "",
          transactionDate: date,
          transactionTime: time,
        });

        handleForm("");
      }}
      className="wallet-form fund-form">
      <div className="wallet-form-top-text">
        <i onClick={() => handleForm("")} className="fa-solid fa-angle-left"></i>
        <h3>Fund Wallet</h3>
      </div>

      {/* Balanec section */}

      <div className="withdraw-balance">
        <h4>Wallet Balance</h4>
        <p className=""> &#8358;{NigeriaNGN.format(balance || "0")}</p>
      </div>

      {/* Amount */}

      <fieldset>
        <legend>Amount</legend>
        <label className="label-1" htmlFor="amount">
          <input
            name="amount"
            value={fund.amount}
            onChange={(e) => handleWithdraw(e)}
            type="number"
            id="amount"
            placeholder="Amount..."
          />
          <span className="label-1-text">NGN</span>
        </label>
      </fieldset>

      {/* button */}
      <div className="button-container">
        <button className="send-button">Fund wallet</button>
        <p>
          Do you need help?
          <NavLink className="contact-link" to={"/contact"}>
            Contact Us
          </NavLink>
        </p>
      </div>
    </form>
  );
}

export { FundForm, SendForm, WithdrawForm };
