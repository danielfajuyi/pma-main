import React, { useState } from "react";
import "./find-model.css";
import ListingPage from "./Model-Listing-page/Listing-Page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FindModel() {

  const [profileId, setProfileId] = useState(1);

  function handleProfile(id) {
    setProfileId(id);
  }

  // function postMsg(msg) {
  //   Data.map((item) =>
  //     msg.id === item.id ? item.contractMessage.push(msg) : null
  //   );

  //   console.log(Data);
  // }

  return (
    <>
      <ListingPage handleProfile={handleProfile} />
      <ToastContainer position="top-center" />
      {/* <Route
          path="/profile"
          element={Data.map((item) => {
            return (
              item.id === Number(profileId) && (
                <ProfilePage key={item.id} item={item} postMsg={postMsg} />
              )
            );
          })}
        /> */}
    </>
  );
}

export default FindModel;
