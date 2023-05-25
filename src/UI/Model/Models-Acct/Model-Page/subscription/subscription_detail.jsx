import { useDispatch, useSelector } from "react-redux";
import "./subscription_detail.scss";
import { getRemainingTimeUntilMsTimestamp } from "./utils/utils";
import { useCallback, useEffect, useState } from "react";
import { makeGet } from "../../../../../redux/apiCalls";
import moment from "moment";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const SubscriptionDetail = ({ paymentInvoiceId }) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [paymentDet, setPaymentDet] = useState({});

  const fetchPaymentDet = useCallback(() => {
    makeGet(dispatch, `/payment/payment/${paymentInvoiceId}`, setPaymentDet);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribe = fetchPaymentDet();
    return () => unsubscribe;
  }, []);

  // get countdown
  const [remainingTimeToUnlock, setRemainingTimeToUnlock] =
    useState(defaultRemainingTime);

  const currentDate = new Date();
  const targetDate = new Date(paymentDet?.endDate);

  const diffInMonths =
    (targetDate.getFullYear() - currentDate.getFullYear()) * 12 +
    (targetDate.getMonth() - currentDate.getMonth());

  let monthsToAdd = new Date(paymentDet?.createdAt);
  const futureDate = monthsToAdd.setMonth(
    monthsToAdd.getMonth() + (paymentDet?.endDate ? diffInMonths : 12)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTimeToUnlock(futureDate);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [futureDate]);

  function updateRemainingTimeToUnlock(countdown) {
    setRemainingTimeToUnlock(getRemainingTimeUntilMsTimestamp(countdown));
  }

  const createdAt = new Date(paymentDet.createdAt);
  const endDate = new Date(
    createdAt.getFullYear() + 1,
    createdAt.getMonth(),
    createdAt.getDate()
  );

  return (
    <div id="subscription_detail">
      <header>Subscription Data</header>
      <div id="body">
        <span>Subscription Name</span> <span>{paymentDet?.desc}</span>
        <span>Duration</span> <span>{moment(paymentDet?.endDate ? paymentDet?.endDate : endDate).format("DD-MM-YYYY")}</span>
        <span>Price</span> <span>NGN {paymentDet?.amount}</span>
        <span>Status</span> <span>Active</span>
        <span>Currency Code</span> <span>NGN</span>
        <span id="note">
          This is your current Subscription. Expires in{" "}
          {remainingTimeToUnlock.days} days, you can renew when it expires.
        </span>
      </div>
      <footer>
        <button>PAY NOW</button>
      </footer>
    </div>
  );
};

export default SubscriptionDetail;
