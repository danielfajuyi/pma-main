import React from "react";
import Slider from "react-slick";
import "./Slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UilTwitter from "@iconscout/react-unicons/icons/uil-twitter";
import UilInstagram from "@iconscout/react-unicons/icons/uil-instagram";
import UilWhatsapp from "@iconscout/react-unicons/icons/uil-whatsapp";
import UilFacebook from "@iconscout/react-unicons/icons/uil-facebook";

const ImageSlider = () => {
  let settings = {
    dots: true,
    infinite: true,

    speed: 500,
    autoplay: false,
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
  return (
    <Slider {...settings}>
      <div className="slidercard-wrapper">
        <div className="slidercard">
          <div className="slidercard-image overlay-2">
            <img
              src="./images/team/teamslider/emma.jpeg"
              alt="team1"
              className="slider-img"
            />
            <div className="featured-model-text slider-overlay">
              <h2>
                Emmanuel<br /> Abazuella 
              </h2>
            </div>
          </div>
          <ul className="slidersocial-icons">
            <li>
              <a href="/about">
                <UilFacebook />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilWhatsapp />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilInstagram />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilTwitter />
              </a>
            </li>
          </ul>
          <div className="slider-details">
            <h2>
            Emmanuel Abazu
              <span className="sliderjob-title">Founder</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="slidercard-wrapper">
        <div className="slidercard">
          <div className="slidercard-image">
            <img src="./images/team/teamslider/folake.jpeg" alt="team2" />
            <div className="featured-model-text slider-overlay">
              <h2>
                Folakemi
                <br /> Orekoya
              </h2>
            </div>
          </div>
          <ul className="slidersocial-icons">
            <li>
              <a href="/about">
                <UilFacebook />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilWhatsapp />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilInstagram />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilTwitter />
              </a>
            </li>
          </ul>
          <div className="slider-details">
            <h2>
              Folakemi Orekoya
              <span className="sliderjob-title">UI/UX Designer</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="slidercard-wrapper">
        <div className="slidercard">
          <div className="slidercard-image">
            <img src="./images/team/teamslider/praise.jpeg" alt="team3" />

            <div className="featured-model-text slider-overlay">
              <h2>
                Praise
                <br />
                Chibuzor
              </h2>
            </div>
          </div>
          <ul className="slidersocial-icons">
            <li>
              <a href="/about">
                <UilFacebook className="svg" />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilWhatsapp className="svg" />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilInstagram className="svg" />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilTwitter className="svg" />
              </a>
            </li>
          </ul>
          <div className="slider-details">
            <h2>
              Praise Chibuzor <span className="sliderjob-title">Frontend Developer</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="slidercard-wrapper">
        <div className="slidercard">
          <div className="slidercard-image">
            <img src="./images/team/teamslider/chioma.jpeg" alt="team4" />
            <div className="featured-model-text slider-overlay">
              <h2>
                Chioma <br />
                Okeke
              </h2>
            </div>
          </div>
          <ul className="slidersocial-icons">
            <li>
              <a href="/about">
                <UilFacebook className="svg" />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilWhatsapp className="svg" />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilInstagram className="svg" />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilTwitter />
              </a>
            </li>
          </ul>
          <div className="slider-details">
            <h2>
              Chioma Okeke
              <span className="sliderjob-title">Frontend Developer</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="slidercard-wrapper">
        <div className="slidercard">
          <div className="slidercard-image">
            <img src="./images/team/teamslider/vic.jpeg" alt="team5" />
            <div className="featured-model-text slider-overlay">
              <h2>
                Victor
                <br />
                Oluwatosin
              </h2>
            </div>
          </div>
          <ul className="slidersocial-icons">
            <li>
              <a href="/about">
                <UilFacebook />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilWhatsapp />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilInstagram />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilTwitter />
              </a>
            </li>
          </ul>
          <div className="slider-details">
            <h2>
              Victor Oluwatosin
              <span className="sliderjob-title">Backend Developer/Project Manager</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="slidercard-wrapper">
        <div className="slidercard">
          <div className="slidercard-image">
            <img src="./images/team/teamslider/evans.jpeg" alt="team6" />

            <div className="featured-model-text slider-overlay">
              <h2>
              Anugwo
                <br />
                Evans
              </h2>
            </div>
          </div>
          <ul className="slidersocial-icons">
            <li>
              <a href="/about">
                <UilFacebook />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilWhatsapp />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilInstagram />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilTwitter />
              </a>
            </li>
          </ul>
          <div className="slider-details">
            <h2>
            Anugwo Evans
              <span className="sliderjob-title">UI/UX Designer</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="slidercard-wrapper">
        <div className="slidercard">
          <div className="slidercard-image">
            <img src="./images/team/teamslider/dan.jpeg" alt="team6" />

            <div className="featured-model-text slider-overlay">
              <h2>
              Daniel
                <br />
                Fajuyi
              </h2>
            </div>
          </div>
          <ul className="slidersocial-icons">
            <li>
              <a href="/about">
                <UilFacebook />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilWhatsapp />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilInstagram />
              </a>
            </li>
            <li>
              <a href="/about">
                <UilTwitter />
              </a>
            </li>
          </ul>
          <div className="slider-details">
            <h2>
            Daniel Fajuyi
              <span className="sliderjob-title">Frontend Developer</span>
            </h2>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default ImageSlider;
