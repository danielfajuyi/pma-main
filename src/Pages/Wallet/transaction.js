function Transaction({ details }) {
  let NigeriaNGN = Intl.NumberFormat("en-US");
  const { id, type, avatar, name, brand, amount, date, time } = details;

  return (
    <li className="transaction-item">
      <div className="transaction-avatar">
        <img src={avatar} alt="" />
      </div>

      <div className="transaction-text">
        <span>
          <h4 className="transaction-title">{name}</h4>
          <p className="transaction-sub-title">{brand}</p>
        </span>
        <span className="transaction-amount-wrapper">
          <p
            className="transaction-amount"
            style={{ color: type === "credit" ? "#07ab28f5" : "#d40707" }}>
            {type === "credit" ? "+" : "-"}
            &#8358;
            {NigeriaNGN.format(amount)}
          </p>
          <p className="transaction-time">{time}</p>
        </span>
      </div>
    </li>
  );
}

export default Transaction;
