import React, { useEffect } from "react";
import SectionHead from "../../../../../Components/SectionHead/sectionhead";
import "./news.css";
import SearchBar from "../SearchBar/SearchBar";
import NewsList from "../NewsList/NewsList";
import { LatestNews } from "../NewsApI";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Adverts from "../../Adverts/Adverts";
import { useDispatch } from "react-redux";
import { makeGet } from "../../../../../redux/apiCalls";

const News = () => {
  const [news, setNews] = useState(LatestNews);
  const [searchkey, setSearchKey] = useState("");
  console.log(searchkey);

  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;
  // console.log(cat);

  useEffect(() => {
    const fetchData = () => {
      makeGet(dispatch, "/blog/blogs", setPosts);
    };
    fetchData();
  }, [cat]);

  const reversed = [...posts].reverse();
  // console.log(reversed)


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  const handleClearSearch = () => {
    setNews(LatestNews);
    setSearchKey("");
  };

  const handleSearchResults = () => {
    const allNews = LatestNews;
    const FilteredNews = allNews.filter((Newsitem) => {
      return Newsitem.category
        .toLowerCase()
        .includes(searchkey.toLowerCase().trim());
    });

    setNews(FilteredNews);
  };

  return (
    <>
      <section className="container LastestNews-container">
        <SectionHead title=" News" description="Lastest" />

        {/* SearchBar */}
        <SearchBar
          handleSearchSubmit={handleSearchSubmit}
          searchkey={searchkey}
          setSearchKey={setSearchKey}
          handleClearSearch={handleClearSearch}
        />

        {/* NewsList & Empty Search*/}
        <NewsList news={reversed} />

        <Link to="/blog" className="featured-model-btn news-btn btn_shadow">
          Visit Blog
        </Link>

        <Adverts />
      </section>
    </>
  );
};

export default News;
