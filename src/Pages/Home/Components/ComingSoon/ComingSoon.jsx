import React from "react";
import SectionHead from "../../../../Components/SectionHead/sectionhead";
import "./ComingSoon.css";

const ComingSoon = () => {
  return (
    <>
      <div className="container comingsoon-container mtop">
        <SectionHead title="Now Live!" description="Premium models mobile app" />
        <section className="comingsoon-wrapper ">
          <div className="c-left">
            <img src="./images/home/appnew.png" alt="comingsoon" className="box_shadow-2"></img>
          </div>

          <div className="c-right ">
            <p>
              It is easier with our model mobile app download our mobile app and access your account
              with your log in details as the website platform
            </p>
            <h3>Download Now!</h3>
            <div className="download-Wrapper">
              {/* <i className="b-effect"></i> */}

              <button className="download--btn apple-store">
                <i class="fa-brands fa-apple"></i>
                Apple Store
              </button>

              <a
                href="https://drive.google.com/uc?id=1To78F4OXka6IBPqdqVFSSDAlUjoPvOWh&Export=download"
                target="blank"
                className="download--btn play-store">
                <i class="fa-brands fa-google-play"></i>Google Play
              </a>

              {/* <a
                href="https://play.google.com/store/apps/details?id=com.premiummodels"
                target="blank"
                className="download--btn play-store">
                <i class="fa-brands fa-google-play"></i>Google Play
              </a> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ComingSoon;
