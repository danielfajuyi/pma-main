import { useEffect, useState } from "react";
import "./wallet-forms.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usePaystackPayment } from "react-paystack";
import { AlertModal } from "../LoginSignup/Sign-Up/signUpForm/Modal";
import { makeGet, makePost } from "../../redux/apiCalls";
import { userRequest } from "../../redux/requestMethod";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../../redux/userRedux";

function SendForm({ handleForm, setIsTransact, isTransact }) {
  const user = useSelector((state) => state.user.currentUser);

  const [viewPin, setViewPin] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!user?.currentTransactionPin) {
      alert("Please set your transaction pin before you continue");
    } else {
      try {
        const res = await userRequest.post("/transaction/transfer", {
          ...inputs,
        });
        alert(res.data);
        handleForm("");
        setIsTransact(!isTransact);
      } catch (error) {
        alert(error.response.data);
      }
    }
  };

  return (
    <form onSubmit={handleTransfer} className="wallet-form">
      <div className="wallet-form-top-text">
        <i
          onClick={() => handleForm("")}
          className="fa-solid fa-angle-left"
        ></i>
        <h3>Pay model</h3>
      </div>

      {/* Amount */}
      <fieldset>
        <legend>Amount</legend>
        <label className="label-1" htmlFor="amount">
          <input
            name="amount"
            onChange={handleChange}
            type="number"
            id="amount"
            placeholder="e.g 30000"
            required
          />
          <span className="label-1-text">NGN</span>
        </label>
      </fieldset>

      {/* Account details */}
      <fieldset>
        <legend>Wallet details</legend>
        <div className="label-2">
          <label htmlFor="acct-num">Receiver's tag (username):</label>
          <input
            name="username"
            onChange={handleChange}
            type="text"
            id="acct-num"
            placeholder="e.g johndoe"
            required
          />
        </div>
      </fieldset>

      {/* Comment or Remark */}
      <fieldset>
        <legend>Remarks</legend>{" "}
        <textarea
          className="remark btm-margin"
          name="remark"
          onChange={handleChange}
          id="remark"
          cols="30"
          rows="2"
          placeholder="Transaction purpose..."
        ></textarea>
      </fieldset>

      {/* Transaction pin  */}
      <fieldset>
        <legend>Transaction pin</legend>
        <label className="label-1" htmlFor="transaction-pin">
          <input
            name="transactionPin"
            onChange={handleChange}
            type={viewPin ? "text" : "password"}
            id="transaction-pin"
            placeholder="****"
            required
          />

          {viewPin ? (
            <i
              onClick={() => setViewPin((prev) => !prev)}
              className="fa-solid fa-eye label-1-text"
            ></i>
          ) : (
            <i
              onClick={() => setViewPin((prev) => !prev)}
              className="fa-solid fa-eye-slash label-1-text"
            ></i>
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
function WithdrawForm({ handleForm, loggedUser, setIsTransact, isTransact }) {
  const user = useSelector((state) => state.user.currentUser);

  let NigeriaNGN = Intl.NumberFormat("en-US");

  const [viewPin, setViewPin] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      if (!user?.transactionPin) {
        alert("Please set your transaction pin before you continue.");
      } else {
        const res = await userRequest.post("/transaction/withdraw", {
          ...inputs,
        });
        alert(res.data);
        handleForm("");
        setIsTransact(!isTransact);
      }
    } catch (error) {
      alert(error.response.data)
    }
  };

  return (
    <form onSubmit={handleWithdraw} className="wallet-form">
      <div className="wallet-form-top-text">
        <i
          onClick={() => handleForm("")}
          className="fa-solid fa-angle-left"
        ></i>
        <h3>Withdraw</h3>
      </div>

      {/* Balanec section */}

      <div className="withdraw-balance">
        <h4>Wallet Balance</h4>
        <p className="">
          {" "}
          &#8358;
          {NigeriaNGN.format(
            user.role === "client"
              ? loggedUser.client.wallet
              : user.role === "model"
              ? loggedUser.model.wallet
              : user.role === "agency"
              ? loggedUser.agency.wallet
              : 0
          )}
        </p>
      </div>

      {/* Account details */}

      <fieldset>
        <legend>Account details</legend>
        <div className="label-2">
          <label htmlFor="bankName">Bank Name:</label>
          <input
            name="bankName"
            onChange={handleChange}
            type="text"
            id="acct-num"
            placeholder="e.g access bank"
          />
        </div>
        <div className="label-2">
          <label htmlFor="accountName">Account Name:</label>
          <input
            name="accountName"
            onChange={handleChange}
            type="text"
            id="acct-num"
            placeholder="e.g John Doe"
          />
        </div>
        <div className="label-2">
          <label htmlFor="acct-num">Account no:</label>
          <input
            name="accountNo"
            onChange={handleChange}
            type="number"
            id="acct-num"
            placeholder="e.g 112233..."
          />
        </div>
      </fieldset>

      {/* Amount */}
      <fieldset>
        <legend>Amount</legend>
        <label className="label-1" htmlFor="amount">
          <input
            name="amount"
            onChange={handleChange}
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
            name="transactionPin"
            onChange={handleChange}
            type={viewPin ? "text" : "password"}
            id="transaction-pin"
            placeholder="Transaction pin..."
          />
          {viewPin ? (
            <i
              onClick={() => setViewPin((prev) => !prev)}
              className="fa-solid fa-eye label-1-text"
            ></i>
          ) : (
            <i
              onClick={() => setViewPin((prev) => !prev)}
              className="fa-solid fa-eye-slash  label-1-text"
            ></i>
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

function FundForm({ handleForm, loggedUser, setIsTransact, isTransact }) {
  const user = useSelector((state) => state.user.currentUser);

  let NigeriaNGN = Intl.NumberFormat("en-US");

  const [inputs, setInputs] = useState({});
  const [modalTxt, setModalTxt] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleInvoice = async () => {
    try {
      const res = await userRequest.post("/transaction/fund_wallet", {
        ...inputs,
      });
      alert(res.data);
      handleForm("");
      setIsTransact(!isTransact);
    } catch (error) {}
  };

  const config = {
    email: user.email,

    amount: inputs.amount * 100,

    metadata: {
      name: user.firstName,
      phone: user.mobileNo,
    },

    publicKey: process.env.REACT_APP_PAYSTACK_KEY,

    channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
  };

  const initializePayment = usePaystackPayment(config);
  const handlePayment = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      handleInvoice();
    };
    const onClose = () => {
      setModalTxt("close-payment");
    };
    initializePayment(onSuccess, onClose);
  };

  return (
    <>
      <form onSubmit={handlePayment} className="wallet-form fund-form">
        <div className="wallet-form-top-text">
          <i
            onClick={() => handleForm("")}
            className="fa-solid fa-angle-left"
          ></i>
          <h3>Fund Wallet</h3>
        </div>

        {/* Balanec section */}

        <div className="withdraw-balance">
          <h4>Wallet Balance</h4>
          <p className="">
            &#8358;
            {NigeriaNGN.format(
              user.role === "client"
                ? loggedUser.client.wallet
                : user.role === "model"
                ? loggedUser.model.wallet
                : user.role === "agency"
                ? loggedUser.agency.wallet
                : 0
            )}
          </p>
        </div>

        {/* Amount */}

        <fieldset>
          <legend>Amount</legend>
          <label className="label-1" htmlFor="amount">
            <input
              name="amount"
              onChange={handleChange}
              type="number"
              id="amount"
              placeholder="Amount..."
              required
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

      <AlertModal
        modalTxt={modalTxt}
        setModalTxt={setModalTxt}
        message={message}
        setMessage={setMessage}
      />
    </>
  );
}

// set/update transaction pin

function TransactionPin({ handleForm, setIsTransact, isTransact }) {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({});
  const [modalTxt, setModalTxt] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
    try {
      const res = await userRequest.put("/transaction/transaction-pin", {
        ...inputs,
      });
      dispatch(updateSuccess(res.data));
      alert("Pin updated successfully.");
      handleForm("");
      setIsTransact(!isTransact);
      window.location.reload();
    } catch (error) {
      dispatch(updateFailure());
      alert(error.response.data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="wallet-form fund-form">
        <div className="wallet-form-top-text">
          <i
            onClick={() => handleForm("")}
            className="fa-solid fa-angle-left"
          ></i>
          <h3>Update Transaction Pin</h3>
        </div>

        {user?.currentTransactionPin && (
          <fieldset>
            <legend>Current Pin</legend>
            <label className="label-1" htmlFor="currentTransactionPin">
              <input
                name="currentTransactionPin"
                onChange={handleChange}
                type="password"
                id="currentTransactionPin"
                placeholder="****"
                required
              />
            </label>
          </fieldset>
        )}
        <fieldset>
          <legend>New Pin</legend>
          <label className="label-1" htmlFor="transactionPin">
            <input
              name="transactionPin"
              onChange={handleChange}
              type="password"
              id="transactionPin"
              placeholder="****"
              required
            />
          </label>
        </fieldset>

        {/* button */}
        <div className="button-container">
          <button className="send-button">Continue</button>
          <p>
            Do you need help?
            <NavLink className="contact-link" to={"/contact"}>
              Contact Us
            </NavLink>
          </p>
        </div>
      </form>

      <AlertModal
        modalTxt={modalTxt}
        setModalTxt={setModalTxt}
        message={message}
        setMessage={setMessage}
      />
    </>
  );
}

export { FundForm, SendForm, WithdrawForm, TransactionPin };
