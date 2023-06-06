import { useState } from "react";

//setting new transaction pin

function NewPin({ handleForm, activeForm, showForm }) {
  const [newPin, setNewPin] = useState({
    pin: "",
    confirm: "",
    pwd: "",
  });

  const [viewPin, setViewPin] = useState(false);
  const [viewConfirm, setViewConfirm] = useState(false);
  const [viewPwd, setViewPwd] = useState(false);

  function handleNewPin(e) {
    let { name, value } = e.target;

    setNewPin((prev) => ({ ...prev, [name]: value }));
  }

  function handlePin(text) {
    if (text === "save") {
      console.log(newPin);
      setNewPin({
        pin: "",
        confirm: "",
        pwd: "",
      });
      handleForm("new-pin");
    } else {
      handleForm("new-pin");
      setNewPin({
        pin: "",
        confirm: "",
        pwd: "",
      });
    }
  }

  return showForm && activeForm === "new-pin" ? (
    <form>
      <fieldset className="set-payment-fieldset">
        <legend className="set-payment-legend">Set new pin</legend>

        {/* set new pin  */}

        <div className="set-payment-label">
          <label className="set-payment-label-text" htmlFor="new-pin">
            New Pin:
          </label>

          <label htmlFor="new-pin" className="label-3">
            <input
              name="pin"
              value={newPin.pin}
              onChange={(e) => handleNewPin(e)}
              type={viewPin ? "text" : "password"}
              id="new-pin"
              placeholder="Set new pin..."
            />
            {viewPin ? (
              <i
                onClick={() => setViewPin((prev) => !prev)}
                className="fa-solid fa-eye label-3-icon"></i>
            ) : (
              <i
                onClick={() => setViewPin((prev) => !prev)}
                className="fa-solid fa-eye-slash  label-3-icon"></i>
            )}
          </label>
        </div>

        {/* Confirm  pin  */}

        {/* <div className="set-payment-label">
          <label className="set-payment-label-text" htmlFor="confirm-pin">
            Confirm pin:
          </label>
          <label htmlFor="confirm-pin" className="label-3">
            <input
              name="confirm"
              value={newPin.confirm}
              onChange={(e) => handleNewPin(e)}
              type={viewConfirm ? "text" : "password"}
              id="confirm-pin"
              placeholder="Confirm pin..."
            />
            {viewConfirm ? (
              <i
                onClick={() => setViewConfirm((prev) => !prev)}
                className="fa-solid fa-eye label-3-icon"></i>
            ) : (
              <i
                onClick={() => setViewConfirm((prev) => !prev)}
                className="fa-solid fa-eye-slash  label-3-icon"></i>
            )}
          </label>
        </div> */}

        {/* password  */}

        {/* <div className="set-payment-label">
          <label className="set-payment-label-text" htmlFor="pwd">
            Password:
          </label>
          <label htmlFor="pwd" className="label-3">
            <input
              name="pwd"
              value={newPin.pwd}
              onChange={(e) => handleNewPin(e)}
              type={viewPwd ? "text" : "password"}
              id="pwd"
              placeholder="Password..."
            />
            {viewPwd ? (
              <i
                onClick={() => setViewPwd((prev) => !prev)}
                className="fa-solid fa-eye label-3-icon"></i>
            ) : (
              <i
                onClick={() => setViewPwd((prev) => !prev)}
                className="fa-solid fa-eye-slash  label-3-icon"></i>
            )}
          </label>
        </div> */}

        <div className="set-payment-btn-2">
          <button
            className="set-payment-save"
            onClick={(e) => {
              e.preventDefault();
              handlePin("save");
            }}>
            Save
          </button>
          <button
            className="set-payment-discard"
            onClick={(e) => {
              e.preventDefault();
              handlePin("discard");
            }}>
            Discard
          </button>
        </div>
      </fieldset>

      {/* button */}
    </form>
  ) : null;
}

// changing previous transaction pin

