import { useEffect } from "react";

function EditBtn({
  btnText,
  section,
  handleActiveEdit,
  handlePassword,

  handleEmail,
}) {
  function handleClick() {
    handleActiveEdit(section, btnText);

    // section === "update-email" && handleEmail(btnText);
    // section === "reset-password" && handlePassword(btnText);
  }

  return (
    <button
      onClick={handleClick}
      className="edit-btn colored-hover"
      style={{ position: "absolute", right: "0", margin: " 0 0 1rem 0 " }}
      type="button"
    >
      {btnText}
      <i className="fa-solid fa-pen-to-square"></i>
    </button>
  );
}

export default EditBtn;
