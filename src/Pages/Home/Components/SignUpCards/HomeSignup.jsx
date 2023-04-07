import React from "react";
import { Link } from "react-router-dom";
import "./HomeSignup.scss";
import SignUpForm from "../../../LoginSignup/Sign-Up/signUpForm/SignUpForm";
import { AlertModal } from "../../../LoginSignup/Sign-Up/signUpForm/Modal";

const HomeSignup = () => {
  const handleSignup = (active) => {};
  return (
    <>
      <AlertModal />
      <div className=" SignUpCard">
        <div className="SignUpBox">
          <div className="SignUpContent text-center">
            <h2>01</h2>
            <h3 id="modelhover">Models</h3>
            <p>
              Sign up and create your portfolio that includes your bio, stats,
              and photos. Be discovered by new clients wherever your location.
              You’re in charge of your time – and you pick the jobs you want to
              do.
            </p>
            <a href="/sign-up" className="btn_shadow">
              Signup Now
            </a>
          </div>
        </div>
      </div>

      <div className=" SignUpCard">
        <div className="SignUpBox">
          <div className="SignUpContent">
            <h2>02</h2>
            <h3 id="clienthover">Client</h3>
            <p>
              Are you looking for suitable models for your job? Our portal
              offers a high number of models of different types across all
              relevant age groups. The process of finding and booking models is
              quick and simple. In fact, it is tailored to clients' demands.
            </p>
            <a href="/sign-up" className="btn_shadow">
              Signup Now
            </a>
          </div>
        </div>
      </div>

      <div className=" SignUpCard">
        <div className="SignUpBox">
          <div className="SignUpContent">
            <h2>03</h2>
            <h3 id="agencyhover">Agency</h3>
            <p>
              Create professional portfolios for your models under one account,
              quickly and easily. Don't get left behind. Enjoy benefits when you
              register your agency with us. Easier booking processes,
              commissions and quick payouts.
            </p>
            <a href="/sign-up" className="btn_shadow">
              Signup Now
            </a>
          </div>
        </div>
      </div>
      <SignUpForm />
    </>
  );
};

export default HomeSignup;