function ChangePin({ handleForm, activeForm, showForm }) {
  const [changePin, setChangePin] = useState({
    previousPin: "",
    pin: "",
    confirm: "",
    pwd: "",
  });

  const [viewPrevious, setViewPrevious] = useState(false);
  const [viewPin, setViewPin] = useState(false);
  const [viewConfirm, setViewConfirm] = useState(false);
  const [viewPwd, setViewPwd] = useState(false);

  function handleChangePin(e) {
    let { name, value } = e.target;

    setChangePin((prev) => ({ ...prev, [name]: value }));
  }

  function handlePin(text) {
    if (text === "save") {
      console.log(changePin);
      setChangePin({
        previousPin: "",
        pin: "",
        confirm: "",
        pwd: "",
      });
      handleForm("change-pin");
    } else {
      setChangePin({
        previousPin: "",
        pin: "",
        confirm: "",
        pwd: "",
      });
      handleForm("change-pin");
    }
  }

  return showForm && activeForm === "change-pin" ? (
    <form>
      <fieldset className="set-payment-fieldset">
        <legend className="set-payment-legend">Change pin</legend>

        {/* Previous pin */}

        <div className="set-payment-label">
          <label className="set-payment-label-text" htmlFor="previous-pin">
            Previous pin:
          </label>
          <label htmlFor="previous-pin" className="label-3">
            <input
              name="previousPin"
              value={changePin.previousPin}
              onChange={(e) => handleChangePin(e)}
              type={viewPrevious ? "text" : "password"}
              id="previous-pin"
              placeholder="Previous pin..."
            />
            {viewPrevious ? (
              <i
                onClick={() => setViewPrevious((prev) => !prev)}
                className="fa-solid fa-eye label-3-icon"></i>
            ) : (
              <i
                onClick={() => setViewPrevious((prev) => !prev)}
                className="fa-solid fa-eye-slash  label-3-icon"></i>
            )}
          </label>
        </div>

        {/* set new pin  */}

        <div className="set-payment-label">
          <label className="set-payment-label-text" htmlFor="new--pin">
            New Pin:
          </label>

          <label htmlFor="new--pin" className="label-3">
            <input
              name="pin"
              value={changePin.pin}
              onChange={(e) => handleChangePin(e)}
              type={viewPin ? "text" : "password"}
              id="new--pin"
              placeholder="Set new pin..."
            />
            {viewPin ? (
              <i
                onClick={() => setViewPin((prev) => !prev)}
                className="fa-solid fa-eye label-3-icon"></i>
            ) : (
              <i
                onClick={() => setViewPin((prev) => !prev)}
                className="fa-solid fa-eye-slash  label-3-icon"></i>
            )}
          </label>
        </div>

        {/* Confirm  pin  */}

        <div className="set-payment-label">
          <label className="set-payment-label-text" htmlFor="confirm--pin">
            Confirm pin:
          </label>
          <label htmlFor="confirm--pin" className="label-3">
            <input
              name="confirm"
              value={changePin.confirm}
              onChange={(e) => handleChangePin(e)}
              type={viewConfirm ? "text" : "password"}
              id="confirm--pin"
              placeholder="Confirm pin..."
            />
            {viewConfirm ? (
              <i
                onClick={() => setViewConfirm((prev) => !prev)}
                className="fa-solid fa-eye label-3-icon"></i>
            ) : (
              <i
                onClick={() => setViewConfirm((prev) => !prev)}
                className="fa-solid fa-eye-slash  label-3-icon"></i>
            )}
          </label>
        </div>

        {/* password  */}

        <div className="set-payment-label">
          <label className="set-payment-label-text" htmlFor="-pwd">
            Password:
          </label>
          <label htmlFor="-pwd" className="label-3">
            <input
              name="pwd"
              value={changePin.pwd}
              onChange={(e) => handleChangePin(e)}
              type={viewPwd ? "text" : "password"}
              id="-pwd"
              placeholder="Password..."
            />
            {viewPwd ? (
              <i
                onClick={() => setViewPwd((prev) => !prev)}
                className="fa-solid fa-eye label-3-icon"></i>
            ) : (
              <i
                onClick={() => setViewPwd((prev) => !prev)}
                className="fa-solid fa-eye-slash  label-3-icon"></i>
            )}
          </label>
        </div>

        <div className="set-payment-btn-2">
          <button
            className="set-payment-save"
            onClick={(e) => {
              e.preventDefault();
              handlePin("save");
            }}>
            Save
          </button>
          <button
            className="set-payment-discard"
            onClick={(e) => {
              e.preventDefault();
              handlePin("discard");
            }}>
            Discard
          </button>
        </div>
      </fieldset>

      {/* button */}
    </form>
  ) : null;
}

export { NewPin, ChangePin };
