import { useEffect } from "react";

function FormNavBtn({
  btnText,
  name,
  handleClick,
  FocusBlur,
  isError,
  type,
  submit,
}) {
  // trigger focusblur function
  useEffect(() => {
    FocusBlur();
  }, []);
  return (
    <button
      style={{
        backgroundColor: !isError ? "var(--main-color)" : "#808080",
        opacity: submit && 0.4,
        color: "#fff",
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
