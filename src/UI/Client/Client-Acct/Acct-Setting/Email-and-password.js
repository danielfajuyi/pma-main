import "./Email-and-password.css";
import EditBtn from "./Edit-btn";
import SwitchBtn from "./Switch-Btn";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../../../redux/apiCalls";

function EmailAndPassword({ handleActiveEdit, activeEdit, resetDiscard }) {
  const user = useSelector((state) => state.user.currentUser);
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [deactivation, setDeactivation] = useState();
  const [activateSave, setActivateSave] = useState(false);
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = useCallback(
    (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    },
    [setInputs]
  );
  console.log(inputs);

  //toggling switch
  function handleSwitch(key) {
    key === "Deactivate" && setDeactivation((prev) => !prev);
  }

  //setting activate save
  useEffect(() => {
    activeEdit === "Done"
      ? setActivateSave(true)
      : activeEdit === ""
      ? setActivateSave(true)
      : setActivateSave(false);
  }, [activeEdit]);

  //handle save
  const handleSave = () => {
    update(dispatch, `/user/${user._id}`, { ...inputs }, setMessage);
  };

  return (
    <form className="--content-container" onSubmit={(e) => e.preventDefault()}>
      {/* password section */}

      <section className="--set_sections-container">
        <div className="--set_sections-title-rapper">
          <h2 className="--set_sections-title">Reset Password</h2>
          <EditBtn
            btnText={activeEdit === "Reset" ? "Done" : "Reset"}
            section="reset-password"
            handleActiveEdit={handleActiveEdit}
          />
        </div>

        <p className="--set_note-text">
          <i className="fa-solid fa-angles-right --points"></i>
          Please enter new password
        </p>

        {activeEdit !== "Reset" && activeEdit !== "Verify" && (
          <p className="--set_note-text">
            <i className="fa-solid fa-angles-right --points"></i>
            Password :{"**********"}
          </p>
        )}

        {activeEdit === "Verify" || activeEdit === "Reset" ? (
          <label className="--set-label bold-text" htmlFor="set-password">
            Password:
            <input
              onChange={handleChange}
              className="--set-input-field"
              type="password"
              name="password"
              id="set-password"
              placeholder="Enter password"
            />
          </label>
        ) : null}
      </section>

      {/*account deactivation section */}

      <section className="--set_sections-container">
        <h2 className="--set_sections-title">Account Deactivation</h2>
        <p className="--set_note-text">
          <i className="fa-solid fa-angles-right --points"></i>
          This will remove your profile from the community.
        </p>
        <p className="--set_note-text">
          <i className="fa-solid fa-angles-right --points"></i>
          You will automatically be removed from any public listings and any
          open jobs.
        </p>

        {/* switch */}

        <SwitchBtn
          switchText="Deactivate"
          handleSwitch={handleSwitch}
          toggleSwitch={deactivation}
        />
      </section>

      {/* button section  */}

      <section className="--setting_btn-container">
        <button
          onClick={() => resetDiscard(() => handleSave)}
          className="--discard-btn bold-text --cancel-btn"
        >
          Discard
        </button>
        <button
          style={{
            backgroundColor: !activateSave && "#bbbb",
          }}
          disabled={!activateSave && true}
          onClick={() => handleSave("save")}
          className="--save-btn  bold-text --yes-btn"
        >
          {isFetching ? "Please wait..." : "Save"}
        </button>
        <p className="error-text">{message}</p>
      </section>
    </form>
  );
}

export default EmailAndPassword;
