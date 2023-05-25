import "./wallet-page.css";
import Transaction from "./transaction";
import { NavLink } from "react-router-dom";

import { useState, useEffect } from "react";
import { SendForm, WithdrawForm } from "./wallet-forms";

function Wallet({ transactions, settings, currentUser }) {
  let NigeriaNGN = Intl.NumberFormat("en-US");
  let balance = 10000.46;
  let credit = 25000;
  let debit = 14999;

  const [recentTransaction, setRecentTransactions] = useState([]);

  const [toggleForm, setToggleForm] = useState(false);
  const [activeForm, setActiveForm] = useState("");

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  setInterval(() => {
    let months = [
      "Jan",
      "Feb",
      " Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let d = new Date();
    let minutes = d.getMinutes();
    let hours = d.getHours();
    let day = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    setTime(
      `${hours < 10 ? `0${hours}` : `${hours > 12 ? `0${hours - 12}` : hours}`}:${
        minutes < 10 ? `0${minutes}` : minutes
      } ${hours < 12 ? "am" : "pm"}`
    );

    setDate(`${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`);
  }, 1000);

  function handleForm(active) {
    setToggleForm((prev) => !prev);
    setActiveForm(active);
  }

  useEffect(() => {
    let sorted = [];
    transactions.forEach((item) => {
      sorted.length < 5 && sorted.push(item);
    });

    setRecentTransactions(sorted);
  }, []);

  return (
    <>
      {/* <TransactionHistory transactions={sortedTransaction} /> */}
      <div className="wallet-home-container">
        <div className="wallet-top-text">
          <h2 className="wallet-title-text">My Wallet</h2>
          <NavLink to={settings}>
            <i className="fa-solid fa-gear colored-hover"></i>
          </NavLink>
        </div>

        <section className="balance-section">
          <div className="balance-top-text">
            <h3 className="balance-title">Current Balance</h3>
            <i className="fa-solid fa-angle-down balance-more-icon colored-hover"></i>
          </div>

          <p className="balance-figure"> &#8358;{NigeriaNGN.format(balance || "0")}</p>
          <div className="balance-credit">
            <div className="credit">
              <>
                <i className="fa-solid fa-arrow-down credit-icon "></i>
              </>

              <div>
                <p className="credit-figure">
                  &#8358;
                  {NigeriaNGN.format(credit || "0")}
                </p>
                <p className="credit-text">Credits</p>
              </div>
            </div>
            <div className="debit">
              <>
                <i className="fa-solid fa-arrow-up debit-icon"></i>
              </>

              <div>
                <p className="debit-figure">
                  &#8358;
                  {NigeriaNGN.format(debit || "0")}
                </p>
                <p className="debit-text">Debits</p>
              </div>
            </div>
          </div>
          <div className="transaction-buttons">
            <button className="transfer-btn">fund</button>
            <button onClick={() => handleForm("withdraw")} className="withdraw-btn">
              withdraw
            </button>
            <button onClick={() => handleForm("pay-form")} className="transfer-btn">
              send
            </button>
          </div>
        </section>

        {/* recent transaction section  */}

        <section className="transaction-section">
          <div className="transaction-top-text">
            <h3>Recent Transactions</h3>
            <NavLink to={`${currentUser}/transaction-history`}>
              <button className="transaction-view-all">View all</button>
            </NavLink>
          </div>

          {/* recent transaction list */}
          <ul className="transaction-list">
            {recentTransaction.length < 1 ? (
              <li className="no-transaction">No Transaction!</li>
            ) : (
              recentTransaction.map((item) => <Transaction key={item.id} details={item} />)
            )}
          </ul>
        </section>
        <section
          style={{ transform: toggleForm && `translateX(${0}%)` }}
          className="form-modal-section">
          {activeForm === "pay-form" ? (
            <SendForm handleForm={handleForm} time={time} date={date} />
          ) : (
            <WithdrawForm handleForm={handleForm} time={time} date={date} />
          )}
        </section>
      </div>
    </>
  );
}

export default Wallet;
