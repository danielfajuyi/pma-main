import React from "react";
import "./JobImageSlider.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img2 from "./Images/img2.jpg";
import img3 from "./Images/img3.jpg";
import img4 from "./Images/img4.jpg";
import img5 from "./Images/img5.jpg";

const JobImageSlider = ({ jobdetail }) => {
  let settings = {
    infinite: true,
    speed: 400,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 920,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div className="postjobimg-container">
      <div className="postjobimg-wrapper ">
        <Slider {...settings}>
          <div>
            <img src={jobdetail.img} alt="job-img" />
          </div>

          <div>
            <img src={img2} alt="job-img" />
          </div>

          <div>
            <img src={img3} alt="job-img" />
          </div>

          <div>
            <img src={img4} alt="job-img" />
          </div>

          <div>
            <img src={img5} alt="job-img" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default JobImageSlider;
