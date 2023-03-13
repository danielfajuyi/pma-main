function FormNavBtn({ btnText, name, handleClick, type, submit }) {
  return (
    <button
      style={{
        opacity: submit && 0.4, cursor: "pointer"
      }}
      onClick={() => handleClick(btnText)}
      type={type}
      name={name}
      className={
        btnText !== "Back"
          ? "kyc--nav-btn bold-text yes--btn"
          : "kyc--nav-btn bold-text cancel--btn"
      }
      disabled={submit}
    >
      {btnText}
    </button>
  );
}

export default FormNavBtn;
