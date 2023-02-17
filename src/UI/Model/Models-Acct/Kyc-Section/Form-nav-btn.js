function FormNavBtn({ btnText, name, handleClick, type, isFetching }) {
  return (
    <button
      style={{
        opacity: isFetching && 0.4,
      }}
      onClick={() => handleClick(btnText)}
      type={type}
      name={name}
      className={
        btnText === "Back"
          ? "kyc-nav-btn bold-text cancel-btn "
          : "kyc-nav-btn bold-text yes-btn "
      }
      disabled={isFetching}
    >
      {btnText}
    </button>
  );
}

export default FormNavBtn;
