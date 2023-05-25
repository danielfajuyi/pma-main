import { useState } from "react";
import { userRequest } from "../../../redux/requestMethod";

function VideItem({ video, fetchModel, item }) {
  const handleRemovePic = async (photo) => {
    try {
      console.log(photo);
      await userRequest.put("/model/remove/photo", { photo });
      fetchModel();
    } catch (error) {}
  };

  return (
    <li
      className=""
      style={{
        position: "relative",
        height: "250px",
        width: "320px",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "10%",
          textAlign: "center",
          backgroundColor: "white",
          top: "0",
          cursor: "pointer",
          zIndex: "1",
          display: item && "none",
        }}
        onClick={() => handleRemovePic(video)}
      >
        Delete Video
      </div>
      <video className="video" width="320" height="240" controls>
        <source src={video} type="video/mp4"></source> Your browser does not
        support the video tag.
      </video>
    </li>
  );
}

export default VideItem;
