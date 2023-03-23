import { useCallback, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makePost } from "../../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

function BookingForm({ toggleForm, handleForm }) {
  const { isFetching } = useSelector((state) => state.process);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  // console.log(path)
  const [inputs, setInputs] = useState({});

  const handleChange = useCallback(
    (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    },
    [setInputs]
  );
  // console.log(inputs);

  const handleSubmit = () => {
    makePost(dispatch, `/model/${path}`, { ...inputs });
  };

  return (
    <section
      style={{ transform: !toggleForm && `translateX(${100}%)` }}
      className="booking-section"
    >
      <ToastContainer />
      <form className="book-form" onSubmit={(e) => e.preventDefault()}>
        <i onClick={handleForm} className="fa-solid fa-xmark close-icon"></i>
        <h3>Book Model</h3>

        <div className="form__top-input">
          <label htmlFor="name"> Name</label>
          <input
            onChange={handleChange}
            className="bookform-text"
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name..."
            spellCheck="false"
            required
          />
        </div>
        <div className="input__list">
          <div className="input-rapper">
            <label htmlFor="state"> State </label>
            <input
              onChange={handleChange}
              type="text"
              className="bookform-text"
              id="state"
              name="state"
              placeholder="State name..."
              spellCheck="false"
              required
            />
          </div>

          <div className="input-rapper">
            <label htmlFor="country"> Country </label>
            <input
              onChange={handleChange}
              type="text"
              className="bookform-text"
              id="country"
              name="country"
              placeholder="Country name..."
              spellCheck="false"
              required
            />
          </div>

          <div className="input-rapper">
            <label htmlFor="date-from"> Date From </label>
            <input
              onChange={handleChange}
              type="date"
              className="bookform-text"
              id="date-from"
              name="from"
              required
            />
          </div>

          <div className="input-rapper">
            <label htmlFor="date-to">Date To</label>
            <input
              onChange={handleChange}
              type="date"
              className="bookform-text"
              id="date-to"
              name="to"
              required
            />
          </div>

          <div className="input-rapper">
            <label htmlFor="price">Price</label>
            <input
              onChange={handleChange}
              type="text"
              id="price"
              className="bookform-text"
              name="price"
              placeholder="Amount..."
              spellCheck="false"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Job Description</label>
          <textarea
            onChange={handleChange}
            name="jobDescription"
            id="description"
            className="bookform-textarea"
            cols="30"
            rows="5"
            placeholder="Job description"
            spellCheck="false"
            required
          ></textarea>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="dark--btn send-btn"
        >
          {isFetching ? "Please wait..." : "Send"}
        </button>
      </form>
    </section>
  );
}

export default BookingForm;
