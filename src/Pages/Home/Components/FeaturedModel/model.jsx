import React from "react";
import "./featured-model.css";

const Models = ({ modelItems }) => {
  const reverse = [...modelItems].reverse();

  return (
    <>
      <div className="featured-model-slider">
        {modelItems.length === 0 && (
          <p style={{ textAlign: "center" }}>Not found!</p>
        )}
        {reverse.slice(0,8).map((models) => {
          return (
            <>
              {models.isFeatured && (
                <div className="featured-model-item" key={models?._id}>
                  <div className="featured-img">
                    <img
                      src={
                        models?.picture
                          ? models?.picture
                          : "./images/avatar.jpg"
                      }
                      alt={models?.picture}
                      style={{height: "300px", width:"250px"}}
                    ></img>

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
