import { useEffect } from "react";

function FormNavBtn({
  btnText,
  FocusBlur,
  name,
  isError,
  handleClick,
  type,
  isFetching,
}) {
  // trigger focusblur function
  useEffect(() => {
    FocusBlur();
  }, []);
  return (
    <button
      style={{
        backgroundColor: !isError ? "var(--main-color)" : "#808080",
        color: "#fff",
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
