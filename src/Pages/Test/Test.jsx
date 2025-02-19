import React from "react";
import "./Test.scss";

const Test = () => {
  return (
    <div className="Test0j">
      <div className="dashboard-test">
        <div className="profile-card fade-in">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/premium-model-frontend.appspot.com/o/model%2FNkechi%2F1692992923458model%20(14).jpg?alt=media&token=17ce9feb-9524-4379-80ea-f97cfb56c6a6"
            alt="Profile Picture"
            className="profile-img"
          />
          <h2>Victor Adebayo</h2>
          <span className="badge">Model</span>
          <p>Email: tosinadebayo55@gmail.com</p>
        </div>

        <div className="stats-container fade-in">
          <div className="stats-box">
            <p>Total Earnings</p>
            <h3>#58610400</h3>
          </div>
          <div className="stats-box">
            <p>Amount Withdrawn</p>
            <h3>#3150000</h3>
          </div>
          <div className="stats-box">
            <p>Available Balance</p>
            <h3>#55460400</h3>
          </div>
        </div>

        <div className="visitor-stats fade-in">
          <h3>Visitor Statistics</h3>
          <p>
            <span className="views">👁 Views: 262</span> | Visits: 0
          </p>
        </div>

        <div className="latest-posts fade-in">
          <h3>Latest Job Posts</h3>
          <ul>
            <li>Size 8 Needed For Ushering Job - 17-02-2024</li>
            <li>2 Female Models Needed For A Shoot - 16-02-2024</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Test;
