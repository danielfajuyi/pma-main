import { useState } from "react";
import Transaction from "./transaction";
import { NavLink } from "react-router-dom";

function TransactionHistory({ transactions, currentUser }) {
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
          {transactions.length < 1 ? (
            <li className="no-transaction">No Transaction!</li>
          ) : (
            transactions.map((item) => (
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
