import React, { useCallback, useEffect, useState } from "react";
import "./JobPost.css";
import { Route, Routes } from "react-router-dom";
import JobPostForm from "./JobPostForm/JobPostForm";
import Listing from "./JobListing/Listing";
import Details from "./JobDetails/Details";
import { useDispatch, useSelector } from "react-redux";
import { makeGet } from "../../redux/apiCalls";

const JobPost = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [message, setMessage] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);

  const fetchJob = useCallback(() => {
    makeGet(dispatch, user && user?.role === 'client' ? '/job/jobs': "/job/jobs/all", setMessage);
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

  // Handle Jobform
  function handleForm() {
    setToggleForm((prevForm) => !prevForm);
  }

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Listing
              handleForm={handleForm}
              toggleForm={toggleForm}
              job={reverse}
            />
          }
        ></Route>
        <Route
          path="/post-a-job"
          element={
            <JobPostForm handleForm={handleForm} toggleForm={toggleForm} />
          }
        ></Route>

        <Route path="post/:id" element={<Details job={reverse} />} />
      </Routes>
    </>
  );
};

export default JobPost;
