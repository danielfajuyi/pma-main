export const AlertBox = ({ title, note, icon, setModalTxt }) => {
  const handleModalTxt = () => {
    setModalTxt((prev) => !prev);
    window.location.reload();
  };

  return (
    <div className="alert-box">
      <h2 className="alert-title">
        {title}
        {icon && <i className="fa-solid fa-circle-check success-icon"></i>}
      </h2>
      <p className="alert-text">
        {/* {<span className="bold-text colored-text">Note: </span>} */}
        {note}
      </p>
      <div className="alert-btn">
        <button
          onClick={handleModalTxt}
          className="del-alert-btn bold-text yes-btn"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export const AlertModal = ({ modalTxt, setModalTxt, userRole, message }) => {
  /* modal section */
  return (
    <section
      style={{ transform: modalTxt && `translateX(${0}%)` }}
      className="alert-section"
    >
      {/* sign up */}

      {modalTxt === "sign-up-Err" && (
        <AlertBox
          title="Complete the form!"
          note="You're required to fill out this form completely before you can continue with your registration!"
          icon={false}
          setModalTxt={setModalTxt}
        />
      )}

      {modalTxt === "close-payment" && (
        <AlertBox
          title="Wait!!!"
          note="Why are you leaving... You are Moments away from Awesomeness!! We hope to see You again"
          icon={true}
          setModalTxt={setModalTxt}
        />
      )}

      {modalTxt === "confirm-payment" && (
        <AlertBox
          title={
            message === "Oops! An error occured"
              ? "Error!"
              : message === "Connection error!"
              ? message
              : "Successful"
          }
          note={
            message === "Oops! An error occured"
              ? message +
                " receiving your payment, please try again or contact support"
              : message === "Connection error!"
              ? "We are unable to receive your payment, please try again or contact support"
              : "Your payment have been submitted for confirmation, you will receive an email once your payment is confirm!"
          }
          icon={
            message === "Oops! An error occured"
              ? false
              : message === "Connection error!"
              ? false
              : true
          }
          setModalTxt={setModalTxt}
        />
      )}

      {modalTxt === "User already exists!" && (
        <AlertBox
          title={modalTxt}
          note="User with that email address already exists, kindly try another email address"
          icon={false}
          setModalTxt={setModalTxt}
        />
      )}

      {modalTxt === "Registration successful!" && (
        <AlertBox
          title={modalTxt}
          note={
            userRole === "client"
              ? "Continue to your account"
              : "Continue to make your payment"
          }
          icon={true}
          setModalTxt={setModalTxt}
        />
      )}
    </section>
  );
};
