function ModelStats({ item }) {
  return (
    <section className="section section-profile stat-section">
      {/* stats section  */}

      <ul className="stat__list">
        {item?.height || item?.model?.height ? (
          <li className="stat__item">
            <span className="semi-bold">Height:</span>{" "}
            <span>{item?.height || item?.model?.height}</span>
          </li>
        ) : null}
        {item?.waist || item?.model?.waist ? (
          <li className="stat__item">
            <span className="semi-bold">Waist:</span>{" "}
            <span>{item?.waist || item?.model?.waist}</span>
          </li>
        ) : null}
        {item?.bust || item?.model?.bust ? (
          <li className="stat__item">
            <span className="semi-bold">Bust:</span>{" "}
            <span>{item?.bust || item?.model?.bust}</span>
          </li>
        ) : null}
        {item?.chest || item?.model?.chest ? (
          <li className="stat__item">
            <span className="semi-bold">Chest:</span>{" "}
            <span>{item?.chest || item?.model?.chest}</span>
          </li>
        ) : null}
        {item?.hip || item?.model?.hip ? (
          <li className="stat__item">
            <span className="semi-bold">Hip:</span>{" "}
            <span>{item?.hip || item?.model?.hip}</span>
          </li>
        ) : null}
        {item?.shoulder || item?.model?.shoulder ? (
          <li className="stat__item">
            <span className="semi-bold">Shoulder: </span>
            <span>{item?.shoulder || item?.model?.shoulder}</span>
          </li>
        ) : null}
        <li className="stat__item">
          <span className="semi-bold">Eyes:</span>{" "}
          <span>{item?.eyes || item?.model?.eyes}</span>
        </li>
        <li className="stat__item">
          <span className="semi-bold">Size:</span>{" "}
          <span>{item?.size || item?.model?.size}</span>
        </li>
        <li className="stat__item">
          <span className="semi-bold">Shoe:</span>{" "}
          <span>{item?.shoe || item?.model?.shoe}</span>
        </li>
        <li className="stat__item">
          <span className="semi-bold">Tattoos: </span>
          <span>{item?.tattoos || item?.model?.tattoos ? "Yes" : "No"}</span>
        </li>
        <li className="stat__item">
          <span className="semi-bold">Gender: </span>
          <span>
            {item?.gender || item?.model?.gender === "m" ? "Male" : "Female"}
          </span>
        </li>
        <li className="stat__item">
          <span className="semi-bold">Skin Color: </span>
          <span>{item?.skinColor || item?.model?.skinColor}</span>
        </li>
        <li className="stat__item">
          <span className="semi-bold">Hair Color: </span>
          <span>{item?.hairColor || item?.model?.hairColor}</span>
        </li>
        <li className="stat__item">
          <span className="semi-bold">Hair Length: </span>
          <span>{item?.hairLength || item?.model?.hairLength}</span>
        </li>
        <li className="stat__item">
          <span className="semi-bold">Ethnicity: </span>
          <span>{item?.ethnicity || item?.model?.ethnicity}</span>
        </li>
        <li className="stat__item">
          <span className="semi-bold">Language: </span>
          <span>{item?.language || item?.model?.language}</span>
        </li>
        <li className="stat__item">
          <span className="semi-bold">Available For Travel: </span>
          <span>
            {item?.availableForTravel || item?.model?.availableForTravel
              ? "Yes"
              : "No"}
          </span>
        </li>
      </ul>

      {/* job interest section */}
      <h2 className="stat__title">Jobs Interested In</h2>
      {!item?.model && (
        <ul className="job__list">
          {item?.interestedJob?.map((job) => (
            <li className="job__item" key={job}>
              {job}
            </li>
          ))}
        </ul>
      )}
      {item?.model && (
        <ul className="job__list">
          {item?.model?.interestedJob?.map((job) => (
            <li className="job__item" key={job}>
              {job}
            </li>
          ))}
        </ul>
      )}

      {/* job interest section */}
      {/* <h2 className="stat__title">Model Category</h2>
      {!item?.model && (
        <ul className="job__list">
          {item?.category?.map((job) => (
            <li className="job__item" key={job}>
              {job}
            </li>
          ))}
        </ul>
      )}
      {item?.model && (
        <ul className="job__list">
          {item?.model?.category?.map((job) => (
            <li className="job__item" key={job}>
              {job}
            </li>
          ))}
        </ul>
      )} */}

      {/* compCard section */}
      <button type="download" className="compCard-btn dark--btn bold-text">
        Download CompCard
      </button>
    </section>
  );
}

export default ModelStats;
