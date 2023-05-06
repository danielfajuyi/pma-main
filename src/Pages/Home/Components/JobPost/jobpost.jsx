import React, { useCallback, useEffect, useState } from "react";

import "./jobpost.css";
import { Jobpostcard2 } from "./jobpostApl";
import CategoryLable from "../../../../Components/CategoryLabel/CategoryLable";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionHead from "../../../../Components/SectionHead/sectionhead";
import { useDispatch } from "react-redux";
import { makeGet } from "../../../../redux/apiCalls";

const Jobpost2 = () => {
  let settings = {
    dots: true,
    infinite: true,

    speed: 400,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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

  const dispatch = useDispatch();
  const [message, setMessage] = useState([]);

  const fetchJob = useCallback(() => {
    makeGet(dispatch, "/job/jobs/all", setMessage);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribed = false;
    if (!unsubscribed) {
      fetchJob();
    }
    return () => {
      unsubscribed = true;
    };
  }, [setMessage]);
  const reverse = [...message].reverse();

  return (
    <article className="job-container container">
      <Slider {...settings}>
        {reverse?.slice(0,5).map((item, index) => {
          return (
            <div className="job-wrapper" key={index}>
              <div className="job-card">
                <div className="job-content1">
                  <div className="job-content1-img-wrapper">
                    <img src={item?.photos?.length > 0 && item?.photos[0]} alt="job1"></img>
                  </div>
                  <CategoryLable lable={item?.type} id="featured-lable" />
                </div>

                <div className="job-content2">
                  <div className="job-content-title">
                    <span>{item?.title} </span>
                  </div>

                  {/* <div className="jobratings">
                    <span>
                      <Star />
                      <Star />
                      <Star />
                    </span>
                  </div> */}

                  <div className="jobprice">
                    <span>#{item?.price}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      <Link to="/jobpost" className=" job-btn btn_shadow">
        Find jobs
      </Link>
    </article>
  );
};

const Jobpost = () => {
  return (
    <>
      <section className="container jobpost-container mtop carousel">
        <SectionHead title="Job Post" description="Recent " />

        <Jobpost2 />
        {/* <ImageSlider /> */}
      </section>
    </>
  );
};

export default Jobpost;
