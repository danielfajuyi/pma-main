import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeGet } from "../../redux/apiCalls";
import ModelCard from "../ModelCard/model_card";
import "./see_models.scss";

const SeeModels = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const fetchModels = () => {
      makeGet(dispatch, "/agency/models/all", setMessage);
    };
    fetchModels();
  }, []);
  // console.log(message)

  return (
    <div id="see_models">
      {message.length > 0 ? (
        <div>
          {message?.map((model, index) => (
            <ModelCard scale="1" ch="380px" model={model} key={index} />
          ))}
        </div>
      ) : (
        <p style={{textAlign:'center'}}>You have no registered model(s) yet</p>
      )}
    </div>
  );
};

export default SeeModels;
