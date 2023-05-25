import Transaction from "./transaction";
import { NavLink } from "react-router-dom";

function TransactionHistory({ transactions, currentUser }) {
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
            transactions.map((item) => <Transaction key={item.id} details={item} />)
          )}
        </ul>
      </section>
    </div>
  );
}
export default TransactionHistory;
