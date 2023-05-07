import React from "react";
import "./featured-model.css";

const Models = ({ modelItems }) => {
  return (
    <>
      <div className="featured-model-slider">
        {modelItems.length === 0 && (
          <p style={{ textAlign: "center" }}>Not found!</p>
        )}
        {modelItems.map((models) => {
          return (
            <>
              {models.isFeatured && (
                <div className="featured-model-item" key={models?._id}>
                  <div className="featured-img">
                    <img src={models?.picture} alt={models?.picture}></img>

                    <div className="featured-model-text">
                      <h2>{models?.fullName}</h2>
                      <h4>
                        {models?.state}, {models?.country}
                      </h4>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
};

export default Models;
