import "../Agency-Acct/Agency-Page/dashboard/dashboard.scss";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { makeGet } from "../../../redux/apiCalls";
import ModelCard from "../../../Components/ModelCard/model_card";
import FadeIn from "../../../Components/FadeIn/fade_in";

const AgencyModels = () => {
  const [message, setMessage] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribed = false;
    if (!unsubscribed) {
      const fetchData = () => {
        makeGet(dispatch, "/agency/models/all", setMessage);
      };
      fetchData();
    }
    return () => {
      unsubscribed = true;
    };
  }, [setMessage]);
  // console.log(message)

  return (
    <FadeIn>
      <div id="agency_dashboard">
        <div id="pane">
          <div id="our_models">
            <header>
              <h4>Our Models</h4>
            </header>
            <div
              id="body"
              style={{
                overflow: "hidden",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
              }}>
              {message?.map((item) => (
                <ModelCard model={item} id={item?._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default AgencyModels;
