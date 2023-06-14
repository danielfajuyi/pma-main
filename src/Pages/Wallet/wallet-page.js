import "./wallet-page.css";
import Transaction from "./transaction";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  SendForm,
  WithdrawForm,
  FundForm,
  TransactionPin,
} from "./wallet-forms";
import { makeGet } from "../../redux/apiCalls";

function Wallet({ transactions, settings, currentUser }) {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  let NigeriaNGN = Intl.NumberFormat("en-US");

  const [recentTransaction, setRecentTransactions] = useState([]);

  const [toggleForm, setToggleForm] = useState(false);
  const [activeForm, setActiveForm] = useState("");

  const [loggedUser, setLoggedUser] = useState({});
  const [isTransact, setIsTransact] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const getLoggedUser = () => {
    makeGet(dispatch, `/user/${user._id}`, setLoggedUser);
  };

  useEffect(() => {
    let unsubscribed = getLoggedUser();
    return () => unsubscribed;
  }, [isTransact]);

  const getTransactionHistory = () => {
    makeGet(dispatch, "/transaction/wallet_history", setTransactionHistory);
  };
  // console.log(transactionHistory)

  useEffect(() => {
    let unsubscribed = getTransactionHistory();
    return () => unsubscribed;
  }, []);

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
          {/* <NavLink to={settings}> */}
          <i
            onClick={() => handleForm("setting")}
            className="fa-solid fa-gear colored-hover"
          ></i>
          {/* </NavLink> */}
        </div>

        <section className="balance-section">
          <div className="balance-top-text">
            <h3 className="balance-title">Current Balance</h3>
            <NavLink to={`${currentUser}/transaction-history`}>
              <i class="fa-solid fa-clock-rotate-left balance-more-icon colored-hover"></i>
            </NavLink>
          </div>

          <p className="balance-figure">
            &#8358;
            {NigeriaNGN.format(
              user.role === "client"
                ? loggedUser?.client?.wallet
                : user.role === "model"
                ? loggedUser?.model?.wallet
                : user.role === "agency"
                ? loggedUser?.agency?.wallet
                : 0
            )}
          </p>
          <div className="balance-credit">
            <div className="credit">
              <i className="fa-solid fa-arrow-down credit-icon "></i>

              <div>
                <p className="credit-figure">
                  &#8358;
                  {NigeriaNGN.format(
                    user.role === "client"
                      ? loggedUser?.client?.total
                      : user.role === "model"
                      ? loggedUser?.model?.total
                      : user.role === "agency"
                      ? loggedUser?.agency?.total
                      : 0
                  )}
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
                  {NigeriaNGN.format(
                    user.role === "client"
                      ? loggedUser?.client?.withdrawn
                      : user.role === "model"
                      ? loggedUser?.model?.withdrawn
                      : user.role === "agency"
                      ? loggedUser?.agency?.withdrawn
                      : 0
                  )}
                </p>
                <p className="debit-text">Debits</p>
              </div>
            </div>
            {user.role === "client" && (
              <div className="debit">
                <>
                  <i className="fa-solid fa-lock debit-icon"></i>
                </>

                <div>
                  <p className="debit-figure">
                    &#8358;
                    {NigeriaNGN.format(loggedUser?.client?.locked)}
                  </p>
                  <p className="debit-text">Locked</p>
                </div>
              </div>
            )}
          </div>
          <div className="transaction-buttons">
            {user?.role === "client" && (
              <button
                onClick={() => handleForm("fund")}
                className="transfer-btn"
              >
                fund
              </button>
            )}

            {user?.role !== "client" && (
              <button
                onClick={() => handleForm("withdraw")}
                className="withdraw-btn"
              >
                withdraw
              </button>
            )}
            {user?.role === "client" && (
              <button
                onClick={() => handleForm("pay-form")}
                className="transfer-btn"
              >
                send
              </button>
            )}
          </div>
        </section>

        {/* recent transaction section  */}
        <section className="transaction-section">
          <div className="transaction-top-text">
            <h3>Recent Transactions</h3>
            <NavLink
              to={{
                pathname: `${currentUser}/transaction-history`,
                state: { data: transactionHistory },
              }}
            >
              <button className="transaction-view-all">View all</button>
            </NavLink>
          </div>

          {/* recent transaction list */}
          <ul className="transaction-list">
            {transactionHistory?.length < 1 ? (
              <li className="no-transaction">No Transaction!</li>
            ) : (
              transactionHistory
                ?.slice(0, 5)
                .map((item) => <Transaction key={item._id} details={item} />)
            )}
          </ul>
        </section>
        <section
          style={{ transform: toggleForm && `translateX(${0}%)` }}
          className="form-modal-section"
        >
          {activeForm === "fund" ? (
            <FundForm
              handleForm={handleForm}
              loggedUser={loggedUser}
              setIsTransact={setIsTransact}
              isTransact={isTransact}
            />
          ) : activeForm === "pay-form" ? (
            <SendForm
              handleForm={handleForm}
              loggedUser={loggedUser}
              setIsTransact={setIsTransact}
              isTransact={isTransact}
            />
          ) : activeForm === "withdraw" ? (
            <WithdrawForm
              handleForm={handleForm}
              loggedUser={loggedUser}
              setIsTransact={setIsTransact}
              isTransact={isTransact}
            />
          ) : activeForm === "setting" ? (
            <TransactionPin
              handleForm={handleForm}
              loggedUser={loggedUser}
              setIsTransact={setIsTransact}
              isTransact={isTransact}
            />
          ) : null}
        </section>
      </div>
    </>
  );
}

export default Wallet;
