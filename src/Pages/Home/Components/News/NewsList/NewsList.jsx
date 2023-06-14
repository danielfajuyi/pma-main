import React from "react";
import NewsItem from "../NewsItems/NewsItem";

import "./NewsList.css";

const NewsList = ({ news }) => {
  return (
    <div className="NewsList-wrapper">
      {news?.slice(0,3).map((Newsitem) => {
        return <NewsItem Newsitem={Newsitem} key={Newsitem.id} />;
      })}
    </div>
  );
};

export default NewsList;
