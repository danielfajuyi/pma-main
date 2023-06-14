import "./wallet-setting.css";
import { NewPin, ChangePin } from "./wallet-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function WalletSetting({model}) {
  const user = useSelector((state) => state.user.currentUser);

  const [showForm, setShowForm] = useState(false);
  const [activeForm, setActiveForm] = useState("");

  function handleForm(active) {
    if (active === activeForm) {
      setShowForm(false);
      setActiveForm("");
    } else {
      setShowForm(true);
      setActiveForm(active);
    }
  }
  return (
    <section className="set-payment">
      <h2 className="set-payment-title">Payment</h2>
      <div className="set-payment-profile">
        <div className="set-payment-img">
          <img src={user?.picture} alt="" />
        </div>
        <div className="set-payment-text">
          <h4>{user?.firstName} {user?.lastName}</h4>
          <i>Wallet tag:{ model?.username ? model?.username : "Your model username is the tag to use"}</i>
        </div>
      </div>

      <section className="set-payment-forms">
        {/* setting new pin  */}
        <div className="set-forms-wrapper">
          <button onClick={() => handleForm("new-pin")} className="set-payment-btn">
            Set Transaction pin <i className="fa-solid fa-angle-down "></i>
          </button>
          <NewPin handleForm={handleForm} activeForm={activeForm} showForm={showForm} />
        </div>

        {/*changing  pin  */}

        <div className="set-forms-wrapper">
          <button onClick={() => handleForm("change-pin")} className="set-payment-btn">
            Change Transaction pin <i className="fa-solid fa-angle-down "></i>
          </button>
          <ChangePin handleForm={handleForm} activeForm={activeForm} showForm={showForm} />
        </div>
        <NavLink style={{ width: "100%" }} to={"/contact"}>
          <button className="set-payment-btn">
            Contact us... <i className="fa-solid fa-angle-right "></i>
          </button>
        </NavLink>
      </section>
    </section>
  );
}
export default WalletSetting;
