import "./App.css";
import "./component/wallet.css";
import WalletCard from "./component/wallet";
import TransactionPage from "./component/transact.jsx";

function Wallet() {
  return (
    <div className="App">
      <div className="Appdiv">
        <WalletCard />
        <TransactionPage />
      </div>
    </div>
  );
}

export default Wallet;
