import React, { useEffect, useState } from "react";
import countrydata from "../CountryData/Country-State-Data.json";
import "./ResponsiveForm.scss";

const ResponsiveForm = () => {
  const [countryid, setCountryid] = useState("");
  const [state, setState] = useState([]);
  const [stateid, setStateid] = useState("");

  const handlecounty = (e) => {
    const getcountryId = e.target.value;
    const getStatedata = countrydata.find(
      (country) => country.country_id === getcountryId
    ).states;
    setState(getStatedata);
    setCountryid(getcountryId);
    console.log(getcountryId);
  };

  const handlestate = (e) => {
    const stateid = e.target.value;
    console.log(stateid);
    setStateid(stateid);
  };

  return (
    <>
      <section className="Responsivity">
        <div className="responsive-form-container">
          <header>Responsive Form</header>
          <form action="#" className="responsive-form">
            <div className="input-box">
              <label>Full Name </label>
              <input type="text" placeholder="Enter full name" required />
            </div>

            <div className="input-box ">
              <label>Email Address </label>
              <input type="text" placeholder="Enter email address " required />
            </div>

            <div className="input-column">
              <div className="input-box">
                <label>Phone Number </label>
                <input
                  type="number"
                  placeholder="Enter phone number "
                  required
                />
              </div>

              <div className="input-box">
                <label>Birth Date </label>
                <input type="date" placeholder="Enter birth date " required />
              </div>
            </div>

            <div className="gender-box">
              <h3>Gender</h3>
              <div className="gender-option">
                <div className="gender">
                  <input type="radio" id="check-male" name="gender" />
                  <label htmlFor="check">Male </label>
                </div>

                <div className="gender">
                  <input type="radio" id="check-female" name="gender" />
                  <label htmlFor="check-female">Female </label>
                </div>

                <div className="gender">
                  <input type="radio" id="check-other" name="gender" />
                  <label htmlFor="check-other">Prefer not to say </label>
                </div>
              </div>
            </div>

            <div className="input-box input-address">
              <label>Address </label>
              <input type="text" placeholder="Enter street address " required />
              <input type="text" placeholder="Enter street line 2 " required />
              <div className="input-column">
                <div className="select-box">
                  <select onChange={(e) => handlecounty(e)}>
                    <option hidden>Country</option>
                    {countrydata.map((getcountry, index) => (
                      <option value={getcountry.country_id} key={index}>
                        {getcountry.country_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="select-box">
                  <select onChange={(e) => handlestate(e)}>
                    <option hidden>State</option>
                    {state.map((getstate, index) => (
                      <option value={getstate.state_id} key={index}>
                        {getstate.state_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-column">
                <input type="text" placeholder="Enter your region " required />
                <input
                  type="number"
                  placeholder="Enter postal code "
                  required
                />
              </div>
            </div>

            <button>Submit</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ResponsiveForm;
