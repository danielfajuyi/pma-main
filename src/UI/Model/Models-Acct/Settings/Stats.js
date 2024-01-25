import "./Stats.css";
import EditBtn from "./Edit-btn";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { categoryInput, jobsInput, SocialMedia, statsInput } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../../../redux/apiCalls";
import { AlertModal } from "../../../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Stats({ handleActiveEdit, activeEdit, resetDiscard }) {
  const user = useSelector((state) => state.user.currentUser);
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({});
  const [category, setCategory] = useState(user?.model?.category);
  const [interestedJob, setInterestedJob] = useState(user?.model?.interestedJob);
  const [modalTxt, setModalTxt] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = useCallback(
    (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    },
    [setInputs]
  );

  const handleCheckboxChange = useCallback(
    (type) => {
      type = "category";
      setInputs((prev) => {
        return { ...prev, [type]: category };
      });
    },
    [category]
  );
  const handleCheckboxChange2 = useCallback(
    (type) => {
      type = "interestedJob";
      setInputs((prev) => {
        return { ...prev, [type]: interestedJob };
      });
    },
    [interestedJob]
  );

  useEffect(() => {
    if (category && category.length <= 2) {
      handleCheckboxChange(category, "category");
    }
    if (interestedJob) {
      handleCheckboxChange2(interestedJob, "interestedJob");
    }
  }, [category, interestedJob]);

  //handle save
  const handleSave = () => {
    update(dispatch, "/model/", { ...inputs }, setMessage, setModalTxt);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <section className="content-container">
        <AlertModal modalTxt={modalTxt} setModalTxt={setModalTxt} />
        <ToastContainer position="top-center" />

        <div className="set_sections-title-rapper">
          <h2 className="set_sections-title">Models statistic</h2>
          <EditBtn
            btnText={activeEdit === "model-statistic" ? "Done" : "Edit"}
            section="model-statistic"
            handleActiveEdit={handleActiveEdit}
          />
        </div>
        {activeEdit === "model-statistic" && (
          <p className="set_description">
            <i className="fa-solid fa-angles-right note"></i>
            Setting your measurements allows your profile to be found in search results.
          </p>
        )}
        {activeEdit === "model-statistic" && (
          <p className="set_description">
            <i className="fa-solid fa-angles-right note"></i>
            Do your best to be as accurate as possible.
          </p>
        )}

        {/*statistic read & write section  */}
        <ul className="set_stats-list">
          <li className="stats-item">
            <span className="stats-item-text">height: </span>
            <input
              defaultValue={user?.model?.height}
              autoFocus={activeEdit === "model-statistic"}
              readOnly={activeEdit === "model-statistic" ? false : true}
              name="height"
              onChange={handleChange}
            />
          </li>
          <li className="stats-item">
            <span className="stats-item-text">waist: </span>
            <input
              defaultValue={user?.model?.waist}
              readOnly={activeEdit === "model-statistic" ? false : true}
              name="waist"
              onChange={handleChange}
            />
          </li>
          {user?.model?.gender.toLowerCase() !== "m" && (
            <li className="stats-item">
              <span className="stats-item-text">bust: </span>
              <input
                defaultValue={user?.model?.bust}
                readOnly={activeEdit === "model-statistic" ? false : true}
                name="bust"
                onChange={handleChange}
              />
            </li>
          )}
          {user?.model?.gender.toLowerCase() !== "m" && (
            <li className="stats-item">
              <span className="stats-item-text">hip: </span>
              <input
                defaultValue={user?.model?.hip}
                readOnly={activeEdit === "model-statistic" ? false : true}
                name="hip"
                onChange={handleChange}
              />
            </li>
          )}
          {user?.model?.gender.toLowerCase() === "m" && (
            <li className="stats-item">
              <span className="stats-item-text">chest: </span>
              <input
                defaultValue={user?.model?.chest}
                readOnly={activeEdit === "model-statistic" ? false : true}
                name="chest"
                onChange={handleChange}
              />
            </li>
          )}
          {user?.model?.gender.toLowerCase() === "m" && (
            <li className="stats-item">
              <span className="stats-item-text">shoulder: </span>
              <input
                defaultValue={user?.model?.shoulder}
                readOnly={activeEdit === "model-statistic" ? false : true}
                name="shoulder"
                onChange={handleChange}
              />
            </li>
          )}
          <li className="stats-item">
            <span className="stats-item-text">size: </span>
            <input
              defaultValue={user?.model?.size}
              readOnly={activeEdit === "model-statistic" ? false : true}
              name="size"
              onChange={handleChange}
            />
          </li>
          <li className="stats-item">
            <span className="stats-item-text">shoe: </span>
            <input
              defaultValue={user?.model?.shoe}
              readOnly={activeEdit === "model-statistic" ? false : true}
              name="shoe"
              onChange={handleChange}
            />
          </li>
          <li className="stats-item">
            <span className="stats-item-text">eyes: </span>
            <input
              defaultValue={user?.model?.eyes}
              readOnly={activeEdit === "model-statistic" ? false : true}
              name="eyes"
              onChange={handleChange}
            />
          </li>
          <li className="stats-item">
            <span className="stats-item-text">Skincolor: </span>
            <input
              defaultValue={user?.model?.skinColor}
              readOnly={activeEdit === "model-statistic" ? false : true}
              name="skinColor"
              onChange={handleChange}
            />
          </li>
          <li className="stats-item">
            <span className="stats-item-text">Haircolor: </span>
            <input
              defaultValue={user?.model?.hairColor}
              readOnly={activeEdit === "model-statistic" ? false : true}
              name="hairColor"
              onChange={handleChange}
            />
          </li>
          <li className="stats-item">
            <span className="stats-item-text">hairLength: </span>
            <input
              defaultValue={user?.model?.hairLength}
              readOnly={activeEdit === "model-statistic" ? false : true}
              name="hairLength"
              onChange={handleChange}
            />
          </li>

          <li className="stats-item">
            <span className="stats-item-text">tattoos: </span>
            <select
              disabled={activeEdit === "model-statistic" ? false : true}
              name="tattoos"
              onChange={handleChange}>
              <option value={user?.model?.tattoos}>{user?.model?.tattoos ? "Yes" : "No"}</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </li>

          <li className="stats-item">
            <span className="stats-item-text">ethnicity: </span>
            <input
              defaultValue={user?.model?.ethnicity}
              readOnly={activeEdit === "model-statistic" ? false : true}
              name="ethnicity"
              onChange={handleChange}
            />
          </li>

          <li className="stats-item">
            <span className="stats-item-text">language: </span>
            <input
              defaultValue={user?.model?.language}
              readOnly={activeEdit === "model-statistic" ? false : true}
              name="language"
              onChange={handleChange}
            />
          </li>
          <li className="stats-item">
            <span className="stats-item-text">agency: </span>
            <input
              defaultValue={user?.model?.agency}
              readOnly={activeEdit === "model-statistic" ? false : true}
              name="agency"
              onChange={handleChange}
            />
          </li>
          <li className="stats-item" style={{ width: "48%" }}>
            <span className="stats-item-text">available For Travel: </span>
            <select
              disabled={activeEdit === "model-statistic" ? false : true}
              name="availableForTravel"
              onChange={handleChange}>
              <option value={user?.model?.availableForTravel}>
                {user?.model?.availableForTravel ? "Yes" : "No"}
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </li>
          <li className="stats-item" style={{ width: "48%" }}>
            <span className="stats-item-text">Mininum booking price: </span>
            <input
              defaultValue={`#${user?.model?.minPrice}`}
              readOnly={activeEdit === "model-statistic" ? false : true}
              name="minPrice"
              onChange={handleChange}
            />
          </li>
        </ul>

        {/* category section*/}
        <div className="set_sections-title-rapper">
          <h2 className="set_sections-title">Models categories</h2>
          <EditBtn
            btnText={activeEdit === "model-categories" ? "Done" : "Edit"}
            section="model-categories"
            handleActiveEdit={handleActiveEdit}
          />
          {activeEdit === "model-categories" && (
            <p className="category-text-2">choose which type of model you suited (2max)</p>
          )}
        </div>
        {activeEdit === "model-categories" && (
          <p className="category-text-1">choose which type of model you suited (2max)</p>
        )}

        {/* category read only section */}
        {activeEdit !== "model-categories" && (
          <ul className="set_category-list">
            {user?.model?.category.map((item) => (
              <li key={item} className="category-item">
                {item} Model
              </li>
            ))}
          </ul>
        )}

        {/* category edit section */}
        {activeEdit === "model-categories" && (
          <ul className="set_model-categories">
            {categoryInput.map((item) => {
              return (
                <li className="setting_input-container" key={item.id}>
                  <label className="setting_check-box-label colored-hover" htmlFor={item.id}>
                    {item.label}
                    <input
                      onChange={(e) => {
                        if (e.target.checked && category.length >= 3) {
                          return; // prevent checkbox from being checked
                        }
                        setCategory((prev) =>
                          e.target.checked === false
                            ? prev.filter((item) => item !== e.target.value)
                            : [...prev, e.target.value]
                        );
                      }}
                      className="setting_check-box"
                      type={item.type}
                      id={item.id}
                      name="category"
                      value={item.value}
                      checked={category.find((value) => value === item.value) ? true : false}
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        )}

        {/* work interest section */}
        <div className="set_sections-title-rapper">
          <h2 className="set_sections-title">Jobs interested in</h2>
          <EditBtn
            btnText={activeEdit === "job-interest" ? "Done" : "Edit"}
            section="job-interest"
            handleActiveEdit={handleActiveEdit}
          />
        </div>
        {/* work-interest read only section */}
        {activeEdit !== "job-interest" && (
          <ul className="set_job-list">
            {user?.model?.interestedJob?.map((item) => (
              <li key={item} className="job-item">
                {item}
              </li>
            ))}
          </ul>
        )}
        {/* work-interest edit section */}
        {activeEdit === "job-interest" && (
          <ul className="set_job-interest">
            {jobsInput.map((item) => {
              return (
                <li className="setting_input-container" key={item.id}>
                  <label className="setting_check-box-label colored-hover" htmlFor={item.id}>
                    {item.label}
                    <input
                      onChange={(e) =>
                        setInterestedJob((prev) =>
                          e.target.checked === false
                            ? prev.filter((item) => item !== e.target.value)
                            : [...prev, e.target.value]
                        )
                      }
                      className="setting_check-box"
                      type={item.type}
                      id={item.id}
                      name="job-interest"
                      value={item.value}
                      checked={interestedJob.find((value) => value === item.value) ? true : false}
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        )}
        {/* social media section */}
        <div className="set_sections-title-rapper">
          <h2 className="set_sections-title">Instagram Handle</h2>
          <EditBtn
            btnText={activeEdit === "social-media" ? "Done" : "Edit"}
            section="social-media"
            handleActiveEdit={handleActiveEdit}
          />
        </div>
        {/* social-media  read only section */}
        {activeEdit !== "social-media" && (
          <ul className="set_social-list">
            <li className="social-item">{user?.model?.instagram}</li>
          </ul>
        )}
        {/* social-media  edit section */}
        {activeEdit === "social-media" && (
          <ul className="set_social-media-link">
            {SocialMedia.map((item) => {
              return (
                <li className="setting_input-container" key={item.id}>
                  <label className="setting_input-label" htmlFor={item.id}>
                    {item.label}
                    <input
                      onChange={handleChange}
                      className="setting_input-field"
                      type={item.type}
                      id={item.id}
                      name={item.id}
                      placeholder={item.placeholder}
                      spellCheck={false}
                      required
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        )}

        {/* button section  */}

        <section className="setting_btn-container">
          <button
            onClick={() => resetDiscard(() => handleSave)}
            className="discard-btn  bold-text cancel-btn">
            Discard
          </button>
          <button
            style={{
              backgroundColor: activeEdit !== "Done" && "#bbbb",
            }}
            disabled={activeEdit !== "Done" && true}
            onClick={handleSave}
            className="save-btn  bold-text yes-btn">
            {isFetching ? "Please wait..." : "Save"}
          </button>
          <p className="error-text">{message}</p>
        </section>
      </section>
    </form>
  );
}

export default Stats;
