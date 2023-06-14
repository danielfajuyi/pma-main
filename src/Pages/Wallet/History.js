import { useEffect, useState } from "react";
import Transaction from "./transaction";
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { makeGet } from "../../redux/apiCalls";

function TransactionHistory({ transactions, currentUser }) {
  const dispatch = useDispatch();

  const [transactionHistory, setTransactionHistory] = useState([]);
  const [viewDetails, setViewDetails] = useState(false);
  const [detailsId, setDetailsId] = useState("");

  function handleViewDetails(id) {
    if (viewDetails && id === detailsId) {
      setViewDetails(false);
    } else {
      setDetailsId(id);
      setViewDetails(true);
    }
  }

  const getTransactionHistory = () => {
    makeGet(dispatch, "/transaction/wallet_history", setTransactionHistory);
  };

  useEffect(() => {
    let unsubscribed = getTransactionHistory();
    return () => unsubscribed;
  }, []);

  return (
    <div className="wallet-home-container">
      <section className="transaction-section">
        <div className="wallet-top-text">
          <h2 className="wallet-title-text">History</h2>
          <NavLink to={`${currentUser}/mywallet`}>
            <i className="fa-solid fa-arrow-right fa-beat-fade" style={{ color: "#d40707" }}></i>
          </NavLink>
        </div>
        <ul className="transaction-list">
          {transactionHistory?.length < 1 ? (
            <li className="no-transaction">No Transaction!</li>
          ) : (
            transactionHistory?.map((item) => (
              <Transaction
                key={item.id}
                details={item}
                detailsId={detailsId}
                viewDetails={viewDetails}
                handleViewDetails={handleViewDetails}
              />
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
export default TransactionHistory;
